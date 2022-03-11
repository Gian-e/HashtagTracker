import '../../App.css';
import { selectHashtag, getTweetsAsync } from '../approver/ApproverSlice';
import {MyNavbar} from './MyNavbar.js';
import styles from './Template.module.css';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';

export function Template(props) {

    const dispatch = useDispatch();
    const hashtag = useSelector(selectHashtag);

    useEffect(async () => {
        if (!hashtag || hashtag == '') {
          dispatch(await getTweetsAsync());
        }
      });

    return (
    <div className={styles.template}>
        <MyNavbar styles={{marginBottom:'20px'}}></MyNavbar>
        {props.children}
    </div>);
}