import { useState } from "react";
import { Text, TextInput, View, TextInputProps, TouchableOpacity } from "react-native";

import CloseEyesIcon from "~/assets/svg/close-eyes.svg";
import OpenEyesIcon from "~/assets/svg/open-eyes.svg";

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
}

const InputField = ({
  label,
  error,
  className,
  secureTextEntry,
  ...inputProps
}: InputFieldProps) => {
  const [showPW, setShowPW] = useState<boolean>(false);

  const handleShowPwd = () => setShowPW(!showPW);

  return (
    <View className={`gap-y-2 ${className}`}>
      <View className="flex-row items-center justify-between px-1">
        <Text className="typo-body-16 text-foreground">{label}</Text>
        {error && <Text className="text-red-1 typo-caption-12">{error}</Text>}
      </View>
      <View>
        <TextInput
          className={`
          px-4 h-12 border text-m border-gray-4 rounded-lg text-foreground transition-colors duration-200 focus:border-primary focus:text-primary
          ${error && "text-red-1"}
        `}
          placeholderTextColor="#b5b5b5"
          placeholder="아이디를 입력해 주세요"
          secureTextEntry={secureTextEntry && !showPW}
          {...inputProps}
        />

        {secureTextEntry && (
          <TouchableOpacity
            className="absolute top-0 bottom-0 justify-center px-2 right-2"
            onPress={handleShowPwd}
          >
            {showPW ? <OpenEyesIcon /> : <CloseEyesIcon />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;
