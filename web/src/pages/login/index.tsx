import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import api from "../../services/api";

import * as S from './styles';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function Login() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  // useEffect(() => {
  //   api.get("users").then(({ data }) => {
  //     setUsers(data.users);
  //   })
  //   console.log(users);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <S.Card>
      <S.Title>
        Login
      </S.Title>
      <form>
        <Input type='email' placeholder='E-mail' />
        <Input type='password' placeholder='Senha' />
        <Button type='submit'>
          Entrar
        </Button>
        <S.Register>
          Não tem uma conta? <div onClick={() => router.push('/cadastro')}>Clique aqui!</div>
        </S.Register>
      </form>
    </S.Card>
  )
}