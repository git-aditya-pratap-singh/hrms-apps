import { createSlice } from "@reduxjs/toolkit";

const StateSlices = createSlice({
    name : "stateData",
    initialState : {
        logoutState : false,
        add_popup : {
            add: false,
            edit: false,
            type: '', 
            item: ''
        },
    },
    reducers : {
        logout_popup: (state, action)=>{
            state.logoutState = action.payload;
        },
        add_popup: (state, action)=>{ 
            state.add_popup[action.payload.key === 'add' ? 'add' : 'edit'] = action.payload.status;
            state.add_popup.type = action.payload.role;
            state.add_popup.item = action.payload.item;
        }
    }
})

export default StateSlices;
export const {logout_popup, add_popup} = StateSlices.actions;