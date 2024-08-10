import ChevronLeft from "assets/svg/chevron-left.svg";
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

import Button from "~/components/Button";
import InputField from "~/components/InputField";
import useAdminScreenLogic from "~/hooks/service/useAdminScreenLogic";
import useKeyboardStatus from "~/hooks/useKeyboardStatus";
import useKeyboardAvoiding from "~/hooks/webview/useKeyboardAvoiding";
import { cn } from "~/utils/cn";

const AdminLoginScreen = () => {
  const keyboardAvoidingProps = useKeyboardAvoiding(44);
  const { handleLogin, handleTextChange, isValid, errors } = useAdminScreenLogic();
  const { isKeyboardVisible } = useKeyboardStatus();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView {...keyboardAvoidingProps}>
        <View className="relative h-full px-4 bg-white">
          <Text className="mt-[74] text-title-24-b text-foreground">똑똑 관리자로 시작하기</Text>

          <View className="mt-14">
            <InputField
              // autoFocus
              label="아이디"
              placeholder="아이디를 입력해 주세요"
              error={errors.id}
              onChangeText={handleTextChange("id")}
            />
            <View className="h-6" />
            <InputField
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요"
              error={errors.password}
              onChangeText={handleTextChange("password")}
              secureTextEntry
            />
          </View>

          <View
            className={`
              absolute bottom-0 left-0 right-0 gap-y-4
              ${isKeyboardVisible ? "px-0 pb-1" : "pb-6 px-4"}
            `}
          >
            {!isKeyboardVisible && (
              <TouchableOpacity className="flex flex-row items-center self-center px-2 py-1">
                <Text className="text-label-14-m text-gray-2">처음이신가요? 회원가입하기</Text>
                <View className="rotate-180 size-5">
                  <ChevronLeft color="#858585" />
                </View>
              </TouchableOpacity>
            )}

            <Button
              className={cn("bg-primary", isKeyboardVisible ? "rounded-none" : "")}
              labelClassName="font-bold text-white"
              label="로그인"
              onPress={handleLogin}
              disabled={!isValid}
            />
          </View>
        </View>

        {/* <Modal animationType="slide" visible={true}>
          <View className="flex-1">
            <WebView path="admin/signup" />
          </View>
        </Modal> */}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AdminLoginScreen;
