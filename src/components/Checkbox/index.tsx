import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { useField } from '@unform/core'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle, FiEye } from 'react-icons/fi'

import { Container, InputContainer, } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLElement> {
  id:string
  name: string
  type: string
  label: string
  isChecked: boolean
  icon?: React.ComponentType<IconBaseProps>
}

export const Checkbox:React.FC<InputProps> = ({id, name, icon:Icon, label, isChecked, ...props}) => {
  const [ isFocused, setIsFocused ] = useState(false)
  const [ isFilled, setIsFilled ] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  const handleInputFocus = useCallback(()=>{
    setIsFocused(true)
  },[])

  const handleInputBlur = useCallback(()=>{
    setIsFocused(false)
    setIsFilled(!!inputRef.current?.value)
  },[])

  useEffect(()=>{
    registerField({
      name:fieldName,
      ref:inputRef.current,
      path:'value'
    })
  },[fieldName, registerField])

  return (
    <>
        <InputContainer isFilled={isFilled} isFocused={isFocused} >
            <input
              className={ isChecked ? 'checked' : 'unchecked' }
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              defaultValue={defaultValue}
              ref={inputRef}
              name={name}
              id={id}
              {...props}
            />
            <label htmlFor={id} >{label}</label>
            <span className={props.disabled ? 'disabled' : ''}></span>
        </InputContainer>
    </>
  )
}

