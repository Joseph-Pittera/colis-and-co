import { useContext, useState } from 'react';
import { AuthContext } from '@/utils/context/auth';

import { Card, CardActions, CardContent, Button } from '@mui/material';
import { Typography, Box, Stack, Alert } from '@mui/material';

const InsideCard = ({ courseData }) => {
  const { userData } = useContext(AuthContext);
  const [courseDeleted, setCourseDeleted] = useState(false);
  console.log('courseData', courseData);
  const deleteCourse = async () => {
    try {
      const response = await fetch(
        // `https://projet-colis-and-co-production.up.railway.app/api/deliveries/${courseData.id}`,
        `http://localhost:3000/api/deliveries/${courseData.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.user.token}`,
          },
        }
      );

      if (response.status === 204) {
        setCourseDeleted(true);
      }
    } catch (error) {
      console.log('error', error);
      return;
    }
  };

  return (
    <>
      {!courseDeleted && (
        <CardContent>
          <Stack direction="row" spacing={12} mt={1} fontSize={24}>
            <Stack>
              <Box my={3}>
                <Typography componant="h3" fontWeight="bold" my={1}>
                  Description de l'objet :
                </Typography>
                <Typography componant="p">
                  {courseData.type_of_marchandise}
                </Typography>
              </Box>
              <Box>
                <Typography componant="h3" fontWeight="bold">
                  Dimensions en cm :
                </Typography>
                <Typography componant="p">
                  Longueur : {courseData.length}cm
                </Typography>
                <Typography componant="p">
                  Largeur : {courseData.width}cm
                </Typography>
                <Typography componant="p">
                  Hauteur : {courseData.height}cm
                </Typography>
              </Box>
            </Stack>
            <Stack>
              <Box>
                <Box my={3}>
                  <Typography componant="h3" fontWeight="bold">
                    Adresse de départ :
                  </Typography>
                  <Typography componant="p">
                    {courseData.departure_address}
                  </Typography>
                </Box>
                <Box my={3}>
                  <Typography componant="h3" fontWeight="bold">
                    Adresse d'arrivée :
                  </Typography>
                  <Typography componant="p">
                    {courseData.arrival_address}
                  </Typography>
                </Box>
                <Box my={3}>
                  <Typography componant="h3" fontWeight="bold">
                    Date de livraison :
                  </Typography>
                  <Typography componant="p">
                    {courseData.departure_date}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Stack>
          <Box textAlign="center" mt={4}>
            <Typography componant="h3" fontWeight="bold">
              Prix proposé :
            </Typography>
            <Typography componant="p">{courseData.price}€</Typography>
          </Box>
        </CardContent>
      )}
      {!courseDeleted && userData.id === courseData.creator_id && (
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" size="small" onClick={deleteCourse}>
            Supprimer la course
          </Button>
        </CardActions>
      )}
      {!courseDeleted && userData.id !== courseData.creator_id && (
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" size="small">
            Accepter la course
          </Button>
        </CardActions>
      )}
      {courseDeleted && (
        <Alert severity="success">Cette course a bien été supprimée !</Alert>
      )}
    </>
  );
};

export function OutlinedCard({ data }) {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Box sx={{ minWidth: 275 }}>
      {isLoggedIn && (
        <Card variant="outlined">
          <InsideCard courseData={data} />
        </Card>
      )}
    </Box>
  );
}
