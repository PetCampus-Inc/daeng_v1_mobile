import { useState } from "react";
import { Modal, ModalProps, StyleSheet, TouchableHighlight, View } from "react-native";
import { Camera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";

import CloseIcon from "@_shared/assets/svg/close.svg";
import TorchIcon from "@_shared/assets/svg/torch.svg";

import { ScannerOverlay } from "../ui/ScannerOverlay";

interface QRScannerModalProps extends ModalProps {
  onScanned?: (code: string) => void;
  onClose?: () => void;
}

const CodeScannerModal = ({ visible, onScanned, onClose }: QRScannerModalProps) => {
  const device = useCameraDevice("back");
  const [torch, setTorch] = useState(false);

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
          <>
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              codeScanner={codeScanner}
              isActive={true}
              photo={true}
              torch={torch ? "on" : "off"}
            />
            <ScannerOverlay />
          </>
        ) : (
          <View />
        )}
      </View>
      <TouchableHighlight
        className="absolute top-safe-or-0 right-4 z-10 p-2 rounded-full"
        onPress={() => onClose?.()}
      >
        <CloseIcon className="opacity-80" />
      </TouchableHighlight>

      <TouchableHighlight
        className="absolute left-1/2 -translate-x-1/2 bottom-safe-or-20 z-10 p-4 rounded-full bg-foreground opacity-50"
        onPress={() => setTorch((prev) => !prev)}
      >
        <TorchIcon />
      </TouchableHighlight>
    </Modal>
  );
};

export { CodeScannerModal };
