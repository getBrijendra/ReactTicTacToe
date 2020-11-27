import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//class Square extends React.Component {
function Square(props) {  //function components
  //render() {
    return (
      <button 
        className="square" 
        onClick = {() => /*this.*/props.onClick()}
      >
        {/*this.*/props.value}
      </button>
    );
  //}
}

class Board extends React.Component {
  /*
  constructor(props) {
    super(props);
    this.state = {
      squares : Array(9).fill(null), //Make Square a Controlled Components as its state maintained in Board
      xIsNext : true,

    };
  }
  */

  renderSquare(i) {
    return <Square 
            value = {this.props.squares[i]}
            onClick = {() => this.props.onClick(i)}  
          />;
  }

  /*
  handleClick(i) {
    if(this.state.squares[i] != null || CalculateWinner(this.state.squares))
      return;
    const newsquare = this.state.squares.slice();     
    //*
      For immutability of the state 
      Advantages: 
        Complex features become simple.
        Detecting changes.
        Determining when to re-render in React.
    /
    newsquare[i] = this.state.xIsNext ? 'X' : 'O';    
    this.setState({squares : newsquare, xIsNext : !this.state.xIsNext});
  }
  */

  render() {
    /*
    let winner = CalculateWinner(this.state.squares);
    let status;
    if(winner === null)
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    else
      status = 'Winner is : ' + winner;
    */
    return (
      <div>
         <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history : [{
        squares: Array(9).fill(null)
      }],
      xIsNext : true,
    }
  }

  handleClick(i) {
    let history = this.state.history;
    let currSquares = history[history.length -1]; 
    if(currSquares.squares[i] != null || CalculateWinner(currSquares.squares))
    return;
    const newsquare = currSquares.squares.slice();     
    /*
      For immutability of the state 
      Advantages: 
        Complex features become simple.
        Detecting changes.
        Determining when to re-render in React.
    */
    newsquare[i] = this.state.xIsNext ? 'X' : 'O';    
    history.push({squares : newsquare});
    this.setState({history : history, xIsNext : !this.state.xIsNext});
  }


  render() {
    let history = this.state.history;
    let currSquares = history[history.length -1];

    let winner = CalculateWinner(currSquares.squares);
    let status;
    if(winner === null)
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    else
      status = 'Winner is : ' + winner;

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {currSquares.squares} 
            //status = {status}
            onClick = { (i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function CalculateWinner(squares) {
  const Arr = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
  ];

  for(let i = 0; i < Arr.length; i++)
  {
    let [a, b, c] = Arr[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
