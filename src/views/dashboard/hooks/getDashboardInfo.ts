// @ts-nocheck
import { useContext, useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import { get } from "../../../utilis/requests";
import userContext from "../../../userStore/context";

const useGetDahsboard = () => {
  const { userState } = useContext(userContext);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (userState.token !== "") handleData();
     // eslint-disable-next-line
  }, [userState.token]);
  const handleData = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse = await get(
        `/superadmin/dashboard`,
        userState.token
      );

      if (response.status === 200) {
        setLoading(false);
        setData(response.data);
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      return;
    }
  };
  return {
    loading,
    data,
    handleData,
  };
};

export default useGetDahsboard;
