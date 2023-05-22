import { ButtonHTMLAttributes } from "react";

import * as S from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: any;
  type?: 'submit' | 'button' | 'reset' | undefined;
  color?: string;
}

const Button = (props: ButtonProps) => {
  const { children, type, color } = props;

  return (
    <S.Container type={type} color={color} >
      {children}
    </S.Container>
  )
};

export { Button };