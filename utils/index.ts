import {Linking} from 'react-native';

// 전화걸기 함수
export const connenctCall = (telNumber: string) => {
  Linking.openURL(`tel:${telNumber}`);
};
