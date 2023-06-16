import { useRouter } from 'next/router';
import * as S from './styles';

type OccurrenceCardProps = {
  data?: any;
};

const OccurrenceCard = ({ data }: OccurrenceCardProps) => {
  const date = new Date(data.registered_at).toLocaleDateString('pt-br');
  const time = new Date(data.registered_at).toLocaleTimeString('pt-br');

  return (
    <S.Container >
      <S.Title>Ocorrência {data.id}</S.Title>
      <S.Infos>
        <S.TitleInfo>Quando aconteceu? {date} {time}</S.TitleInfo>
        <S.TitleInfo>Onde aconteceu? {data.local}</S.TitleInfo>
        <S.TitleInfo>O quê aconteceu? {data.occurrence_type}</S.TitleInfo>
        <S.TitleInfo>Em qual KM aconteceu? {data.km}</S.TitleInfo>
      </S.Infos>
    </S.Container>
  )
};

export { OccurrenceCard };