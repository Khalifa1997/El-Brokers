export default interface Props {
  children: React.ReactNode[];
}

export interface State {
  name: string;
  email: string;
  token: string;
  role: string;
  joinDate: string;
  id: string;
  confirmed: boolean;
  image:string;
  country: string;
  countryId: string;

}

export type StoreApi = {
  userState: State;
  setUserContext: React.Dispatch<React.SetStateAction<State>>;
};


