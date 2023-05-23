import { InputHTMLAttributes } from "react";

import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  onChange?: any;
  type?: string;
}

const Input = ({ label, placeholder, type, onChange }: InputProps) => {

  return (
    <S.Container >
      <label>{label}</label>
      <input placeholder={placeholder} onChange={onChange} type={type} />
    </S.Container>
  )
};

export { Input };