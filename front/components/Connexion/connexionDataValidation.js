export const connexionDataValidation = (values) => {
  console.log("values", values);
  let error = {};
  const email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // const email_pattern = /^[^\s@]@[^\s@]+\.[^\s@]+$/;
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  if (values.email === "") {
    error.email = "Veuillez renseigner votre nom";
  }
  if (!email_pattern.test(values.email)) {
    error.email = "Veuillez renseigner un email valide";
  }
  if (values.password === "") {
    error.password = "Veuillez renseigner votre mot de passe";
  }
  if (!password_pattern.test(values.password)) {
    error.password2 =
      "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial";
  }
  if (values.password !== values.passwordConfirm) {
    error.passwordConfirm = "Les mots de passe ne correspondent pas";
  }
  if (values.passwordConfirm === "") {
    error.passwordConfirm = "Veuillez confirmer votre mot de passe";
  }

  return error;
};
