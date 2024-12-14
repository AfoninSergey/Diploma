import { ACTION_TYPE } from "./action-type";

export const updateChangedParts = (changedPartsData) => ({
	type: ACTION_TYPE.UPDATE_CHANGED_PARTS,
	payload: changedPartsData
})