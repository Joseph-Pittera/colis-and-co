import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFetch } from "@/utils/hooks";

import { TextField, Typography, Box } from "@mui/material";
import { Button, List } from "@mui/material";
import { CircularProgress } from "@mui/material";

import { ListSubBox } from "./ListSubBox";
import { SearchForm } from "./SearchForm";

interface Delivery {
  id: number;
  type_of_marchandise: string;
  length: number;
  width: number;
  height: number;
  city: string;
  arrival_city: string;
  departure_date: string;
  price: number;
}

export const MainContainer: React.FC = () => {
  const router = useRouter();
  // manage fetch list of courses
  const { data, isLoading, error } = useFetch<Delivery>(
    `${process.env.NEXT_PUBLIC_BACK_URL}/api/deliveries`
  );
  if (error) {
    router.push("/500");
  }

  // hangle Input changes
  const [searchInputValue, setSearchInputValue] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Delivery[] | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  // handle search form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url =
      searchInputValue === null || searchInputValue === ""
        ? `${process.env.NEXT_PUBLIC_BACK_URL}/api/deliveries/`
        : `${process.env.NEXT_PUBLIC_BACK_URL}/api/deliveries/search?search=${searchInputValue}`;
    try {
      const response = await fetch(url);
      const courseList = await response.json();
      setSearchResults(courseList);
    } catch (error) {
      console.log(error);
    }
  };

  const courses = searchResults || data;

  return (
    <>
      <Typography component="h1" mt={3} fontSize={24} textAlign="center">
        Liste des courses disponibles
      </Typography>
      <SearchForm onSubmit={handleSubmit}>
        <TextField
          name="SearchInput"
          type="text"
          onChange={handleChange}
          size="small"
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ my: 1.5, maxWidth: 150, textAlign: "center" }}
          size="small"
        >
          Recherche
        </Button>
      </SearchForm>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <List>
          {Array.isArray(courses) &&
            courses?.map((delivery) => {
              return (
                <Link
                  key={delivery.id}
                  href={"/expedition/courses/" + delivery.id}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <ListSubBox>
                    <Typography
                      display="flex"
                      alignItems="center"
                      ml={{ xs: 2, md: 0 }}
                      mr={2}
                      width={150}
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
                        Format :{" "}
                        {`${delivery.length}cmx${delivery.width}cmx${delivery.height}cm`}
                      </Typography>
                      <Typography fontSize={{ xs: 14, md: 16 }}>
                        Départ à {delivery.city}, arrivée à{" "}
                        {delivery.arrival_city}
                      </Typography>
                      <Typography fontSize={{ xs: 14, md: 16 }}>
                        Date de départ : {delivery.departure_date}
                      </Typography>
                    </Box>
                    <Typography
                      display="flex"
                      alignItems="center"
                      ml={2}
                      width={{ xs: "150px", sm: "100px" }}
                    >
                      Prix : {delivery.price}€
                    </Typography>
                  </ListSubBox>
                </Link>
              );
            })}
        </List>
      )}
    </>
  );
};
