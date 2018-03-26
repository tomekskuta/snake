import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Field = styled.div`
  border: solid 5px black;
  width: 1000px;
  height: 600px;
  background: #9ccb95;
  position: relative;
`;

const Module = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 7px;
  background: #00bbff;
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: 2;
`;

const Food = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  background: #c02034;
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: 1;
`;

const Game = ({ snakeLength, foodPosition, isCrashed }) => (
  <Field>
    {isCrashed ? null : snakeLength.map((element, index) => <Module x={element.x} y={element.y} key={index} />)}
    <Food x={foodPosition.x} y={foodPosition.y} /> 
  </Field>
);

Game.propTypes = {
  snakeLength: PropTypes.array.isRequired,
  foodPosition: PropTypes.object.isRequired,
  isCrashed: PropTypes.bool.isRequired,
}

export default Game;