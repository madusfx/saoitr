import { useRouter } from 'next/router';
import { Button } from '../Button';
import * as S from './styles';

type MenuProps = {
  onClick?: () => void;
  withLogin?: boolean;
};

const Menu = ({ onClick, withLogin }: MenuProps) => {
  const router = useRouter();

  return (
    <S.Container >
      <div>
        <S.Title>SAOITR</S.Title>
      </div>
      <div>
        <S.Links>
          <S.Link onClick={() => router.push('/registrar_ocorrencia')}>Registrar Ocorrência</S.Link>
          <S.Link>Atualizar Ocorrência</S.Link>
          <S.Link onClick={() => router.push('/atualizar_cadastro')}>Atualizar Cadastro</S.Link>
          {withLogin ? <Button onClick={onClick} color={'primary'}>Logout</Button> : null}
        </S.Links>
      </div>
    </S.Container>
  )
};

export { Menu };