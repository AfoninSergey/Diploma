import { URL } from "../constants";

export const getCombines = () => fetch(URL.COMBINES).then((response) => response.json())