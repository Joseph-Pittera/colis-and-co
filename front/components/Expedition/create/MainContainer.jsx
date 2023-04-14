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
import { reset } from 'nodemon';
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
      const volume = data.length * data.width * data.height;
      data = { ...data, ...values, volume };
      console.log(data);
      const bodyRequest = JSON.stringify(data);
      console.log('bodyRequest', bodyRequest);
      const response = await fetch(`http://localhost:3000/api/deliveries`, {
        // const response = await fetch(`http://julienpayet974-server.eddi.cloud:8080/api/users/register`, {
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
      reset();
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

// import { useState, useContext, useEffect } from "react";
// import { useRouter } from "next/router";
// import { AuthContext } from "@/utils/context/auth";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { schema } from "./yupSchema";

// import { Typography, Button, Alert, TextField } from "@mui/material";

// import { ExpeditionForm } from "@/components/Expedition/create/ExpeditionForm";
// import { ObjectInfosBox } from "@/components/Expedition/create/ObjectInfosBox";
// import { SizeInfosBox } from "@/components/Expedition/create/SizeInfosBox";
// import { PlaceInfosBox } from "@/components/Expedition/create/PlaceInfosBox";
// import { PriceBox } from "@/components/Expedition/create/PriceBox";
// import { Map } from "@/components/Expedition/create/Map";

// export const MainContainer = () => {
//   const center = { lat: 46.227638, lng: 2.213749 };
//   const zoom = 5.5;
//   const router = useRouter();
//   const { isLoggedIn } = useContext(AuthContext);
//   const [error, setError] = useState({});
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   // hangle Input changes
//   const [values, setValues] = useState({
//     test: "",
//     type_of_marchandise: "",
//     quantity: "",
//     weight: "",
//     length: "",
//     width: "",
//     height: "",
//     departure_address: "",
//     zipcode: "",
//     city: "",
//     arrival_address: "",
//     arrival_zipcode: "",
//     arrival_city: "",
//     price: "",
//   });
//   const handleChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   // handle form submit with Data Validation
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [loginError, setLoginError] = useState(false);
//   const onSubmit = (data) => console.log(data);

//   const handleForm = async (data) => {
//     console.log("test");
//     // e.preventDefault();
//     if (!isLoggedIn) {
//       setLoginError(true);
//       return;
//     } else setLoginError(false);
//     try {
//       //*********************************** PROD *******************************/
//       const bodyRequest = JSON.stringify(data);
//       console.log("bodyRequest", bodyRequest);
//       // const bodyRequest = JSON.stringify({
//       //   type_of_marchandise: values.type_of_marchandise,
//       //   quantity: values.quantity,
//       //   weight: values.weight,
//       //   volume: values.length * values.width * values.height,
//       //   length: values.length,
//       //   width: values.width,
//       //   height: values.height,
//       //   departure_address: values.departure_address,
//       //   zipcode: values.zipcode,
//       //   city: values.city,
//       //   arrival_address: values.arrival_address,
//       //   arrival_zipcode: values.arrival_zipcode,
//       //   arrival_city: values.arrival_city,
//       //   departure_date: values.departure_date,
//       //   arrival_date: values.arrival_date,
//       //   price: values.price,
//       // });
//       const response = await fetch(`http://localhost:3000/api/deliveries`, {
//         // const response = await fetch(`http://julienpayet974-server.eddi.cloud:8080/api/users/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: bodyRequest,
//       });
//       if (!response.ok) {
//         const respData = await response.json();
//         console.log("respData", respData.message);
//         setServerDataErrors({
//           status: response.status,
//           message: respData.message,
//         });
//         console.log("ServerDataErrors", serverDataErrors);
//         return;
//       }
//       const respData = await response.json(); // extraire les données JSON de la réponse
//       setIsSubmitted(true);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <Typography component="h1" m={4} fontSize={32} textAlign="center">
//         Formulaire d'expédition
//       </Typography>
//       <ExpeditionForm onSubmit={handleSubmit(onSubmit)}>
//         {/* <ObjectInfosBox control={control} errors={errors} />
//         <SizeInfosBox control={control} errors={errors} />
//         <PlaceInfosBox
//           control={control}
//           errors={errors}
//           values={values}
//           setValues={setValues}
//         /> */}
//         <PriceBox control={control} errors={errors} />
//         {/* <Map center={center} zoom={zoom} /> */}
//         {loginError && (
//           <Alert severity="error">
//             Vous devez être connecté pour proposer une course
//           </Alert>
//         )}
//         <Button
//           // href={variant === "register" ? "/registration" : "/"}
//           type="submit"
//           variant="contained"
//           sx={{ mt: 3, mx: "auto", maxWidth: 250, textAlign: "center" }}
//         >
//           Publier la course
//         </Button>
//       </ExpeditionForm>
//       {isSubmitted && (
//         <Alert severity="success">Votre course a bien été enregistrée !</Alert>
//       )}
//     </>
//   );
// };
