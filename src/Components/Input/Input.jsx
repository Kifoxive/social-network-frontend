import React from 'react'
import styles from './Input.module.css'

export const InputText = ({
   onChange, value, placeholder, register, error, ...props
}) => {

   return (
      <div className={styles.inputTextContainer}>
         <input
            type="text" placeholder={placeholder} value={value} onChange={onChange} {...props} />
      </div>
   )
}


export const InputButton = ({ value, onChange, ...props
}) => {
   return (
      <div className={styles.buttonContainer}>
         <button onClick={onChange} {...props}>{value}</button>
      </div>
   )
}
