import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useLayoutEffect } from "react";
import SplashScreen from "react-native-splash-screen";

import { RootStackParam } from "~/components/AppRouter";
import useFirebaseAuth from "~/hooks/useFirebaseAuth";

const FirebaseAuth = auth();

const useAuthStateChange = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  const { getFirebaseToken } = useFirebaseAuth();

  const handleAuthStateChanged = useCallback(
    async (user: FirebaseAuthTypes.User | null) => {
      try {
        const firebaseToken = await getFirebaseToken(user);
        if (firebaseToken) {
          navigate("Home", { token: firebaseToken });
        } else throw new Error("Firebase token is not found");
      } catch (error) {
      } finally {
        SplashScreen.hide();
      }
    },
    [navigate, getFirebaseToken]
  );

  useLayoutEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(handleAuthStateChanged);
    return () => unsubscribe();
  }, [handleAuthStateChanged]);
};

export default useAuthStateChange;
