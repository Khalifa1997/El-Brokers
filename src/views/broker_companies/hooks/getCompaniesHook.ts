import React, { useContext, useState } from "react";

import { AxiosResponse } from "axios";
import {
  get,
  axiosPatchWithToken,
  axiosPostWithToken,
  axiosRemoveWithToken,
  axiosGetWithToken,
} from "../../../utilis/requests";
import userContext from "../../../userStore/context";
import { numberWithCommas } from "../../../utilis/numberSeparator";

interface IAddCompanyPayload {
  name: string;
  measureUnit: string;
  currency: string;
  admin_id: string;
  plan: string;
}
const useGetProperties = () => {
  const { userState } = useContext(userContext);
  const [info, setInfo] = useState({
    total: 0,
    newCompany: 0,
    totalIncome: 0,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [companies, setCompanies] = useState();

  const handleData = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse = await get(
        `/superadmin/brokercompany`,
        userState.token
      );

      if (response.status === 200) {
        setLoading(false);
        setData(response.data.data);
        setInfo({
          total: numberWithCommas(response.data.total),
          newCompany: numberWithCommas(response.data.newCompany),
          totalIncome: numberWithCommas(response.data.totalIncome),
        });

        const companiesRes = response.data.data.map((item: any) => {
          return {
            _id: item._id,
            name: item.name,
            phoneNumber: numberWithCommas(item.phoneNumber, {
              character: "-",
              each: 3,
            }),
            country_id: item.country_id
              ? item.country_id.label ?? "None"
              : "None",

            currency: item.currency,
            measureUnit: item.measureUnit,
          };
        });
        // debugger;
        setCompanies(companiesRes);
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      return;
    }
  };

  const companyOperation = React.useCallback(
    async (
      payload: IAddCompanyPayload,
      functionOperation: (...args: any) => Promise<AxiosResponse<any>>,
      query?: [string, unknown][],
      callback?: (response: AxiosResponse) => void
    ) => {
      setLoading(true);
      try {
        const response: AxiosResponse = await functionOperation(
          `/superadmin/brokercompany`,
          payload,
          userState.token,
          query
        );
        if (response.status === 200) {
          const fun = callback ? callback : (...args: any) => {};
          fun(response);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [userState.token]
  );

  // pending
  const addCompany = (payload: IAddCompanyPayload) =>
    companyOperation(payload, axiosPostWithToken, [], () => {
      handleData();
    });

  // pending
  const editCompany = (
    payload: IAddCompanyPayload,
    query: [string, unknown][]
  ) =>
    companyOperation(payload, axiosPatchWithToken, query, () => {
      handleData();
    });

  // done
  const removeCompany = (payload: string) => {
    companyOperation({} as any, axiosRemoveWithToken, [["id", payload]], () => {
      handleData();
    });
  };

  const getCompanies = React.useCallback(() => {
    companyOperation({} as any, axiosGetWithToken, [], (response) => {
      setData(response.data.data);
      setInfo({
        total: numberWithCommas(response.data.total),
        newCompany: numberWithCommas(response.data.newCompany),
        totalIncome: numberWithCommas(response.data.totalIncome),
      });

      const companiesRes = response.data.data.map((item: any) => {
        return {
          _id: item._id,
          name: item.name,
          phoneNumber: numberWithCommas(item.phoneNumber, {
            character: "-",
            each: 3,
          }),
          country_id: item.country_id
            ? item.country_id.label ?? "None"
            : "None",

          currency: item.currency,
          measureUnit: item.measureUnit,
        };
      });
      setCompanies(companiesRes);
    });
  }, [companyOperation]);

  React.useEffect(() => {
    // handleData();
    getCompanies();
  }, [getCompanies]);

  return {
    info,
    loading,
    data,
    handleData,
    addCompany,
    editCompany,
    removeCompany,
    companies,
    getCompanies,
  };
};

export default useGetProperties;
