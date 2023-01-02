import React from 'react';
import styles from './Posts.module.css';

import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts } from '../../redux/slices/postsSlice';
import { useTranslation } from 'react-i18next';
import Header from "@components/Header/Header";
import Post from '@components/Post/Post';

const Posts = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const postsData = useSelector((state) => state.posts.allPosts.items);
   const { t } = useTranslation();
   console.log(postsData);
   const posts = postsData.map((item, index) => <Post key={index} {...item}
      isFullPost={false} />);
   React.useEffect(() => {
      dispatch(fetchUserPosts(id));
   }, []);

   return (
      <>
         <Header locationName={t("pages.Posts")} />
         <div className={styles.container}>
            <div className={styles.wrapper}>
               {posts.length === 0
                  ? <div className={styles.noPosts}>{t("Posts.no_posts")}</div> :
                  [posts]}
            </div>
         </div>
      </>
   );
};

export default Posts;