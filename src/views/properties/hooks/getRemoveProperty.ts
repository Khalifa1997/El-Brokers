import {useContext} from 'react';

import {AxiosResponse} from 'axios';
import getProp from './getProperties'
import {remove} from '../../../utilis/requests';
import userContext from '../../../userStore/context'

const useDeleteProperty = () => {
  const {userState } = useContext(userContext);
  const {handleData} = getProp();
  const removeProperty = async (id:string) => {
  
    try {
      const response: AxiosResponse = await remove(
        `/superadmin/property?id=${id}`,userState.token
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
  };

  return {
    removeProperty,
  };
};

export default useDeleteProperty;
