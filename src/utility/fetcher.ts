import axios from 'axios';
import { Emitter } from './EventLEmitter';

export const UNAUTHORIZED = 'UNAUTHORIZED';

export const fetchAPI = async <T>(
  path: string,
  token?: string | null,
): Promise<T> => {
  try {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}${path}`);
    return data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      Emitter.emit(UNAUTHORIZED);
    }
    throw new Error(error);
  }
};

export const postAPI = async <T>(
  path: string,
  body?: any,
  token?: string | null,
): Promise<T> => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}${path}`,
      body,
    );
    return data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      Emitter.emit(UNAUTHORIZED);
    }
    throw new Error(error);
  }
};

export const deleteApi = async <T>(
  path: string,
  token?: string | null,
): Promise<T> => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_URL}${path}`,
    );
    return data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      Emitter.emit(UNAUTHORIZED);
    }
    throw new Error(error);
  }
};

export const getAxiosError = (error: any) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};
