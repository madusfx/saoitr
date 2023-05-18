import { useRouter } from 'next/router';

import * as S from './styles';
import Button from '@/components/Button';
import { useState } from 'react';
import api from '@/services/api';
import axios from 'axios';
import Input from '@/components/Input';

export default function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password
    };
    axios
    api.post("/users", userData)
      .then((response) => {
        console.log(response);
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