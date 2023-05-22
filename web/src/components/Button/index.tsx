import { ButtonHTMLAttributes } from "react";

import * as S from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: any;
  type?: 'submit' | 'button' | 'reset' | undefined;
}

const Button = (props: ButtonProps) => {
  const { children, type } = props;

  return (
    <S.Container type={type} >
      {children}
    </S.Container>
  )
};

export { Button };