import { Modal, Text, View } from "react-native";
import { useRecoilValue } from "recoil";

import SoleIcon from "~/assets/svg/sole.svg";
import { progressState } from "~/store/progress";

export default function ImageSaveProgressView() {
  const { visible, count, progress } = useRecoilValue(progressState);

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View className="absolute size-full items-center justify-center">
        {/* Mask */}
        <View className="absolute size-full bg-black opacity-70" />

        {/* Content */}
        <View className="items-center w-full">
          <Text className="text-white typo-body-16">{count}장의 사진 저장중</Text>
          <Text className="text-white typo-title-20-b mb-2">{progress}%</Text>

          {/* Progress Bar */}
          <View className="h-5 w-3/5 bg-gray-2 opacity-80 rounded-full overflow-hidden">
            <View
              className={`h-full bg-white rounded-full justify-center`}
              style={{ width: `${progress}%` }}
            >
              <View className="absolute right-1 size-4">
                <SoleIcon width={15} height={16} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
