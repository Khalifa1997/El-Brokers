import { post } from '../../../utilis/requests';

const signinRequest = async (email: string, password: string) => {
  try {
    const response = await post("/superadmin/login", { email, password });
    return response.data;
  } catch (error) {
    const { response } = error;
    return response.data;
  }
};

export default signinRequest;
