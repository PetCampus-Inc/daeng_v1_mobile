import { Text, TouchableOpacity, View } from "react-native";

import SocialButton from "~/components/SocialButton";
import useLoginScreenLogic from "~/hooks/service/useLoginScreenLogic";

const LoginScreen = () => {
  const { socialButtons, lastLoginProvider, handleAdminLogin } = useLoginScreenLogic();

  return (
    <View className="h-full px-4 bg-white">
      {/* 타이틀 */}
      <View className="mt-[108]">
        <Text className="typo-title-24-b text-foreground">
          <Text className="text-primary">우리 강아지</Text>의 유치원
        </Text>
        <Text className="typo-title-24-b text-foreground">생활을 보러 갈까요?</Text>
      </View>

      {/* 소셜 로그인 버튼 */}
      <View className="gap-y-3 mt-[214]">
        {socialButtons.map((option) => {
          const isLast = lastLoginProvider === option.social;
          return <SocialButton key={option.social} isLastLogin={isLast} {...option} />;
        })}
      </View>

      {/* 서비스 체험하기 버튼 */}
      <TouchableOpacity className="self-center px-4 py-3 mt-6">
        <Text className="typo-label-14-b text-gray-1">서비스 체험하기</Text>
      </TouchableOpacity>

      <View className="absolute bottom-6 left-4 right-4 gap-y-1">
        {/* 이용 약관 | 개인정보 처리 방침 */}
        <View className="flex-row items-center justify-center">
          <TouchableOpacity className="px-2 py-1">
            <Text className="typo-label-14-m text-gray-2">이용약관</Text>
          </TouchableOpacity>
          <Text className="typo-label-14-m text-gray-2">|</Text>
          <TouchableOpacity className="px-2 py-1">
            <Text className="typo-label-14-m text-gray-2">개인정보 처리 방침</Text>
          </TouchableOpacity>
        </View>

        {/* 관리자 로그인 버튼 */}
        <SocialButton social="ADMIN" onPress={handleAdminLogin} />
      </View>
    </View>
  );
};

export default LoginScreen;
