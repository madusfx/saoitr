import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import md5 from 'md5';

import api from '@/services/api';
import { getToken } from '@/services/auth';
import { Button, Input } from '@/components';

import * as S from './styles';

export default function Cadastro() {
  const [name, setName] = useState('');
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
      name: name,
      email: email,
      password: password.length > 0 ? md5(password) : null
    };
    axios
    api.post("/users", userData)
      .then((response) => {
        console.log(response);
        router.push('/login');
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
    <S.Card>
      <S.Title>
        Cadastro
      </S.Title>
      <form onSubmit={handleSubmit} >
        <Input type='text' placeholder='Nome' value={name} onChange={(e: any) => setName(e.target.value)} />
        <Input type='email' placeholder='E-mail' value={email} onChange={(e: any) => setEmail(e.target.value)} />
        <Input type='password' placeholder='Senha' value={password} onChange={(e: any) => setPassword(e.target.value)} />
        <Button type='submit'>
          Cadastrar
        </Button>
        <S.Register>
          Já tem uma conta? <div onClick={() => router.push('/login')}>Clique aqui!</div>
        </S.Register>
      </form>
    </S.Card>
  )
}