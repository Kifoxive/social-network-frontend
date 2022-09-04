import React from 'react'
import styles from './Input.module.css'
// import cls from 'classnames'

export const InputText = ({
   onChange, value, placeholder, ...props
}) => {

   return (
      <div className={styles.inputTextContainer}>
         <input
            type="text" placeholder={placeholder} value={value} onChange={onChange} {...props} />
      </div>
   )
}


export const InputButton = ({ value, onClicking, isDisabled, ...props
}) => {
   return (
      <div className={styles.buttonContainer}>
         <button className={isDisabled ? styles.buttonDisabled : ''} disabled={isDisabled} onClick={onClicking} {...props}>{value}</button>
      </div>
   )
}

export const InputTextarea = ({
   onChange, value, placeholder, ...props
}) => {

   return (
      <div className={styles.inputTextareaContainer}>
         <textarea
            type="text" placeholder={placeholder} value={value} onChange={onChange} {...props} />
      </div>
   )
}