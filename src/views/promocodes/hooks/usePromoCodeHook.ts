import {useCallback, useContext, useState} from 'react';

import {AxiosResponse} from 'axios';
import {get, remove, post,patch} from '../../../utilis/requests';
import userContext from '../../../userStore/context'

const useGetPromoCode = () => {
  const {userState } = useContext(userContext);
  const [total,setTotal] = useState("0");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [promoCodes,setPromoCodes] =useState();
  let temp={};
  let tempLeads: {}[] = [];
  const handleData =  useCallback( async () => {
    setLoading(true);
    try {
      const response: AxiosResponse = await get(
        `/promocodes`,userState.token
      );
      if (response.status === 200) {
        setLoading(false);
        setData(response.data);
        setTotal(""+response.data.length)
        // eslint-disable-next-line
        response.data.map((item:any)=>{
        //@ts-nocheck
        let  tempStatus= item.state? "Active" : "Expired"
        // eslint-disable-next-line
        temp={
            id:item._id,
            code:item.code?item.code : "None",
            discountType:item.discount_Type? item.discount_Type : "None",
            discountValue:item.discount_value?item.discount_value : "None",
            createdAt:item.createdAt,
            valid_until:item.valid_until,
            limitCount:item.usage? item.usage : "None",
            status: tempStatus,
           
        }
        tempLeads.push(temp);
        });
        //@ts-ignore
        setPromoCodes(tempLeads)
      } else {
        setLoading(false);
        return 
      }
    } catch (error) {
      setLoading(false);
      return 
    }
  },[setLoading,loading,setData,setTotal,setPromoCodes,tempLeads]);

  const removePromo = useCallback(async (id:string) => {
  
    try {
      const response: AxiosResponse = await remove(
        `/promocodes?id=${id}`,userState.token
      );
      if (response.status === 200) {
        await handleData();
        return
        //@ts-ignore
      } else {
        return 
      }
    } catch (error) {
      return 
    }
  },[handleData, userState.token]);

  const patchPromo = useCallback(async (payload: any, userID: string) => {
    setLoading(true);
    try {
      const response: AxiosResponse = await patch(
        `/promocodes?id=${userID}`,
        payload,
        userState.token,
      );
      if (response.status === 200) {
        setLoading(false);
        handleData();
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      return;
    }
  } , [setLoading, handleData,userState.token])

  const addPromo = useCallback(async(payload: any) => {
    setLoading(true);
    try {
      const response: AxiosResponse = await post(
        `/promocodes`,
        payload,
        userState.token
      );
      if (response.status === 200) {
        setLoading(false);
        handleData();
      } else {
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      return;
    }
  } , [userState.token, setLoading, handleData])
  return {
    total,
    loading,
    data,
    handleData,
    promoCodes,
    removePromo,
    patchPromo,
    addPromo
  };
};

export default useGetPromoCode;

