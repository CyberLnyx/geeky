import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config";
import { ApiResponse } from "../interfaces";
// import { LoginUserResponse } from "../redux/auth/login/interface";

// default
axios.defaults.baseURL = config.API_URL;

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// intercepting to capture errors
axios.interceptors.response.use(
  function (response: AxiosResponse<ApiResponse>): ApiResponse | any {
    return response.data || ({} as any);
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // let message;
    // switch (error.status) {
    //   case 500:
    //     message = "Internal Server Error";
    //     break;
    //   case 401:
    //     message = "Invalid credentials";
    //     break;
    //   case 404:
    //     message = "Sorry! the data you are looking for could not be found";
    //     break;
    //   default:
    //     message = error?.response?.data?.message || error?.message || error;
    // }
    let message =
      error?.response?.data?.message ||
      error?.message ||
      error ||
      "An error occurred!";
    return Promise.reject(message);
  }
);

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token: any) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
  /**
   * Fetches data from given url
   */
  get = (url: string, params?: {}) => {
    return axios.get(url, params);
  };

  /**
   * post given data to url
   */
  create = (url: string, data?: {}) => {
    return axios.post(url, data);
  };

  /**
   * Update but replace data
   */
  put = (url: string, data?: {}) => {
    return axios.put(url, data);
  };

  /**
   * Updates data
   */
  update = (url: string, data?: {}) => {
    return axios.patch(url, data);
  };

  /**
   * Delete
   */
  delete = (url: string, data?: {}, config?: {}) => {
    return axios.delete(url, { ...config, data });
  };

  /*
   file upload update method
  */
  updateWithFile = (
    url: string,
    data: any,
    dataType?: "form-data" | "json"
  ) => {
    let formData = new FormData();
    if (dataType === "form-data") {
      formData = data;
    } else if (dataType === "json") {
      for (const k in data) {
        formData.append(k, data[k]);
      }
    }

    const config = {
      headers: {
        ...axios.defaults.headers,
        "Content-Type": "multipart/form-data",
      },
    };
    return axios.patch(url, formData, config as AxiosRequestConfig<FormData>);
  };

  /*
   file upload post method
   */
  createWithFile = (
    url: string,
    data: any,
    dataType?: "form-data" | "json"
  ) => {
    let formData: FormData = new FormData();
    if (dataType === "form-data") {
      formData = data;
    } else if (dataType === "json") {
      for (const k in data) {
        formData.append(k, data[k]);
      }
    }
    const config = {
      headers: {
        ...axios.defaults.headers,
        "Content-Type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config as AxiosRequestConfig<FormData>);
  };
}

const getLoggedinUser = () => {
  // const user = localStorage.getItem("authUser");
  const user = sessionStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    // return JSON.parse(user) as LoginUserResponse;
  }
};

export { APIClient, setAuthorization, getLoggedinUser };
