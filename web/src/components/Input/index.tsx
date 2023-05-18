import { InputHTMLAttributes } from "react";

import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  onChange?: any;
}

const Input = ({ label, placeholder, onChange }: InputProps) => {

  return (
    <S.Container >
      <label>{label}</label>
      <input placeholder={placeholder} onChange={onChange} />
    </S.Container>
  )
};

export default Input;