import { Button } from '../Button';
import * as S from './styles';

type MenuProps = {
  onClick?: () => void;
  withLogin?: boolean;
};

const Menu = ({ onClick, withLogin }: MenuProps) => {
  return (
    <S.Container >
      <S.Title>SAOITR</S.Title>
      {withLogin ? <Button onClick={onClick} color={'primary'}>Logout</Button> : null}
    </S.Container>
  )
};

export { Menu };