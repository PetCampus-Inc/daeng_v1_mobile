import {
  Linking,
  Platform,
  NativeModules,
  PermissionsAndroid,
  ImageURISource,
  Alert,
} from 'react-native';
import {useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';

const firebaseMessaging = messaging();
const [img, setImg] = useState<ImageURISource>({uri: ''});

const awsS3config = {
  region: 'your_region',
  bucket: 'your_bucketName',
  accessKeyID: 'your_accessKeyID',
  secretAccessKey: 'your_secretAccessKey',
};

const s3 = new AWS.S3({
  accessKeyId: awsS3config.accessKeyID,
  secretAccessKey: awsS3config.secretAccessKey,
  region: awsS3config.region,
});

//s3 upload funciton
const uploadImageToS3 = async (imgConfig: any) => {
  return new Promise(async (resolve, reject) => {
    const fileData = await RNFS.readFile(imgConfig.uri, 'base64');

    const params = {
      Bucket: awsS3config.bucket,
      Key: imgConfig.fileName, // File name you want to save as in S3
      Body: Buffer.from(fileData, 'base64'),
      ACL: 'public-read',
      ContentType: imgConfig.type,
    };

    // Uploading files to the bucket
    s3.upload(params, function (err: any, data: any) {
      if (err) {
        reject(err);
      } else {
        console.log(`File uploaded successfully. ${data.Location}`);
        resolve(data.Location);
      }
    });
    console.log('end');
  });
};

//갤러리 실행
export const selectImage = () => {
  const options: any = {
    title: '사진 선택',
    selectionLimit: 20,
  };

  let imageList: any = [];
  launchImageLibrary(options, async (response: any) => {
    if (response.didCancel) {
      console.log('사용자가 이미지 선택을 취소했습니다.');
    } else if (response.error) {
      console.log('ImagePicker 에러: ', response.error);
    } else if (response.customButton) {
      console.log('Custom button clicked :', response.customButton);
    } else {
      imageList = response.assets;
      imageList.forEach(async (item: any) => {
        await uploadImageToS3(item);
      });
    }
  });
};

//카메라 앱을 실행하는 함수
export const showCamera = () => {
  //1. launchCamera 하기 위한 옵션 객체
  const options: CameraOptions = {
    //Property 'mediaType' is missing in type '{}' but required in type 'CameraOptions'
    mediaType: 'photo', //필수 속성
    cameraType: 'back',
    saveToPhotos: true,
    quality: 1,
    videoQuality: 'high',
  };

  //2. 촬영 결과를 받아오는 callback 메소드 등록
  launchCamera(options, (response: ImagePickerResponse) => {
    if (response.didCancel) Alert.alert('촬영취소');
    else if (response.errorMessage)
      Alert.alert('Error : ' + response.errorMessage);
    else {
      if (response.assets != null) {
        const uri = response.assets[0].uri;

        const souce = {uri: uri};

        setImg(souce);
      }
    }
  }); //파라미터로 응답객체 받음
};

// 전화걸기 함수
export const connenctCall = (telNumber: string) => {
  Linking.openURL(`tel:${telNumber}`);
};

// ios 사용자에게 알림권한 요청
export const iosRequestPermission = async () => {
  try {
    const authorizationStatus = await messaging().requestPermission();
    // 알림 권한이 허용되면 authorizationStatus 값에 대한 안내는 상단에 작성되어 있습니다.
    // authorizationStatus 값이 AUTHORIZED 일 때,
    if (authorizationStatus === 1) {
      const apnsToken = await firebaseMessaging.getAPNSToken();
      // APNs 토큰이 등록되어 있지 않으면 getToken() 함수가 실패합니다.
      // FCM토큰을 가져오기 전에 APNs 토큰이 등록되어있는지 먼저 확인합니다.
      if (apnsToken) {
        const fcmToken = await firebaseMessaging.getToken();
        // 와이즈트래커 SDK가 토큰을 수집합니다.
        NativeModules.DotReactBridge.setPushToken(fcmToken);
      }
    } else {
      console.log('알림권한 비 활성화:');
    }
  } catch (error) {
    console.log('ios error::', error);
  }
};

// Android 사용자에게 알림권한 요청
export const androidRequestPermission = async () => {
  const authorizationStatus = await messaging().requestPermission();
  console.log('authorizationStatus:', authorizationStatus);
  try {
    const fcmToken = await firebaseMessaging.getToken();
    if (Platform.OS === 'android') {
      console.log('get android FCM Token:', fcmToken);
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          /*
           * 알림허용이 denied 일때, 알림 허용에 대한 재안내와
           * 알림수신에 대한 요청을 다시 할 수 있는 내용 작성가능.
           * */
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Android 13이상 , 알림권한 허용.');
          if (fcmToken) {
            //토큰 수집
            NativeModules.DotReactBridge.setPushToken(fcmToken);
          }
        }
      }
      // API 레벨 32 이하일 때
      try {
        if (fcmToken) {
          //토큰 수집
          NativeModules.DotReactBridge.setPushToken(fcmToken);
        }
      } catch (e) {
        console.log('android token API level 32 이하 error:', e);
      }
    }
  } catch (error) {
    console.log('Android error:', error);
  }
};
