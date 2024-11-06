import { URL } from "./constants";

export const getUsers = () => fetch(URL.USERS).then((response) => response.json())