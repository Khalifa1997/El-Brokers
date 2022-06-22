//@ts-nocheck
import React, { useContext, useState } from "react";

import { AxiosResponse } from "axios";
import { get, remove } from "../../../utilis/requests";
import userContext from "../../../userStore/context";
import { numberWithCommas } from "../../../utilis/numberSeparator";
const useGetProperties = () => {
  const { userState } = useContext(userContext);
  const [total, setTotal] = useState("0");
  const [totalNew, setTotalNew] = useState("0");
  const [totalRent, setTotalRent] = useState("0");
  const [totalBuy, setTotalBuy] = useState("0");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [properties, setProperties] = useState();
  let temp = {};
  let tempProperties: {}[] = [];
  React.useEffect(() => {
    handleData();
    // eslint-disable-next-line
  }, [userState.token]);
  const handleData = React.useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse = await get(
        `/superadmin/property`,
        userState.token
      );

      if (response.status === 200) {
        setLoading(false);
        setData(response.data.data);
        setTotal("" + response.data.total);
        setTotalNew("" + response.data.newProperty);
        setTotalRent("" + response.data.totalForRent);
        setTotalBuy("" + response.data.totalForSale);
        // eslint-disable-next-line
        response.data.listObj.map((item: any) => {
          let splitter = item.creaetedAt?.split("T");
           // eslint-disable-next-line
          temp = {
            name: item.name ? item.name : "None",
            type: item.type ? item.type : "None",
            leadsConnected: item.leadsConnected? item.leadsConnected : 'unknown',
            image: item.image?.url,
            //  addedOn:splitter[0],
            country: item.general?.country_id
              ? item.general?.country_id.label
              : "Not entered",
            city: item.general?.city_id
              ? item.general?.city_id.label
              : "Not entered",
            rent_sale: item.rent_sale ? item.rent_sale : "Not entered",
            price: item.price
              ? numberWithCommas(item.price, { character: "," })
              : "None",
            addedOn: splitter[0]? splitter[0] : '',
            id: item.id,
            center: [item.geoLocation?.lat, item.geoLocation?.long],
            show: [item.geoLocation?.lat, item.geoLocation?.long],
          };
          tempProperties.push(temp);
        });
        //@ts-ignore
        setProperties(tempProperties);
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
  }, [
    setProperties,
    setLoading,
    setTotal,
    setTotalBuy,
    setTotalNew,
    setTotalRent,
    userState,
    loading,
  ]);
  const removeProperty = async (id: string) => {
    try {
      const response: AxiosResponse = await remove(
        `/superadmin/property?id=${id}`,
        userState.token
      );
      if (response.status === 200) {
        await handleData();
        return;
        //@ts-ignore
      } else {
        return;
      }
    } catch (error) {
      return;
    }
  };

  return {
    total,
    loading,
    data,
    handleData,
    removeProperty,
    properties,
    totalBuy,
    totalNew,
    totalRent,
  };
};

export default useGetProperties;
