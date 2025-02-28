import { axiosInstance } from "./Axios";

export const GET = async (url: string, params?: unknown) => {
  return axiosInstance.get(url, { params });
}

export const POST = async (url: string, data?: unknown) => {
  return axiosInstance.post(url, data);
}

export const PUT = async (url: string, data?: unknown) => {
  return axiosInstance.put(url, data);
}

export const DELETE = async (url: string) => {
  return axiosInstance.delete(url);
}