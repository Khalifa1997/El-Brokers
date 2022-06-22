import { useContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import {
  get,
  axiosPatchWithToken,
  axiosPostWithToken,
  remove,
} from "../../../utilis/requests";
import userContext from "../../../userStore/context";

const useGetProperties = () => {
  const { userState } = useContext(userContext);
  const [userTotal, setUserTotal] = useState("0");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState();
  const [companies, setCompanies] = useState([]);
  const [activeUsers, setActiveUsers] = useState(0);
  const [newUsers, setNewUsers] = useState(0);

  let temp = {};
  let tempUsers: {}[] = [];
  useEffect(() => {
    handleUserData();
    // eslint-disable-next-line
  }, [userState.token]);
  const handleUserData = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse = await get(
        `/superadmin/brokercompany`,
        userState.token
      );

      if (response.status === 200) {
        const tempCompanies: {}[] = [];
        response.data.data.forEach((item: any) => {
          temp = {
            value: item._id,
            label: item.name,
          };
          tempCompanies.push(temp);
        });
        //@ts-ignore
        setCompanies(tempCompanies);
      }
    } catch (error) {
      setLoading(false);
      return;
    }

    try {
      const response: AxiosResponse = await get(
        `/superadmin/user`,
        userState.token
      );
      tempUsers = [];
      if (response.status === 200) {
        setLoading(false);
        setUserTotal(response.data.total);
        setActiveUsers(response.data.totalActive);
        setNewUsers(response.data.totalAdded);

        response.data.data.forEach((item: any) => {
          temp = {
            id: item._id,
            name: item.name ? item.name : "None",
            number: item.number,
            email: item.email,
            brokerCompany: item.companyName ? item.companyName.name : "None",
            brokerCompanyID: item.companyName ? item.companyName._id : "None",
            propertiesAdded: item.propertyAdded,
            leadsAdded: item.leadsAdded,
          };
          tempUsers.push(temp);
        });
        //@ts-ignore
        setUsers(tempUsers);
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      return;
    }
  };
  const submitNewUserData = async (payload: any) => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axiosPostWithToken(
        `/superadmin/user`,
        payload,
        userState.token
      );
      if (response.status === 200) {
        const item = response.data.data[response.data.data.length - 1];
        temp = {
          id: item._id,
          name: item.name ? item.name : "None",
          number: item.number,
          email: item.email,
          brokerCompany: item.companyName ? item.companyName.name : "None",
          brokerCompanyID: item.companyName ? item.companyName._id : "None",
          propertiesAdded: item.propertyAdded,
          leadsAdded: item.leadsAdded,
        };

        if (users) {
          let newUsers = users;
          //@ts-ignore
          newUsers.push(temp);
          setUsers(newUsers);
        }
        setUserTotal(response.data.total);
        setLoading(false);
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      return;
    }
  };
  const editUserData = async (payload: any, userID: string) => {
    setLoading(true);
    try {
      const response: AxiosResponse = await axiosPatchWithToken(
        `/superadmin/user`,
        payload,
        userState.token,
        [["userId", userID]]
      );
      if (response.status === 200) {
        setLoading(false);
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      return;
    }
  };
  const deleteUser = async (userID: string) => {
    setLoading(true);
    try {
      const response: AxiosResponse = await remove(
        `/superadmin/user?userId=${userID}`,
        userState.token
      );
      if (response.status === 200) {
        let x = parseInt(userTotal) - 1;
        //@ts-ignore
        const filteredItems = users.filter((item: any) => item.id !== userID);
        setUsers(filteredItems);
        setUserTotal(x.toString());
        setActiveUsers(activeUsers - 1);
        setNewUsers(newUsers - 1);
        setLoading(false);
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
    userTotal,
    loading,
    handleUserData,
    users,
    submitNewUserData,
    editUserData,
    deleteUser,
    companies,
    activeUsers,
    newUsers,
  };
};

export default useGetProperties;
