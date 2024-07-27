import { Linking } from "react-native";

export const connectCall = (telNumber: string) => {
  try {
    Linking.openURL(`tel:${telNumber}`);
  } catch (error) {
    throw error;
  }
};
