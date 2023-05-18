import { InputHTMLAttributes } from "react";

import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
}

const Input = ({ label, placeholder }: InputProps) => {

  return (
    <S.Container >
      <label>{label}</label>
      <input placeholder={placeholder} />
    </S.Container>
  )
};

export default Input;