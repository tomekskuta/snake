import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeadText = styled.h1`
  text-align: center;
`;

const SubText = styled.h3`
  text-align: center;
`;

const ModalWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  padding: 50px;
  border: black 5px solid;
  background: #fff;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled.button`
  border: solid 5px black;
  padding: 15px;
  margin: 19px 40px 0;;
  font-size: 1em;
  position: relative;
  background: rgba(0, 0, 0, 0);
  outline: none;

  :hover {
    background: rgba(0, 0, 0, 0.1)
  }

  :active {
    transform: translate(0, 1px);
  }
`;

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      bestScore: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.score >= this.state.bestScore) {
      this.setState({ bestScore: nextProps.score })
    }
  }

  render() {
    const { score, onClick, isCrashed } = this.props;
    const { bestScore } = this.state;

    return (
    <ScoreContainer>
      <SubText>{`SCORE: ${score}`}</SubText>
      <HeadText>SNAKE</HeadText>
      <SubText>{`BEST SCORE: ${bestScore}`}</SubText>
      {isCrashed 
        ? <ModalWrapper>
            <Modal>
              <HeadText>Ouch!</HeadText>
              <SubText>{`Your score: ${score}`}</SubText>
              {score === bestScore ? <SubText>YOU ARE THE BEST!</SubText> : null}
              <Button onClick={onClick} >play again</Button>
            </Modal>
          </ModalWrapper>
        : null
      }
    </ScoreContainer>
    )
  }
}

Header.propTypes = {
  score: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isCrashed: PropTypes.bool.isRequired,
}
