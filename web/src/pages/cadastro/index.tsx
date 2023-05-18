import { useRouter } from 'next/router';

import * as S from './styles';
import Button from '@/components/Button';
import { useState } from 'react';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  return (
    <S.Card>
      <S.Title>
        Cadastro
      </S.Title>
      <form>
        <S.Input type='text' placeholder='Nome' value={email} />
        <S.Input type='email' placeholder='E-mail' />
        <S.Input type='password' placeholder='Senha' />
        <Button>
          Cadastrar
        </Button>
        <S.Register>
          Já tem uma conta? <div onClick={() => router.push('/login')}>Clique aqui!</div>
        </S.Register>
      </form>
    </S.Card>
  )
}