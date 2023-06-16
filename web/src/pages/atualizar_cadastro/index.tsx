import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import md5 from 'md5';
import axios from 'axios';

import api from '@/services/api';
import { getId, getToken, logout } from '@/services/auth';
import { Button, Card, Input, Menu } from '@/components';

import * as S from './styles';

export default function AtualizarCadastro() {
  const [user, setUser] = useState({
    name: '',
    email: ''
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const userId = getId();
  const userToken = getToken();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${userToken}` }
    axios
    api.get('/users/' + userId, { headers })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

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
      name: name.length > 1 ? name : user.name,
      email: email.length > 1 ? email : user.email,
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
      <Menu withButton onClick={handleLogout} title={'Logout'} />
      <Card title={'Atualizar Cadastro'}>
        <form onSubmit={handleSubmit}>
          <Input label='Nome' type='text' placeholder={user.name} value={name} onChange={(e: any) => setName(e.target.value)} />
          <Input label='E-mail' type='email' placeholder={user.email} value={email} onChange={(e: any) => setEmail(e.target.value)} />
          <Input label='Senha' type='password' placeholder='Atualize sua senha' value={password} onChange={(e: any) => setPassword(e.target.value)} />
          <Button type='submit'>
            Atualizar Cadastro
          </Button>
        </form>
      </Card>
    </>
  )
}