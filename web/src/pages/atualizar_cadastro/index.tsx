import { useState } from 'react';
import { useRouter } from 'next/router';
import md5 from 'md5';
import axios from 'axios';

import api from '@/services/api';
import { getId, getToken, logout } from '@/services/auth';
import { Button, Card, Input, Menu } from '@/components';

import * as S from './styles';

export default function AtualizarCadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const userId = getId();
  const userToken = getToken();

  const handleLogout = () => {
    const formData = { id: getId() }
    const headers = { Authorization: `Bearer ${getToken()}` }
    api.post('/logout', formData, { headers }).then((res) => {
      logout();
      router.push('/login');
    }).catch((err) => {
      console.log('Erro no logout: ', err);
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password.length > 0 ? md5(password) : null
    };
    const headers = { Authorization: `Bearer ${userToken}` }
    axios
    api.put("/users/" + userId, userData, { headers })
      .then((response) => {
        console.log("Usuário atualizado com sucesso!");
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
    <>
      <Menu withLogin onClick={handleLogout} />
      <Card title={'Atualizar Cadastro'}>
        <form onSubmit={handleSubmit}>
          <Input label='Nome' type='text' placeholder='Digite seu nome' value={name} onChange={(e: any) => setName(e.target.value)} />
          <Input label='E-mail' type='email' placeholder='email@email.com' value={email} onChange={(e: any) => setEmail(e.target.value)} />
          <Input label='Senha' type='password' placeholder='Crie uma senha' value={password} onChange={(e: any) => setPassword(e.target.value)} />
          <Button type='submit'>
            Atualizar Cadastro
          </Button>
        </form>
      </Card>
    </>
  )
}