import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useCallback, useLayoutEffect, useState } from "react";

import useFirebaseAuth from "~/hooks/useFirebaseAuth";

const firebaseAuth = auth();

const useFirebaseToken = () => {
  const [idToken, setIdToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  const { getFirebaseToken } = useFirebaseAuth();

  const signOutFirebase = () => firebaseAuth.signOut();

  const handleAuthStateChanged = useCallback(
    async (user: FirebaseAuthTypes.User | null) => {
      if (user) {
        const firebaseToken = await getFirebaseToken(user);
        setIdToken(firebaseToken);
      }
      setInitializing(false);
    },
    [getFirebaseToken]
  );

  useLayoutEffect(() => {
    const subscriber = firebaseAuth.onAuthStateChanged(handleAuthStateChanged);
    return () => subscriber();
  }, [handleAuthStateChanged]);

  return { idToken, initializing, signOutFirebase };
};

export default useFirebaseToken;
