import {configureStore} from '@reduxjs/toolkit';
import  UserSlice from './state/user';

export const Store =  configureStore({
    reducer: {
        user: UserSlice
    }
});

export default Store;