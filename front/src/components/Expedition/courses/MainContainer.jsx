import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFetch } from '@/utils/hooks';

import { TextField, Typography, Box } from '@mui/material';
import { Button } from '@mui/material';
import { CircularProgress } from '@mui/material';

import { ListSubBox } from './ListSubBox';
import { SearchForm } from './SearchForm';

export const MainContainer = () => {
  const router = useRouter();

  // manage fetch list of courses
  const { data, isLoading, error } = useFetch(
    `http://localhost:3000/api/deliveries`
  );
  console.log(data);
  if (error) {
    router.push('/404');
  }

  // hangle Input changes
  const [searchInputValue, setSearchInputValue] = useState(null);
  const handleChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  return (
    <>
      <Typography component="h1" mt={3} fontSize={24} textAlign="center">
        Liste des courses disponibles
      </Typography>
      <SearchForm>
        <TextField
          name="SearchInput"
          type="text"
          onChange={handleChange}
          size="small"
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ my: 1.5, maxWidth: 150, textAlign: 'center' }}
          size="small"
        >
          Recherche
        </Button>
      </SearchForm>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          {Array.isArray(data) &&
            data?.map((delivery) => {
              return (
                <Link
                  key={delivery.id}
                  href={'/expedition/courses/' + delivery.id}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <ListSubBox>
                    <Typography
                      display="flex"
                      alignItems="center"
                      ml={{ xs: 2, md: 0 }}
                      mr={2}
                      width={100}
                    >
                      {delivery.type_of_marchandise}
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="column"
                      mx={2}
                      width={{ xs: 260, md: 300 }}
                    >
                      <Typography fontSize={{ xs: 14, md: 16 }}>
                        Format :{' '}
                        {`${delivery.length}cmx${delivery.width}cmx${delivery.height}cm`}
                      </Typography>
                      <Typography fontSize={{ xs: 14, md: 16 }}>
                        Départ à {delivery.city}, arrivée à{' '}
                        {delivery.arrival_adddress}
                      </Typography>
                      <Typography fontSize={{ xs: 14, md: 16 }}>
                        Date de départ : {delivery.departure_date}
                      </Typography>
                    </Box>
                    <Typography
                      display="flex"
                      alignItems="center"
                      ml={2}
                      width={{ xs: '150px', sm: '100px' }}
                    >
                      Prix : {delivery.price}€
                    </Typography>
                  </ListSubBox>
                </Link>
              );
            })}
        </Box>
      )}
    </>
  );
};
