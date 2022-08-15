import React from "react";
import styled from "@emotion/styled";
import Proptypes from "prop-types";

const MensajeError = styled.p`
  background-color: #b7322c;
  padding: 1rem;
  color: #fff;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  font-family: "Bebas neue", cursive;
`;

const Error = ({ mensaje }) => {
  return <MensajeError>{mensaje}</MensajeError>;
};

Error.propTypes = {
  mensaje: Proptypes.string.isRequired,
};

export default Error;
