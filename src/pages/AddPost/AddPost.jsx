import React from 'react';
import styles from './AddPost.module.css';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectIsAuth } from '../../redux/slices/authSlice';
import { fetchAddImage, fetchOnePost, fetchSendPost, fetchUpdatePost } from '../../redux/slices/postsSlice';
import { fetchMineProducts } from '../../redux/slices/productsSlice';
import { useTranslation } from 'react-i18next';
import Header from '../../@components/Header/Header';
import { InputButton, InputText, InputTextarea } from '@components/Input/Input';
import ProductCell from './ProductCell';
import { API_URL } from 'api/api';

const AddPost = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { id } = useParams();
   const [text, setText] = React.useState('');
   const [title, setTitle] = React.useState('');
   const [tags, setTags] = React.useState('');
   const [imageUrl, setImageUrl] = React.useState('');
   const [availableProducts, setAvailableProducts] = React.useState([]);
   const [showProducts, setShowProducts] = React.useState(false);
   const [selectedProducts, setSelectedProducts] = React.useState({});
   const { t } = useTranslation();

   const isAuth = useSelector(selectIsAuth);
   const inputFileRef = React.useRef(null);
   const isEditing = Boolean(id);

   React.useEffect(() => {
      if (id) {
         dispatch(fetchOnePost(id)).then(({ payload }) => {
            setTitle(payload.title);
            setText(payload.text);
            setImageUrl(payload.imageUrl);
            setTags(payload.tags.join(', '));
            const newSelectedProducts = {};
            payload.selectedProducts.forEach((item) => {
               newSelectedProducts[item.id] = item.title;
            });
            console.log(payload.selectedProducts);
            setSelectedProducts(newSelectedProducts);
         }).catch((e) => {
            console.warn(e);
         });
      }
   }, [id]);

   const handleChangeFile = async (event) => {
      try {
         const formData = new FormData();
         const file = event.target.files[0];
         formData.append('image', file);

         const result = await dispatch(fetchAddImage(formData));
         setImageUrl(result.payload.url);
      } catch (err) {
         console.warn(err);
      }
   };

   const onSubmit = async () => {
      try {
         const fields = {
            title, imageUrl, tags, text, id, selectedProducts: Object.keys(selectedProducts)
         };
         const result = isEditing ? await dispatch(fetchUpdatePost(fields)) : await dispatch(fetchSendPost(fields));
         navigate(`/posts/${result.payload.postId}`);
      } catch (err) {
         console.warn(err);
      }
   };
   const onClickRemoveImage = () => {
      setImageUrl('');
   };

   React.useEffect(() => {
      if (isAuth) {
         dispatch(fetchMineProducts()).then(({ payload }) => {
            setAvailableProducts(payload.products);
         });
      }
   }, [isAuth]);

   console.log(availableProducts);
   const productsElements = availableProducts.map(elem => <ProductCell key={elem.id} {...elem} toggleProductSelected={toggleProductSelected} isSelected={(Object.keys(selectedProducts).includes(elem.id))} />);

   function toggleProductSelected(productId, productTitle) {
      if (productId in selectedProducts) {
         const { [productId]: [deletedId], ...selectedProductNew } = selectedProducts;
         setSelectedProducts(selectedProductNew);
      } else {
         setSelectedProducts({ [productId]: productTitle, ...selectedProducts });
      }
   }

   const getSelectedProductsTitle = (products) => {
      const elems = [];
      for (let product in products) {
         elems.push(<p className={styles.selectedTitle} key={product}>{products[product]}</p>);
      }
      return elems;
   };

   return (
      <>
         <Header locationName={t("pages.AddPost")} />
         <div className={styles.container}>
            <div className={styles.wrapper}>
               {
                  showProducts
                     ? <div className={styles.selectProductsContainer}>
                        <div className={styles.selectedProductsWrapper}>{productsElements}</div>
                        <InputButton value="back to edit" onClick={() => { setShowProducts(false); }} />
                     </div>
                     : <>
                        <div className={styles.btn}>
                           <button onClick={() => inputFileRef.current.click()}>{t("basics.add_preview")}</button>
                           {imageUrl && <button onClick={onClickRemoveImage}>{t("basics.remove_preview")}</button>}
                           <input onChange={handleChangeFile} ref={inputFileRef} type="file" hidden /></div>
                        {imageUrl && <div className={styles.image}>
                           <img src={`${API_URL}${imageUrl}`} alt="poster" />
                        </div>}
                        <InputText className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("placeholders.title")} />
                        <InputText className={styles.input} value={tags} onChange={(e) => setTags(e.target.value)} placeholder={t("placeholders.tags")} />
                        <InputTextarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("placeholders.description")} />
                        <div className={styles.selectedTitlesContainer}>
                           <p className={styles.productsCounter}>{t("AddPost.products_number")}: <span>{Object.keys(selectedProducts).length}</span></p>
                           {getSelectedProductsTitle(selectedProducts)}
                        </div>
                        <InputButton value={t("AddPost.select_products")} onClick={() => { setShowProducts(true); }} />
                        <div className={styles.btn}>
                           <button onClick={onSubmit}>{isEditing ? t("basics.update") : t("basics.submit")}</button>
                        </div>
                     </>
               }
            </div>
         </div>
      </>
   );
};

export default AddPost;