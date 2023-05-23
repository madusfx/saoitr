import { ButtonHTMLAttributes } from "react";

import * as S from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: any;
  type?: 'submit' | 'button' | 'reset' | undefined;
  color?: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { children, type, color, onClick } = props;

  return (
    <S.Container type={type} color={color} onClick={onClick} >
      {children}
    </S.Container>
  )
};

export { Button };