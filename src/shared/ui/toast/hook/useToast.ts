import { useToast as useToastBase } from "react-native-toast-notifications";

interface ToastOptions {
  message: string;
  duration?: number;
  bottom?: number;
}

export const useToast = () => {
  const toast = useToastBase();

  return ({ message, duration, bottom }: ToastOptions) => {
    toast.show(message, { data: { bottom }, duration });
  };
};
