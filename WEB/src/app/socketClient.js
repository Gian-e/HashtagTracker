import socketIOClient from "socket.io-client";
import { store } from './store';

import {
    updateApproved,
    updatePending,
    updateTweets,
    updateHashtag
} from "../features/approver/ApproverSlice";

const ENDPOINT = "http://localhost:3333";

export const initializeSocketClient = () => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("UpdateApproved", data => {
        store.dispatch(updateApproved(data));
    });

    socket.on("UpdatePending", data => {
        store.dispatch(updatePending(data));
    });

    socket.on("UpdateTweets", data => {
        store.dispatch(updateTweets(data));
    });

    socket.on("UpdateHashtag", data => {
        store.dispatch(updateHashtag(data));
    });

    return () => socket.disconnect();
}