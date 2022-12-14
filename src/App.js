import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import imagen from "./cryptomonedas.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &&::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  //Las dependencias son moneda y criptomoneda, de esa forma cuando uno de esos valores cambien y le dé submit
  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      //Evitamos la ejecución la primera vez
      if (moneda === "") return;

      //Consultar la api para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      //Mostrar el spinner
      guardarCargando(true);

      //Ocultar el spinner y mostrar el resultado
      setTimeout(() => {
        //Cambiar estado de cargando
        guardarCargando(false);
        //Los corchetes son una forma de acceder a objetos que no sabemos como se van a llamar.
        //En este caso, cada consulta a la api trae nombres distintos, que justamente son iguales a los nombres que manejabamos en nuestra app
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 1000);
    };

    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  //Mostrar Spinner o Resultado
  const componente = cargando ? (
    <Spinner />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen cripto" />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
