import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useCallback, useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";

import useFirebaseAuth from "~/hooks/useFirebaseAuth";

const FirebaseAuth = auth();

const useAuthStateChange = () => {
  const [initializing, setInitializing] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const { getFirebaseToken } = useFirebaseAuth();

  const handleAuthStateChanged = useCallback(
    async (user: FirebaseAuthTypes.User | null) => {
      try {
        const firebaseToken = await getFirebaseToken(user);
        setToken(firebaseToken);
      } catch (error) {
        console.log(error);
      }

      setInitializing(false);
      SplashScreen.hide();
    },
    [getFirebaseToken]
  );

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(handleAuthStateChanged);
    return () => unsubscribe();
  });

  return { initializing, token };
};

export default useAuthStateChange;
