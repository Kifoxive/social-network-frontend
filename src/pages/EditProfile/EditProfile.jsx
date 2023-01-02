import React from 'react';
import styles from './EditProfile.module.css';

import { useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpdatePassword, selectIsAuth } from '../../redux/slices/authSlice';
import { fetchUpdateUser } from '../../redux/slices/authSlice';
import { fetchAddImage } from '../../redux/slices/postsSlice';
import { useTranslation } from "react-i18next";
import LanguageSwitcher from './LanguageSwitcher';
import Header from "@components/Header/Header";
import { InputText } from '@components/Input/Input';
import { API_URL } from '../../api/api';




const EditProfile = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const inputFileRef = React.useRef();
   const isAuth = useSelector(selectIsAuth);
   const myData = useSelector((state) => state.auth.data);
   const { t } = useTranslation();

   const [fullName, setFullName] = React.useState('');
   const [email, setEmail] = React.useState('');
   const [aboutMe, setAboutMe] = React.useState('');
   const [avatarUrl, setImageUrl] = React.useState('');

   const [password, setPassword] = React.useState('');
   const [newPassword1, setNewPassword1] = React.useState('');
   const [newPassword2, setNewPassword2] = React.useState('');
   const [passMessage, setPassMessage] = React.useState(null);

   const showPassMessage = (message) => {
      setPassMessage(message);
      setTimeout(() => setPassMessage(null), 2000);
   };

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
      const fields = {
         fullName, email, aboutMe, avatarUrl
      };
      const result = await dispatch(fetchUpdateUser(fields));
      navigate(`/profile/${result.payload.id}`);
   };

   const onPasswordChange = async () => {
      const params = { password, newPassword1, newPassword2 };
      const { error, payload } = await dispatch(fetchUpdatePassword(params)).then(
      );
      if (error) {
         showPassMessage({ "error": error.message });
      } else {
         showPassMessage({ "success": payload.message });
      }
   };

   React.useEffect(() => {
      if (isAuth) {
         setFullName(myData.fullName);
         setEmail(myData.email);
         setAboutMe(myData.aboutMe);
         setImageUrl(myData.avatarUrl);
      }
   }, [isAuth]);

   const onClickRemoveImage = () => {
      setImageUrl('');
   };

   if (!window.localStorage.getItem('token') && !isAuth) {
      return <Navigate to='/' />;
   }

   return (
      <>
         <Header locationName={t("pages.EditProfile")} />
         <div className={styles.container}>
            <div className={styles.wrapper}>
               <div className={styles.btn}>
                  <button onClick={() => inputFileRef.current.click()}>{t("EditProfile.add_avatar")}</button>
                  {avatarUrl && <button onClick={onClickRemoveImage}>{t("EditProfile.remove_avatar")}</button>}
                  <input onChange={handleChangeFile} ref={inputFileRef} type="file" hidden />
               </div>

               <div className={styles.content}>
                  {avatarUrl && <div className={styles.image}>
                     <img src={`${API_URL}${avatarUrl}`} alt="avatar" />
                  </div>}
                  <div className={styles.inputs}>
                     <div>
                        <div className={styles.formName}><h2>{t("EditProfile.basic")}</h2></div>
                        <InputText className={styles.input} value={fullName} placeholder={t("placeholders.your_name")} onChange={(e) => setFullName(e.target.value)} />
                        <InputText className={styles.input} value={email} placeholder={t("placeholders.your_email")} onChange={(e) => setEmail(e.target.value)} />
                        <InputText className={styles.input} value={aboutMe} placeholder={t("placeholders.tell_about")} onChange={(e) => setAboutMe(e.target.value)} />

                        <LanguageSwitcher />

                        <div className={styles.sendButtonContainer}>
                           <div className={styles.btn}>
                              <button onClick={onSubmit}>{t("EditProfile.update_info")}</button>
                           </div>
                        </div>
                     </div>
                     <div>
                        <div className={styles.formName}><h2>{t("EditProfile.change_password")}</h2>
                           <InputText className={styles.input} value={password} placeholder={t("EditProfile.current_password")} onChange={(e) => setPassword(e.target.value)} type={'password'} />
                           <InputText className={styles.input} value={newPassword1} placeholder={t("EditProfile.new_password")} onChange={(e) => setNewPassword1(e.target.value)} type={'password'} />
                           <InputText className={styles.input} value={newPassword2} placeholder={t("EditProfile.repeat_new_password")} onChange={(e) => setNewPassword2(e.target.value)} type={'password'} />
                           {passMessage?.success ? passMessage.success : passMessage?.error}
                        </div>
                        <div className={styles.sendButtonContainer}>
                           <div className={styles.btn}>
                              <button onClick={onPasswordChange}>{t("EditProfile.update_password")}</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div >
      </>
   );
};

export default EditProfile;