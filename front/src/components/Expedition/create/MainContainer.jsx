import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '@/utils/context/auth';

import { Typography, Alert, Button } from '@mui/material';

import { ExpeditionForm } from '@/components/Expedition/create/ExpeditionForm';
import { ObjectInfosBox } from '@/components/Expedition/create/ObjectInfosBox';
import { SizeInfosBox } from '@/components/Expedition/create/SizeInfosBox';
import { PlaceInfosBox } from '@/components/Expedition/create/PlaceInfosBox';
import { PriceBox } from './PriceBox';
import { schema } from './yupSchema';
// import { Map } from "@/components/Expedition/create/Map";

export function MainContainer() {
  //   const center = { lat: 46.227638, lng: 2.213749 };
  //   const zoom = 5.5;
  const { isLoggedIn } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [values, setValues] = useState({
    departure_address: '',
    zipcode: '',
    city: '',
    arrival_address: '',
    arrival_zipcode: '',
    arrival_city: '',
  });

  // handle form submit with Data Validation
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleForm = async (data) => {
    if (!isLoggedIn) {
      setLoginError(true);
      return;
    } else setLoginError(false);
    try {
      // insert the data in values object into data object
      data = { ...data, ...values };
      console.log(data);
      const bodyRequest = JSON.stringify(data);
      console.log('bodyRequest', bodyRequest);
      //   const response = await fetch(
      // `https://projet-colis-and-co-production.up.railway.app/api/deliveries`,
      // {
      const response = await fetch(`http://localhost:3000/api/deliveries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyRequest,
      });
      if (!response.ok) {
        const respData = await response.json();
        console.log('respData', respData.message);
        setServerDataErrors({
          status: response.status,
          message: respData.message,
        });
        console.log('ServerDataErrors', serverDataErrors);
        return;
      }
      // extraire les données JSON de la réponse : utile si on
      // les comparer à la validation du prochain formulaire
      // pour éviter les redondances
      // const respData = await response.json();
      setIsSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography component="h1" m={4} fontSize={32} textAlign="center">
        Formulaire d'expédition
      </Typography>
      <ExpeditionForm onSubmit={handleSubmit(handleForm)}>
        <ObjectInfosBox control={control} errors={errors} />
        <SizeInfosBox control={control} errors={errors} />
        <PlaceInfosBox
          control={control}
          errors={errors}
          values={values}
          setValues={setValues}
        />
        <PriceBox control={control} errors={errors} />
        {/* <Map center={center} zoom={zoom} /> */}
        {loginError && (
          <Alert severity="error">
            Vous devez être connecté pour proposer une course
          </Alert>
        )}
        <Button
          // href={variant === "register" ? "/registration" : "/"}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mx: 'auto', maxWidth: 250, textAlign: 'center' }}
        >
          Publier la course
        </Button>
      </ExpeditionForm>
      {isSubmitted && (
        <Alert severity="success">Votre course a bien été enregistrée !</Alert>
      )}
    </>
  );
}
