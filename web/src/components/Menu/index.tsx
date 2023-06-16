import { useRouter } from 'next/router';
import { Button } from '../Button';
import * as S from './styles';

type MenuProps = {
  onClick?: () => void;
  withButton?: boolean;
  title?: string;
};

const Menu = ({ onClick, withButton, title }: MenuProps) => {
  const router = useRouter();

  return (
    <S.Container >
      <div>
        <S.Title>SAOITR</S.Title>
      </div>
      <div>
        <S.Links>
          <S.Link onClick={() => router.push('/home')}>Home</S.Link>
          <S.Link onClick={() => router.push('/registrar_ocorrencia')}>Registrar Ocorrência</S.Link>
          <S.Link>Minhas Ocorrências</S.Link>
          <S.Link onClick={() => router.push('/atualizar_cadastro')}>Atualizar Cadastro</S.Link>
          {withButton ? <Button onClick={onClick} color={'primary'}>{title}</Button> : null}
        </S.Links>
      </div>
    </S.Container>
  )
};

export { Menu };