import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./RegistrationSlice"; 
import authReducer from "./AuthSlice"; 

const store = configureStore({
  reducer: {
    registration: registrationReducer, 
    auth: authReducer, 
  },
});

export default store;
