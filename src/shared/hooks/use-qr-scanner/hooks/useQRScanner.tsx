import { Alert, Linking } from "react-native";
import { Camera } from "react-native-vision-camera";

import { useOverlay } from "@_shared/hooks/use-overlay";

import { CodeScannerModal } from "../ui/QRScannerModal";

export const useQRScanner = () => {
  const overlay = useOverlay();

  const openQRScanner = async (): Promise<string> => {
    const permission = await Camera.requestCameraPermission();
    const hasPermission = permission === "granted";

    if (!hasPermission) {
      Alert.alert("카메라 권한이 없습니다.", "설정에서 카메라 권한을 허용해주세요.", [
        { text: "취소", style: "cancel" },
        {
          text: "설정으로 이동",
          onPress: () => Linking.openSettings()
        }
      ]);

      throw new Error("카메라 권한 없음");
    }

    return new Promise((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <CodeScannerModal
          visible={isOpen}
          onRequestClose={close}
          onClose={close}
          onScanned={(code) => {
            close();
            resolve(code);
          }}
        />
      ));
    });
  };

  return { openQRScanner };
};
