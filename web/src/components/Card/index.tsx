import * as S from './styles';

type CardProps = {
  title?: string;
  children?: any;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <S.Container >
      <S.Title>{title}</S.Title>
      {children}
    </S.Container>
  )
};

export { Card };