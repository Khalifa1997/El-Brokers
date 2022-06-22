import { axiosPostWithToken } from "../utilis/requests";

const body = {};
const signOutRequest = async (token: string) => {
  try {
    const response = await axiosPostWithToken(
      "/superadmin/logout",
      body,
      token
    );
    return response.data;
  } catch (error) {
    const { response } = error;
    return response;
  }
};

export default signOutRequest;
