import { useState } from "react";
import axios from "axios";

import api from "@/services/api";
import { getId, getToken, logout } from "@/services/auth";
import { Button, Card, Input, Menu } from "@/components";
import { useRouter } from "next/router";

export default function RegistrarOcorrencia() {
  const [registeredAt, setRegisteredAt] = useState('');
  const [ocurrenceLocal, setOcurrenceLocal] = useState('');
  const [ocurrunceType, setOcurrenceType] = useState(0);
  const [ocurrenceKm, setOcurrenceKm] = useState(0);
  const userId = getId();
  const userToken = getToken();
  const router = useRouter();

  const handleLogout = () => {
    const formData = { id: userId }
    const headers = { Authorization: `Bearer ${userToken}` }
    api.post('/logout', formData, { headers }).then((res) => {
      logout();
      router.push('/login');
    }).catch((err) => {
      console.log('Erro no logout: ', err);
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(registeredAt)
    const userData = {
      registered_at: registeredAt,
      local: ocurrenceLocal,
      occurrence_type: ocurrunceType,
      km: ocurrenceKm,
      user_id: userId,
    };
    const headers = { Authorization: `Bearer ${userToken}` }
    axios
    api.post("/occurrences",
      userData,
      { headers })
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
    <>
      <Menu withLogin onClick={handleLogout} />
      <Card title={'Registrar Ocorrência'}>
        <form onSubmit={handleSubmit} >
          <Input label='Quando a ocorrência aconteceu?' type='text' placeholder='YYYY-MM-DD HH:mm:ss' value={registeredAt} onChange={(e: any) => setRegisteredAt(e.target.value)} />
          <Input label='Onde a ocorrência aconteceu?' type='text' placeholder='Digite o local' value={ocurrenceLocal} onChange={(e: any) => setOcurrenceLocal(e.target.value)} />
          <Input label='Qual o tipo da ocorrência?' type='number' placeholder='Crie uma senha' value={ocurrunceType} onChange={(e: any) => setOcurrenceType(e.target.value)} />
          <Input label='Em qual KM aconteceu a ocorrência?' type='number' placeholder='Ex: KM 0 - KM 9999' value={ocurrenceKm} onChange={(e: any) => setOcurrenceKm(e.target.value)} />
          <Button type='submit'>
            Registrar Ocorrência
          </Button>
        </form>
      </Card>
    </>
  )
}