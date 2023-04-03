import React from "react";

export const Test = () => {
  const [userDatas, setUserDatas] = React.useState([]);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/login`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserDatas(data);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <>
      <form>
        <button onSubmit={handleForm}>Submit</button>
      </form>
      <div>{userDatas}</div>
    </>
  );
};
