import React from 'react';
import styles from './FullPost.module.css';
import Header from "@components/Header/Header";

import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnePost } from "../../redux/slices/postsSlice";
import { useTranslation } from 'react-i18next';
import Post from './Post';

const FullPost = () => {
   const dispatch = useDispatch();
   const postData = useSelector((state) => state.posts.onePost.item);
   const isLoaded = useSelector((state) => state.posts.onePost.status === "loaded");
   const { id } = useParams();
   const { t } = useTranslation();

   React.useEffect(() => {
      dispatch(fetchOnePost(id));
   }, [id]);


   return (<>
      <Header locationName={t("pages.FullPost")} />
      {isLoaded
         ? <div className={styles.fullPostContainer}>
            <div className={styles.fullPostWrapper}><Post {...postData} isFullPost={true} /></div>
         </div>
         : <div>Loading...</div>}
   </>);
};



export default FullPost;
