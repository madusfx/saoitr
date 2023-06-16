import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import moment from 'moment-timezone';

import api from "@/services/api";
import { getId, getToken, logout } from "@/services/auth";
import { Button, Card, Input, Menu } from "@/components";
import { useRouter } from "next/router";

import * as S from './styles';

const OccurencesTypes = [
  { id: 1, name: "Atropelamento" },
  { id: 2, name: "Deslizamento" },
  { id: 3, name: "Colisão frontal" },
  { id: 4, name: "Capotagem" },
  { id: 5, name: "Saída de pista" },
  { id: 6, name: "Batida em objeto fixo" },
  { id: 7, name: "Veículo avariado" },
  { id: 8, name: "Colisão com motocicletas" },
  { id: 9, name: "Colisão no mesmo sentido ou transversal" },
  { id: 10, name: "Construção" }
];

export default function RegistrarOcorrencia() {
  const [ocurrenceLocal, setOcurrenceLocal] = useState('');
  const [ocurrunceType, setOcurrenceType] = useState(OccurencesTypes[0].id);
  const [ocurrenceKm, setOcurrenceKm] = useState(0);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const userId = getId();
  const userToken = getToken();
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    }
  }, []);

  const handleChangeSelected = (event: any) => {
    setOcurrenceType(event.target.value);
  };

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
    const registeredAt = (dayjs(date + time).format('YYYY-MM-DDTHH:mm:ss'));
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
      <Menu withButton onClick={handleLogout} title={'Logout'} />
      <Card title={'Registrar Ocorrência'}>
        <form onSubmit={handleSubmit}>
          <S.RegisteredAt>
            <Input label='Que dia a ocorrência aconteceu?' type='date' placeholder='YYYY-MM-DD' value={date} onChange={(e: any) => setDate(e.target.value)} />
            <Input label='Que horas a ocorrência aconteceu?' type='time' placeholder='HH:mm:ss' value={time} onChange={(e: any) => setTime(e.target.value)} />
          </S.RegisteredAt>
          <Input label='Onde a ocorrência aconteceu?' type='text' placeholder='Digite o local' value={ocurrenceLocal} onChange={(e: any) => setOcurrenceLocal(e.target.value)} />
          <S.Select>
            <p>Qual o tipo de ocorrência?</p>
            <select value={ocurrunceType} onChange={handleChangeSelected} id="">
              <option>Escolha uma opção</option>
              {OccurencesTypes.map((item, index) => {
                return (
                  <option key={index} value={item.id}>{item.name}</option>
                )
              })}
            </select>
          </S.Select>
          <Input label='Em qual KM aconteceu a ocorrência?' type='number' placeholder='Ex: KM 0 - KM 9999' value={ocurrenceKm} onChange={(e: any) => setOcurrenceKm(e.target.value)} />
          <Button type='submit'>
            Registrar Ocorrência
          </Button>
        </form>
      </Card>
    </>
  )
}