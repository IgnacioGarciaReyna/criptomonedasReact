import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import Error from "./Error";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &&:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
  //State del listado de criptomonedas
  const [listacripto, guardarCriptomonedas] = useState([]);
  const [error, guardarError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  //utilizar useMoneda
  const [moneda, SelectMonedas] = useMoneda("Elige tu moneda", "", MONEDAS);

  //Utilizar useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elige tu criptomoneda",
    "",
    listacripto
  );

  //Ejecutar llamado a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      //No es necesario usar el .then. Axios lo simplifica
      const resultado = await axios.get(url);
      guardarCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  //Cuando el usuario hace submit
  const cotizarMoneda = (e) => {
    e.preventDefault();

    //Validar si ambos campos están llenos
    if (moneda === "" || criptomoneda === "") {
      guardarError(true);
      return;
    }

    //Pasar los datos al componente principal
    guardarError(false);

    //Guardar valores que vienen del customHook para pasarlo al app.js
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

Formulario.propTypes = {
  guardarMoneda: PropTypes.func.isRequired,
  guardarCriptomoneda: PropTypes.func.isRequired,
};

export default Formulario;
