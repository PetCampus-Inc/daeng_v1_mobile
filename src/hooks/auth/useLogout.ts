import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSetRecoilState } from "recoil";

import useFirebaseAuth from "~/hooks/auth/useFirebaseAuth";
import { RootStackParams } from "~/navigator/RootNavigator";
import { userState } from "~/store/user";

const useLogout = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { firebaseSignOut } = useFirebaseAuth();
  const setUser = useSetRecoilState(userState);

  return () => {
    setUser(null);
    firebaseSignOut();
    navigate("LoginNavigator");
  };
};

export default useLogout;
