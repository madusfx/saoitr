import { useRouter } from 'next/router';
import * as S from './styles';

type OccurrenceCardProps = {
  data?: any;
};

const OccurrenceCard = ({ data }: OccurrenceCardProps) => {
  return (
    <S.Container >
      <S.Title>Ocorrência {data.id}</S.Title>
      <S.Infos>
        <S.TitleInfo>Quando aconteceu? {data.registered_at}</S.TitleInfo>
        <S.TitleInfo>Onde aconteceu? {data.local}</S.TitleInfo>
        <S.TitleInfo>O quê aconteceu? {data.occurrence_type}</S.TitleInfo>
        <S.TitleInfo>Em qual KM aconteceu? {data.km}</S.TitleInfo>
      </S.Infos>
    </S.Container>
  )
};

export { OccurrenceCard };