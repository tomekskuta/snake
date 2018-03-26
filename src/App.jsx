import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import Game from './components/Game';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      snakeLength: [
        { x: 500, y: 300 },
        { x: 450, y: 300 },
        { x: 400, y: 300 },
      ],
      direction: { x: 50, y: 0 },
      foodPosition: {
        x: this.setFoodPosition(1000),
        y: this.setFoodPosition(600),
      },
      score: 0,
      isCrashed: false,
    }

    this.setFoodPosition = this.setFoodPosition.bind(this);
    this.eat = this.eat.bind(this);
    this.crash = this.crash.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  moveSnake = () => {
    const { snakeLength, direction, score } = this.state;
    const firstElement = {
      x: snakeLength[0].x + direction.x,
      y: snakeLength[0].y + direction.y,
    };

    return this.setState({
      snakeLength: snakeLength.reduce((prev, cur, index, array) => {
        if (prev.length < score + 3) {
          prev = [...prev, cur];
        }
        return prev;
      }, [firstElement])
    });
  }

  setDirection = (x, y) => {
    const { direction } = this.state;
    if (x === direction.x || y === direction.y) {
      return undefined;
    }
    this.setState({
      direction: {
        x: x,
        y: y,
      }
    })
  }
  
  controlSnake = event => {
    switch (event.key) {
      case 'ArrowUp':
        this.setDirection(0, -50);
        break;
      case 'ArrowRight':
        this.setDirection(50, 0);
        break;
      case 'ArrowDown':
        this.setDirection(0, 50);
        break;
      case 'ArrowLeft':
        this.setDirection(-50, 0);
        break;
      default:
        return;
    }
  }

  setFoodPosition(fieldLength) {
    return Math.floor(Math.random() * (fieldLength / 50)) * 50;
  }

  eat() {
    const { snakeLength, score, foodPosition } = this.state;

    if (foodPosition.x === snakeLength[0].x && foodPosition.y === snakeLength[0].y) {
      this.setState({
        foodPosition: {
          x: this.setFoodPosition(1000),
          y: this.setFoodPosition(600),
        },
        score: score + 1,
        snakeLength: [...snakeLength, snakeLength[snakeLength.length - 1]],
      })
    }
  }

  crash() {
    const { snakeLength } = this.state;
    const selfCrashArray = snakeLength.filter(element => element.x === snakeLength[0].x && element.y === snakeLength[0].y);
    const eatItself = selfCrashArray.length > 1;
    const isOutOfFrame = snakeLength[0].x < 0 || snakeLength[0].x >= 1000 || snakeLength[0].y < 0 || snakeLength[0].y >= 600;
    if ((eatItself || isOutOfFrame) && this.state.isCrashed === false) {
      this.setState({ isCrashed: true })
    }
  }
  
  componentDidMount() {
    setInterval(this.moveSnake.bind(this), 300);
    window.addEventListener('keydown', this.controlSnake.bind(this));
  }
  
  componentDidUpdate() {
    this.eat();
    this.crash();
  }

  playAgain() {
    this.setState({
      snakeLength: [
        { x: 500, y: 300 },
        { x: 450, y: 300 },
        { x: 400, y: 300 },
      ],
      direction: { x: 50, y: 0 },
      foodPosition: {
        x: this.setFoodPosition(1000),
        y: this.setFoodPosition(600),
      },
      score: 0,
      isCrashed: false,
    })
  }

  render() {
    const { snakeLength, foodPosition, score, isCrashed } = this.state;

    return (
      <Container>
        <Header score={score} onClick={this.playAgain} isCrashed={isCrashed} />
        <Game snakeLength={snakeLength} foodPosition={foodPosition} isCrashed={isCrashed} />
      </Container>
    );
  }
}
