import { Linking } from "react-native";

export const connectCall = (telNumber: string) => {
  Linking.openURL(`tel:${telNumber}`);
};
