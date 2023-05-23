import { useEffect } from 'react';
import { useRouter } from 'next/router';

import api from '@/services/api';
import { getId, logout } from '@/services/auth';
import { getToken } from '@/services/auth';
import { Menu } from '@/components';

import * as S from './styles';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    }
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

  return (
    <S.Container>
      <Menu withLogin onClick={handleLogout} />
    </S.Container>
  )
}