import { Linking } from "react-native";

/**
 * 전화 연결 함수
 * @param telNumber 전화번호
 */
export const connectCall = (telNumber: string) => {
  try {
    Linking.openURL(`tel:${telNumber}`);
  } catch (error) {
    throw error;
  }
};
