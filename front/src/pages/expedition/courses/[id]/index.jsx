import { Layout } from '@/components/Layout';
import { MainContainer } from '../../../../components/Expedition/courses/MainContainer';
import { useRouter } from 'next/router';
import { useFetch } from '@/utils/hooks';

import { CircularProgress, Typography, Stack, Box } from '@mui/material';
import { OutlinedCard } from '../../../../components/CustomsMuiComp/OutlinedCard';

export default function CourseDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, error } = useFetch(
    `http://localhost:3000/api/deliveries/${id}`
  );

  if (error) {
    router.push('/404');
  }
  return (
    <Layout>
      <Typography component="h1" my={3} fontSize={24} textAlign="center">
        Détails de la course
      </Typography>
      {isLoading ? <CircularProgress /> : <OutlinedCard data={data} />}
    </Layout>
  );
}
