import React, { Component } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      poem: [],
      lastLine: '',
      numOfPlayers: 1,
      poemRevealed: false,
    };
  }

  render() {
    
    const addPoemLine = (line) => {
      const updatedState = { 
        poem: this.state.poem,
        numOfPlayers: this.state.numOfPlayers,
        lastLine: this.state.lastLine,
       };
      updatedState.poem.push(line);
      updatedState.numOfPlayers += 1;
      updatedState.lastLine = line;
      this.setState(updatedState);
    };

    const updatedPlayerNumber = () => {
      return this.state.numOfPlayers;
    }

    const updatedLastLine = () => {
      return this.state.lastLine;
    }

    const returnRecentSubmission = () => {
      if (this.state.poem.length > 0) {
        return (<RecentSubmission line={updatedLastLine()}/>)
      };
    }

    const changePoemRevealed = () => {
      this.setState({poemRevealed: true});
    }

    const exampleFormat = FIELDS.map((field) => {
      if (field.key) {
        return field.placeholder;
      } else {
        return field;
      }
    }).join(" ");

    return (
      <div className="Game">
        <h2>Game</h2>

        <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>

        <p>Please follow the following format for your poetry submission:</p>

        <p className="Game__format-example">
          { exampleFormat }
        </p>

        {this.state.poemRevealed ? ('') : 
        (returnRecentSubmission())
        }
        

        {this.state.poemRevealed ? ('') : 
        (<PlayerSubmissionForm onSubmitCallback={addPoemLine} numOfPlayers={updatedPlayerNumber} />)
        }
        
        
        <FinalPoem poem={this.state.poem} poemRevealedCallback={changePoemRevealed}/>

      </div>
    );
  }
}

const FIELDS = [
  "The",
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  "the",
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  ".",
];

export default Game;
