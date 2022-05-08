'use strict';
const e = React.createElement;

class LetterButton extends React.Component {
  constructor(props) {
    super(props);
    this.buttonClasses = {false: 'btn btn-outline-primary', true: 'btn btn-primary'};
    this.state = this.props.chosen;
    this.switchState = this.switchState.bind(this);
  }

  switchState() {
    this.setState(prevState => ({
      chosen: !prevState.chosen
    }), function() {this.props.onLetterSwitch(this.props.letter, this.state.chosen)});
  }

  render() {
    return (
      <div className="col-1 p-1">
        <button type="button" className={this.buttonClasses[this.state.chosen]} onClick={this.switchState}>{this.props.letter} ({this.props.translit})</button>
      </div>
    )
  }
}

class LettersControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.letters;
    this.handleLetterSwitch = this.handleLetterSwitch.bind(this);
  }

  handleLetterSwitch(letter, chosen) {
    function switchState(state) {
      state[letter].chosen = chosen;
      return state;
    }
    this.setState(switchState, function() {this.props.onLetterSwitch(this.state)});
  }

  render() {
    return (
      Object.keys(this.state).map(letter => <LetterButton key={letter} letter={letter} translit={this.state[letter].translit} chosen={this.state[letter]} onLetterSwitch={this.handleLetterSwitch}/>)
    )
  }
}

class TextControl extends React.Component {
  constructor(props) {
    super(props);
    this.text = 'ამ დეკლარაცით გამოცხადებული ყველა უფლება და ყველა თავისუფლება მინიჭებული უნდა ჰქონდეს ყოველ ადამიანს განურჩევლად რაიმე განსხვავების, სახელდობრ, რასის, კანის ფერის, სქესის, ენის, რელიგიის, პოლიტიკური თუ სხვა რწმენის, ეროვნული თუ სოციალური წარმომავლობის, ქონებრივი, წოდებრივი თუ სხვა მდგომარეობისა. გარდა ამისა, დაუშვებელია რაიმე განსხვავება იმ ქვეყნის თუ ტერიტორიის პოლიტიკური, სამართლებრივი ან საერთაშორისო სტატუსის საფუძველზე, რომელსაც ადამიანი ეკუთვნის, მიუხედავად იმისა, თუ როგორია ეს ტერიტორია - დამოუკიდებელი, სამეურვეო, არათვითმმართველი თუ სხვაგვარად შეზღუდული თავის სევერენიტეტში.';
    this.state = props.letters;
  }

  render() {
    function translit(text, translitRules, state) {
      var lettersToTranslit = Object.keys(state).filter(letter => !state[letter].chosen);
      for (var letter of lettersToTranslit) {
        text = text.replaceAll(letter, translitRules[letter]);
      }
      return text;
    }

    return (
      <span>{translit(this.text, this.props.translitRules, this.state)}</span>
    )
  }
}

class MainControl extends React.Component {
  constructor(props) {
    super(props);
    this.translitRules = {
        'ა': 'a',
        'ბ': 'b',
        'გ': 'g',
        'დ': 'd',
        'ე': 'e',
        'ვ': 'v',
        'ზ': 'z',
        'თ': 't',
        'ი': 'i',
        'კ': 'k\'',
        'ლ': 'l',
        'მ': 'm',
        'ნ': 'n',
        'ო': 'o',
        'პ': 'p\'',
        'ჟ': 'zh',
        'რ': 'r',
        'ს': 's',
        'ტ': 't\'',
        'უ': 'u',
        'ფ': 'p',
        'ქ': 'k',
        'ღ': 'gh',
        'ყ': 'q',
        'შ': 'sh',
        'ჩ': 'ch',
        'ც': 'ts',
        'ძ': 'dz',
        'წ': 'ts\'',
        'ჭ': 'ch\'',
        'ხ': 'kh',
        'ჯ': 'j',
        'ჰ': 'h'
      };
    this.letters = Object.keys(this.translitRules);
    this.state = Object.assign({}, ...this.letters.map((letter) => ({[letter]: {'chosen': false, 'translit':this.translitRules[letter]}})));
    this.handleLetterSwitch = this.handleLetterSwitch.bind(this);
  }

  handleLetterSwitch(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className="container m-5">
        <div className="row m-1">
          <LettersControl letters={this.state} onLetterSwitch={this.handleLetterSwitch} />
        </div>
        <div className="row">
          <TextControl letters={this.state} translitRules={this.translitRules} />
        </div>
      </div>
    )
  }
}
const domContainer = document.querySelector('#main_container');
const root = ReactDOM.createRoot(domContainer);
root.render(e(MainControl));