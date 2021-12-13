import { types } from "../types/types";

export const uiOpenModal = (modal) => ({
    type: types.uiOpenModal
});

export const uiCloseModal = (modal) => ({
    type: types.uiCloseModal
});