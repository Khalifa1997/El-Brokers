// @ts-nocheck
import { useContext, useState, useCallback, useEffect } from "react";

import { AxiosResponse } from "axios";
import { get, remove } from "../../../utilis/requests";
import userContext from "../../../userStore/context";
import { numberWithCommas } from "../../../utilis/numberSeparator";
const useGetLeads = () => {
  const { userState } = useContext(userContext);
  const [total, setTotal] = useState("0");
  const [totalNew, setTotalNew] = useState("0");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [leads, setLeads] = useState();
  let temp = {};
  let tempLeads: {}[] = [];
  useEffect(() => {
    handleData();
    // eslint-disable-next-line
  }, [userState.token]);
  const handleData = useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse = await get(
        `/superadmin/leads`,
        userState.token
      );

      if (response.status === 200) {
        setLoading(false);
        setData(response.data.data);
        setTotal("" + response.data.total);
        setTotalNew("" + response.data.newLeads);
        // eslint-disable-next-line
        response.data.data.map((item: any) => {
          let splitter = item.createdAt?.split("T");
          // eslint-disable-next-line
          temp = {
            id: item.id,
            fullName: item.leadDetails?.fullName,
            type: item.leadDetails?.type,
            addedBy: item.leadDetails?.owner_id?.name,
            addedOn: splitter[0],
            phoneNumber: item.leadDetails?.phoneNumber,
            budget: item.requestedDetails
              ? numberWithCommas(item.requestedDetails.priceTo, {
                  character: ",",
                })
              : "None",
            email: item.leadDetails?.email,
          };
          tempLeads.push(temp);
        });
        //@ts-ignore
        setLeads(tempLeads);
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log("catch");
      setLoading(false);
      return;
    }
  }, [setLoading, loading, setTotal, setTotalNew, setLeads, leads]);
  const removeLead = useCallback(async (id: string) => {
    setLoading(true)
    try {
      const response: AxiosResponse = await remove(
        `/superadmin/leads?id=${id}`,
        userState.token
      );
      if (response.status === 200) {
        setLoading(false)
        await handleData();
        return;
        //@ts-ignore
      } else {
        return;
      }
    } catch (error) {
      setLoading(false)
      return;
    }
  },[setLoading, handleData, userState.token]);
  return {
    total,
    loading,
    data,
    handleData,
    leads,
    removeLead,
    totalNew,
  };
};

export default useGetLeads;
