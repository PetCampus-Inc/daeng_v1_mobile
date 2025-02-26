import { NaverMapView, NaverMapMarkerOverlay } from "@mj-studio/react-native-naver-map";
import CookieManager from "@react-native-cookies/cookies";
import { useEffect, useState } from "react";
import { View, Text, Platform, TextInput, Alert, TouchableOpacity } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS } from "react-native-permissions";
import SplashScreen from "react-native-splash-screen";

import { baseUrl } from "@_shared/config/domain";

interface Location {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}

interface SearchResult {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}

const mockLocations: Location[] = [
  {
    id: 1,
    latitude: 37.4857973301775,
    longitude: 127.11476986573635,
    name: "똑독 유치원 1호점",
    description: "애견 유치원"
  },
  {
    id: 2,
    latitude: 37.48822,
    longitude: 127.11921,
    name: "똑독 유치원 2호점",
    description: "애견 카페"
  },
  {
    id: 3,
    latitude: 37.48322,
    longitude: 127.10921,
    name: "똑독 유치원 3호점",
    description: "애견 호텔"
  },
  {
    id: 4,
    latitude: 37.48922,
    longitude: 127.12321,
    name: "똑독 유치원 4호점",
    description: "애견 미용"
  },
  {
    id: 5,
    latitude: 37.48122,
    longitude: 127.11721,
    name: "똑독 유치원 5호점",
    description: "애견 훈련"
  },
  {
    id: 6,
    latitude: 37.49122,
    longitude: 127.11121,
    name: "똑독 유치원 6호점",
    description: "애견 용품"
  },
  {
    id: 7,
    latitude: 37.48722,
    longitude: 127.12321,
    name: "똑독 유치원 7호점",
    description: "애견 병원"
  },
  {
    id: 8,
    latitude: 37.47922,
    longitude: 127.11221,
    name: "똑독 유치원 8호점",
    description: "애견 놀이터"
  },
  {
    id: 9,
    latitude: 37.49322,
    longitude: 127.11921,
    name: "똑독 유치원 9호점",
    description: "애견 유치원"
  },
  {
    id: 10,
    latitude: 37.48222,
    longitude: 127.10721,
    name: "똑독 유치원 10호점",
    description: "애견 호텔"
  }
];

export const MapScreen = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [inputLatitude, setInputLatitude] = useState("37.48580");
  const [inputLongitude, setInputLongitude] = useState("127.11477");
  const [markers, setMarkers] = useState<Location[]>(mockLocations);

  const [cameraPosition, setCameraPosition] = useState({
    latitude: 37.45991, // 서울시청
    longitude: 127.16193,
    zoom: 15, // 적당한 줌 레벨
    bearing: 0 // 정북 방향
  });

  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log("현재 위치:", { latitude, longitude });

        // 현재 위치로 검색 수행
        // searchLocations(latitude, longitude);

        // 현재 위치로 카메라 이동
        setCameraPosition({
          latitude,
          longitude,
          zoom: 15,
          bearing: 0
        });
      },
      (error) => {
        console.log("위치 가져오기 오류:", error);
        Alert.alert("오류", "위치를 가져오는데 실패했습니다.");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000
      }
    );
  };

  // 초기 위치 권한 요청 및 위치 가져오기
  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const permission =
          Platform.OS === "ios"
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

        const status = await request(permission);

        if (status === "granted") {
          getCurrentLocation();
        } else {
          Alert.alert("권한 필요", "위치 권한이 필요합니다. 설정에서 권한을 허용해주세요.", [
            { text: "확인", onPress: () => console.log("Permission denied") }
          ]);
        }
      } catch (error) {
        console.error("Permission error:", error);
        Alert.alert("오류", "위치 권한을 확인하는 중 문제가 발생했습니다.");
      }
    };

    requestLocationPermission();
  }, []);

  const searchLocations = async (latitude: number, longitude: number) => {
    try {
      setIsLoading(true);
      const cookies = await CookieManager.get(baseUrl);
      const accessToken = cookies.accessToken;

      // API 엔드포인트를 실제 서버 주소로 변경해주세요
      const response = await fetch(
        `https://api.knockdog.net/api/v0/school/search/map?lat=${latitude}&lng=${longitude}&radius=1000`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("검색 중 오류가 발생했습니다");
      }

      const data = await response.json();
      setSearchResults(data);

      // 검색 결과를 마커로 표시
      setMarkers(data);

      // 카메라 위치 변경
      setCameraPosition({
        latitude,
        longitude,
        zoom: 15,
        bearing: 0
      });
    } catch (error) {
      Alert.alert("오류", "검색 중 문제가 발생했습니다.");
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <NaverMapView style={{ width: "100%", height: "75%" }} camera={cameraPosition}>
        {markers.map((location) => (
          <NaverMapMarkerOverlay
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
            onTap={() => console.log(location.name)}
            caption={{
              text: location.name
            }}
            subCaption={{
              text: location.description
            }}
            width={30}
            height={40}
            uri="https://picsum.photos/100/100"
          />
        ))}
      </NaverMapView>
      <View style={{ padding: 10 }}>
        {location && (
          <Text style={{ fontSize: 16, marginBottom: 10 }}>
            현재 위치: 위도 {location.latitude.toFixed(4)}, 경도 {location.longitude.toFixed(4)}
          </Text>
        )}
      </View>
      <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          style={{
            width: 150,
            height: 40,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            paddingHorizontal: 10,
            marginRight: 10
          }}
          placeholder="위도 입력 (예: 37.5665)"
          keyboardType="numeric"
          value={inputLatitude}
          onChangeText={setInputLatitude}
        />
        <TextInput
          style={{
            width: 150,
            height: 40,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            paddingHorizontal: 10
          }}
          placeholder="경도 입력 (예: 126.9780)"
          keyboardType="numeric"
          value={inputLongitude}
          onChangeText={setInputLongitude}
        />
      </View>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#4A90E2",
            padding: 15,
            borderRadius: 5,
            alignItems: "center",
            width: "100%",
            opacity: isLoading ? 0.7 : 1
          }}
          disabled={isLoading}
          onPress={() => {
            const lat = parseFloat(inputLatitude);
            const lng = parseFloat(inputLongitude);

            if (isNaN(lat) || isNaN(lng)) {
              Alert.alert("오류", "올바른 위도와 경도 값을 입력해주세요.");
              return;
            }
            setCameraPosition({
              latitude: lat,
              longitude: lng,
              zoom: 15,
              bearing: 0
            });

            // searchLocations(lat, lng);
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>
            {isLoading ? "검색 중..." : "검색하기"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <TouchableOpacity
          onPress={() => {
            setCameraPosition({
              ...cameraPosition,
              tilt: 60, // 더 기울어진 시점으로 변경
              zoom: 17 // 더 확대
            });
          }}
        >
          <Text>카메라 변경</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
