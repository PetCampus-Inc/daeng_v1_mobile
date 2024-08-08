import { KeyboardAvoidingView, Text, TextInput, View } from "react-native";

import SocialButton from "~/components/SocialButton";
import useKeyboardAvoiding from "~/hooks/useKeyboardAvoiding";

const AdminSignInScreen = () => {
  const keyboardAvoidingProps = useKeyboardAvoiding();

  return (
    <KeyboardAvoidingView {...keyboardAvoidingProps}>
      <View className="px-4 bg-white h-full">
        <Text className="mt-[74] text-title-24-b font-bold text-foreground">
          똑똑 관리자로 시작하기
        </Text>

        <View className="mt-[56]">
          <View className="gap-y-2 mb-6">
            <Text className="text-body-16 text-foreground">아이디</Text>
            <TextInput
              className="px-4 pb-1 border h-12 border-gray-4 rounded-lg text-label-16 text-foreground"
              placeholder="아이디를 입력해 주세요"
            />
          </View>
          <View className="gap-y-2">
            <Text className="text-body-16 text-foreground">비밀번호</Text>
            <TextInput
              className="px-4 pb-1 border h-12 border-gray-4 rounded-lg text-label-16 text-foreground"
              placeholder="비밀번호를 입력해 주세요"
            />
          </View>
        </View>

        <SocialButton className="absolute bottom-6 left-4 right-4" social="ADMIN" />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AdminSignInScreen;
