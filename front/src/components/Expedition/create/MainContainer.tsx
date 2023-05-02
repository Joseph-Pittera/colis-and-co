import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "@/utils/context/auth";

import { Typography, Alert, Button } from "@mui/material";

import { ExpeditionForm } from "@/components/Expedition/create/ExpeditionForm";
import { ObjectInfosBox } from "@/components/Expedition/create/ObjectInfosBox";
import { SizeInfosBox } from "@/components/Expedition/create/SizeInfosBox";
import { PlaceInfosBox } from "@/components/Expedition/create/PlaceInfosBox";
import { PriceBox } from "./PriceBox";
import { schema } from "./yupSchema";
import { formatDate } from "./formatDate";
// import { Map } from "@/components/Expedition/create/Map";

interface FormInputs {
  departure_address: string;
  zipcode: string;
  city: string;
  departure_date: Date | string;
  arrival_address: string;
  arrival_zipcode: string;
  arrival_city: string;
  arrival_date: Date | string;
  creator_id: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  price: number;
  volume: number;
}

interface AddressValues {
  departure_address: string;
  zipcode: string;
  city: string;
  arrival_address: string;
  arrival_zipcode: string;
  arrival_city: string;
}

interface ServerDataErrors {
  status: number;
  message: string;
}

export function MainContainer() {
  //   const center = { lat: 46.227638, lng: 2.213749 };
  //   const zoom = 5.5;
  const { isLoggedIn, userData } = useContext(AuthContext);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  const [values, setValues] = useState<AddressValues>({
    departure_address: "",
    zipcode: "",
    city: "",
    arrival_address: "",
    arrival_zipcode: "",
    arrival_city: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [serverDataErrors, setServerDataErrors] =
    useState<ServerDataErrors | null>(null);

  const handleForm: SubmitHandler<FormInputs> = async (data) => {
    if (!isLoggedIn) {
      setLoginError(true);
      return;
    } else setLoginError(false);
    try {
      const volume = data.length * data.width * data.height;
      data.departure_date = formatDate(data.departure_date);
      data.arrival_date = formatDate(data.arrival_date);
      data = { ...data, ...values, volume, creator_id: userData?.user?.id };
      // console.log("data3", data);
      const bodyRequest = JSON.stringify(data);
      // console.log("bodyRequest", bodyRequest);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/deliveries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userData?.user?.token,
          },

          body: bodyRequest,
        }
      );
      if (!response.ok) {
        const respData = await response.json();
        setServerDataErrors({
          status: response.status,
          message: respData.message,
        });
        return;
      }
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
          type="submit"
          variant="contained"
          sx={{ mt: 3, mx: "auto", maxWidth: 250, textAlign: "center" }}
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
