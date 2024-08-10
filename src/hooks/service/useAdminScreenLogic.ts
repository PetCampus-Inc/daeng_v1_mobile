import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import * as yup from "yup";

import useLogin from "~/hooks/auth/useLogin";
import { RootStackParams } from "~/navigator/RootNavigator";

const loginFormSchema = yup.object().shape({
  id: yup.string().required("아이디를 입력해주세요"),
  password: yup.string().required("비밀번호를 입력해주세요")
});

const defaultLoginFormData = {
  id: "",
  password: ""
};

const useAdminScreenLogic = () => {
  const [values, setValues] = useState(defaultLoginFormData);
  const [errors, setErrors] = useState<{ id?: string; password?: string }>({});
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const isValid = Object.values(values).every((v) => v) && Object.values(errors).every((e) => !e);

  const { adminLogin } = useLogin();

  const errorHandler = (error: unknown) => {
    if (error instanceof yup.ValidationError) {
      const newErrors: { [key: string]: string } = {};

      error.inner.forEach((err) => {
        if (err.path) {
          newErrors[err.path] = err.message;
        }
      });
      setErrors(newErrors);
    }
  };

  const handleLogin = async () => {
    try {
      await loginFormSchema.validate(values, { abortEarly: false });
      await adminLogin(values);
      rootNavigation.navigate("Home");
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleTextChange = (key: keyof typeof defaultLoginFormData) => (value: string) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return { isValid, values, errors, handleLogin, handleTextChange };
};

export default useAdminScreenLogic;
