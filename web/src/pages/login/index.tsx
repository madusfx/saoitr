import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import md5 from 'md5';
import axios from 'axios';

import api from "../../services/api";
import { getToken, login } from '@/services/auth';
import { Button, Input, Menu, Card } from '@/components';

import * as S from './styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push('/home');
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password.length > 0 ? md5(password) : null
    };
    axios
    api.post("/login", userData)
      .then((response) => {
        login(response.data.token, response.data.id);
        console.log(response);
        router.push('/home');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <>
      <Menu />
      <Card title={'Login'}>
        <form onSubmit={handleSubmit}>
          <Input label='E-mail' type='email' placeholder='email@email.com' required value={email} onChange={(e: any) => setEmail(e.target.value)} />
          <Input label='Senha' type='password' placeholder='Digite sua senha' required value={password} onChange={(e: any) => setPassword(e.target.value)} />
          <Button type='submit'>
            Entrar
          </Button>
          <S.Register>
            Não tem uma conta? <div onClick={() => router.push('/cadastro')}>Clique aqui!</div>
          </S.Register>
        </form>
      </Card>
    </>
  )
}