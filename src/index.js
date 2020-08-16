import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

const drumKeys = [
  {
    id: "heater-1",
    key: 81,
    letter: "Q",
    valueA: "Heater 1",
    valueB: "Chord 1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    srcAlt: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    id: "heater-2",
    key: 87,
    letter: "W",
    valueA: "Heater 2",
    valueB: "Chord 2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    srcAlt: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    id: "heater-3",
    key: 69,
    letter: "E",
    valueA: "Heater 3",
    valueB: "Chord 3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    srcAlt: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    id: "heater-4",
    key: 65,
    letter: "A",
    valueA: "Heater 4",
    valueB: "Shaker",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    srcAlt: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    id: "clap",
    key: 83,
    letter: "S",
    valueA: "Clap",
    valueB: "Open HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    srcAlt: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    id: "open-hh",
    key: 68,
    letter: "D",
    valueA: "Open HH",
    valueB: "Closed HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    srcAlt: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    id: "kick-n-hat",
    key: 90,
    letter: "Z",
    valueA: "Kick n' Hat",
    valueB: "Punchy Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    srcAlt: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    id: "kick",
    key: 88,
    letter: "X",
    valueA: "Kick",
    valueB: "Side Stick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    srcAlt: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    id: "closed-hh",
    key: 67,
    letter: "C",
    valueA: "Closed HH",
    valueB: "Snare",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    srcAlt: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

function Buttons(props) {
  return (
    <button id={props.id} className="drum-pad" onClick={props.handleClick}>
      {props.letter}
      <audio
        id={props.letter}
        className="clip"
        src={!props.bankToggle ? props.src : props.srcAlt}
      />
    </button>
  );
}

function Display(props) {
  return <div className="display">{props.display}</div>;
}

function Bank(props) {
  return (
    <div className="bank-container">
      <label className="bank-label" for="sound-bank">
        Sound Bank
      </label>
      <label className="bank">
        <input
          id="sound-bank"
          type="checkbox"
          onClick={props.handleBankToggle}
        />
        <span className="bank-toggle"></span>
      </label>
    </div>
  );
}

function Mute(props) {
  return (
    <div className="mute-container">
      <button className="mute" onClick={props.handleAudioToggle}>
        {props.audioToggle ? (
          <i class="fas fa-volume-up"></i>
        ) : (
          <i class="fas fa-volume-mute"></i>
        )}
      </button>
    </div>
  );
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bankToggle: false,
      display: "",
      audioToggle: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBankToggle = this.handleBankToggle.bind(this);
    this.handleAudioToggle = this.handleAudioToggle.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    drumKeys.map((obj) => {
      if (obj.id === e.target.id) {
        this.setState({
          display: !this.state.bankToggle ? obj.valueA : obj.valueB
        });
        this.state.audioToggle
          ? e.target.children[0].play()
          : e.target.children[0].pause();
      }
    });
  }

  handleKeyDown(e) {
    e.preventDefault();

    drumKeys.map((obj) => {
      if (e.keyCode === obj.key) {
        this.setState({
          display: !this.state.bankToggle ? obj.valueA : obj.valueB
        });
        document.getElementById(obj.id).classList.add("active");
        this.state.audioToggle
          ? document.getElementById(obj.id).children[0].play()
          : document.getElementById(obj.id).children[0].pause();
      } else if (e.keyCode === 32) {
        const soundBank = document.getElementById("sound-bank");
        if (soundBank.checked === false) {
          soundBank.checked = true;
        } else {
          soundBank.checked = false;
        }
        this.setState(
          {
            bankToggle: !this.state.bankToggle
          },
          () =>
            this.setState({
              display: !this.state.bankToggle
                ? "Heater Kit"
                : "Smooth Piano Kit"
            })
        );
      }
    });
  }

  handleKeyUp(e) {
    e.preventDefault();

    drumKeys.map((obj) => {
      if (e.keyCode === obj.key) {
        document.getElementById(obj.id).classList.remove("active");
      }
    });
  }

  handleBankToggle() {
    this.setState(
      {
        bankToggle: !this.state.bankToggle
      },
      () =>
        this.setState({
          display: !this.state.bankToggle ? "Heater Kit" : "Smooth Piano Kit"
        })
    );
  }

  handleAudioToggle() {
    this.setState({ audioToggle: !this.state.audioToggle });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }
  componentDidUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  render() {
    const splitEvery = (array, length) =>
      array.reduce((result, item, index) => {
        if (index % length === 0) result.push([]);
        result[Math.floor(index / length)].push(item);
        return result;
      }, []);

    const btns = splitEvery(drumKeys, 3).map((split) => {
      return (
        <div className="drum-row">
          {split.map((i) => {
            return (
              <Buttons
                id={i.id}
                letter={i.letter}
                src={i.src}
                srcAlt={i.srcAlt}
                bankToggle={this.state.bankToggle}
                handleClick={this.handleClick}
              />
            );
          })}
        </div>
      );
    });

    return (
      <div className="drum-machine">
        <div className="drum-pad-container">{btns}</div>
        <div className="display-container">
          <Display display={this.state.display} />
          <div className="controls-container">
            <Bank
              handleBankToggle={this.handleBankToggle}
              bankToggle={this.state.bankToggle}
            />
            <Mute
              audioToggle={this.state.audioToggle}
              handleAudioToggle={this.handleAudioToggle}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<DrumMachine />, document.getElementById("root"));
