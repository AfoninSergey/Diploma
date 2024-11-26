import { URL } from "../constants";
import { transformParts } from "../transformers";

export const getParts = () => fetch(URL.PARTS).then((response) => response.json()).then(loadedParts => loadedParts && transformParts(loadedParts))