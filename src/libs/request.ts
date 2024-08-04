import axios from "axios";

import type { AxiosError, AxiosRequestConfig } from "axios";

import { isCustomAxiosError } from "~/utils/is";

export interface Response<T> {
  data: T;
  status: number;
  message: string;
}

export const request = async <T>(config: AxiosRequestConfig): Promise<Response<T>> => {
  try {
    const { data } = await axios.request<Response<T>>({ ...config });
    return data;
  } catch (error) {
    if (isCustomAxiosError(error)) throw error;

    const { response } = error as AxiosError;
    if (response) throw { status: response.status, data: response.data };

    throw error;
  }
};
