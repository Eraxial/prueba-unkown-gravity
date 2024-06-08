import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

//Componente que hará la conexión para verificar al usuario y mostrará un mensaje de validación al usuario en caso de ser verificado
export const RegisterSuccess = () => {
  const { token } = useParams();

  useEffect(() => {
    axios
      .put("http://localhost:3000/users/verify", { token: token })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }, []);

  return <div>RegisterSuccess</div>;
};
