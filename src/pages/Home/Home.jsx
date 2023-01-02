import React from "react";
import styles from './Home.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../redux/slices/postsSlice';
import { useTranslation } from "react-i18next";
import Header from "@components/Header/Header";
import Post from '@components/Post/Post';

const Home = () => {
   const dispatch = useDispatch();
   const postsData = useSelector((state) => state.posts.allPosts.items);
   const { t } = useTranslation();
   const posts = postsData.map((item, index) => <Post key={index} {...item}
      isFullPost={false} />);

   React.useEffect(() => {
      dispatch(fetchPosts());
   }, []);

   return (
      <>
         <Header locationName={t("pages.Home")} />
         <div className={styles.container}>
            <div className={styles.wrapper}>{[posts]}</div>
         </div>
      </>
   );
};


export default Home;