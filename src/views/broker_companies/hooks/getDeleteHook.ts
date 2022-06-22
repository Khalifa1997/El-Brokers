import {useContext} from 'react';

import {AxiosResponse} from 'axios';
import getPromo from './getCompaniesHook'
import {remove} from '../../../utilis/requests';
import userContext from '../../../userStore/context'

const useDeleteCompany = () => {
  const {userState } = useContext(userContext);
  const {handleData} = getPromo();
  const removeCompany = async (id:string) => {
  
    try {
      const response: AxiosResponse = await remove(
        `/superadmin/brokercompany?id=${id}`,userState.token
      );
      if (response.status === 200) {
        await handleData();
        //@ts-ignore
      } else {
        return 
      }
    } catch (error) {
      return 
    }
  };

  return {
    removeCompany,
  };
};

export default useDeleteCompany;
