import React from 'react';
import styles from './Post.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRemovePost } from '../../redux/slices/postsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import AuthorInfo from '../AuthorInfo/AuthorInfo';
import Product from '../Product/Product';
import ReactMarkdown from 'react-markdown';
import { API_URL } from '../../api/api';

const Post = ({
   id,
   title,
   createdAt,
   imageUrl,
   user,
   viewsCount,
   tags,
   isFullPost,
   isLoading,
   text,
   selectedProducts,
}) => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [removeIsDisable, setRemoveIsDisable] = React.useState(false);

   const userData = useSelector((state) => state.auth.data);
   const isOwner = (userData?.id === user.id);
   const products = selectedProducts.map((item) => <Product key={item} {...item} isFullProduct={false} />);;

   const onRemove = async () => {
      setRemoveIsDisable(true);
      await dispatch(fetchRemovePost(id));
      navigate("/my-posts");
   };

   return (
      <div className={styles.postContainer}>
         <div className={styles.postWrapper}>
            {imageUrl && <div className={styles.image}><img src={`${API_URL}${imageUrl}`} alt="post" /></div>}
            <div className={styles.postContent}>
               <AuthorInfo user={user} createdAt={createdAt} isEditable={isOwner} id={id} editPath="posts" isRemovable={isOwner} onRemove={onRemove} removeIsDisable={removeIsDisable} />
               <div className={styles.content}>
                  <div className={styles.title}>
                     <h2>{isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}</h2>
                  </div>
                  {isFullPost && <div className={styles.text}><span><ReactMarkdown children={text} id={12} /></span></div>}
               </div>
            </div>
            <div className={styles.productsContainer}>
               {products}
            </div>
            <div className={styles.views}><span><FontAwesomeIcon icon={faEye} /> {viewsCount}</span></div>
         </div>
      </div >
   );
};

export default Post;