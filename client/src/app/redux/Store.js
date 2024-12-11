import { configureStore } from "@reduxjs/toolkit";
import StateSlices from "./slices/StateSlices";

const Store = configureStore({
    reducer : {
        openPopup : StateSlices.reducer
    }
})
export default Store;