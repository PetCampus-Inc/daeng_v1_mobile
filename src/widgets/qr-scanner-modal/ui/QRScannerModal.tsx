import { Modal, ModalProps, StyleSheet, View } from "react-native";
import { Camera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";

interface QRScannerModalProps extends ModalProps {
  onScanned?: (code: string) => void;
}

const CodeScannerModal = ({ visible, onScanned }: QRScannerModalProps) => {
  const device = useCameraDevice("back");

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        const code = codes[0].value;
        if (code) onScanned?.(code);
      }
    }
  });

  return (
    <Modal visible={visible}>
      <View className="flex-1">
        {device ? (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            codeScanner={codeScanner}
            isActive={true}
            photo={true}
          />
        ) : (
          <View />
        )}
      </View>
    </Modal>
  );
};

export { CodeScannerModal };
