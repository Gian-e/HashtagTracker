import { configureStore } from '@reduxjs/toolkit';
import approverReducer from '../features/approver/ApproverSlice';

export const store = configureStore({
    reducer: {
        approver: approverReducer
    },
});