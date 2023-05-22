import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import md5 from 'md5';
import axios from 'axios';

import api from "../../services/api";
import { getToken, login } from '@/services/auth';
import { Button, Input } from '@/components';

import * as S from './styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password.length > 0 ? md5(password) : null
    };
    axios
    api.post("/login", userData)
      .then((response) => {
        login(response.data.token, response.data.user._id);
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

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push('/home');
    }
  }, []);

  return (
    <S.Card>
      <S.Title>
        Login
      </S.Title>
      <form onSubmit={handleSubmit}>
        <Input type='email' placeholder='E-mail' value={email} onChange={(e: any) => setEmail(e.target.value)} />
        <Input type='password' placeholder='Senha' value={password} onChange={(e: any) => setPassword(e.target.value)} />
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