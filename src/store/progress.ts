import { atom } from "recoil";

interface ProgressState {
  visible: boolean;
  count: number;
  progress: number;
}

export const progressState = atom<ProgressState>({
  key: "progressState",
  default: {
    visible: false,
    count: 0,
    progress: 0
  }
});
