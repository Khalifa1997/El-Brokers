import {getFromStorage, saveToStorage, removeFromStorage} from './localStorage';
import {hasValue} from './validators/isThereData';

export const cashProfile = async (profile: string) => {
  await saveToStorage('currentUser', JSON.stringify(profile));
};

export const isLoggedIn = async () => {
  const data : any = await getFromStorage('currentUser');
  const parsedData = await JSON.parse(data);
  return await hasValue(parsedData);
};

export const getDataFormCachedProfile = async () => {
  const data : any = await getFromStorage('currentUser');
  const parsedData = await JSON.parse(data);
    return await parsedData;
};

export const removeCachedProfile = async () => {
  await removeFromStorage('currentUser');
};
