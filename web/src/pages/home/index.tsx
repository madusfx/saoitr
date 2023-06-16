/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import api from '@/services/api';
import { getId, getToken, logout } from '@/services/auth';
import { Menu, OccurrenceCard } from '@/components';

import * as S from './styles';

export default function Home() {
  const [data, setData] = useState([]);
  const [userLogged, setUserLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUserLogged(true);
    }
  }, []);

  useEffect(() => {
    axios
    api.get('/occurrences')
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, []);
  console.log(data);

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

  return (
    <S.Container>
      {userLogged ?
        <Menu withButton onClick={handleLogout} title={'Logout'} /> :
        <Menu withButton onClick={() => router.push('/login')} title={'Login'} />
      }
      <S.Title>Ocorrências</S.Title>
      {data.map((data, key) => <OccurrenceCard data={data} key={key} />)}
    </S.Container>
  )
}