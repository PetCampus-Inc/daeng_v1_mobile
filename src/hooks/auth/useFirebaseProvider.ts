import { useEffect, useState } from "react";
import { getUniqueId } from "react-native-device-info";

import { getFirebaseProvider } from "~/apis/auth";
import { FirebaseProvider } from "~/types/auth.types";

const useFirebaseProvider = () => {
  const [provider, setProvider] = useState<FirebaseProvider | null>(null);

  const fetchLastLogin = async () => {
    try {
      const deviceId = await getUniqueId();
      const response = await getFirebaseProvider(deviceId);
      if (response) setProvider(response);
      else setProvider(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLastLogin();
  }, []);

  return provider;
};

export default useFirebaseProvider;
