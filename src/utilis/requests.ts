import axios from "axios";
import { defaultUrl } from "../config";

export const filterQurery = function (arr2d: [string, unknown][]): string {
  const query = arr2d
    .map((v) => (v[1] !== "" && v[1] !== undefined ? `${v[0]}=${v[1]}` : ""))
    .filter((v) => v)
    .join("&");
  return query.length ? `?${query}` : "";
};

export const get = async (url: string, token: string) => {
  return await axios.get(defaultUrl + url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const patch = async (url: string, body?: any, token?: string) => {
  return await axios.patch(defaultUrl+ url, body, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
};
export const post = async (url: string, body?: any, token?:any) => {
  return await axios.post(defaultUrl + url, body, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
};
export const put = async (url: string, body: any) => {
  return await axios.put(defaultUrl + url, body);
};

export const axiosGetWithToken = async (
  url: string,
  body?: {},
  token?: string,
  query?: [string, unknown][]
) => {
  let q = filterQurery(query ?? []);
  return await axios.get(`${defaultUrl}${url}/${q}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const axiosPostWithToken = async (
  url: string,
  body: {},
  token: string,
  query?: [string, unknown][]
) => {
  let q = filterQurery(query ?? []);
  return await axios.post(`${defaultUrl}${url}/${q}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const axiosPatchWithToken = async (
  url: string,
  body?: any,
  token?: string,
  query?: [string, unknown][]
) => {
  let q = filterQurery(query ?? []);
  return await axios.patch(`${defaultUrl}${url}/${q}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const axiosRemoveWithToken = async (
  url: string,
  body?: any,
  token?: string,
  query?: [string, unknown][]
) => {
  let q = filterQurery(query ?? []);
  return await axios.delete(`${defaultUrl}${url}/${q}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const remove = async (url: string, token: string, body?: any) => {
  return await axios.delete(`${defaultUrl}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
