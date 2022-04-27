import { fetchUser } from "../utils/fetchDataLocalStorage";

const userInfo = fetchUser();
export const initialState = {
  user: userInfo,
};
