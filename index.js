import React, {Component, Fragment, createContext} from "react";
const {Provider, Consumer} = createContext();

const dict = {
  yes: {
    Russian: 'Да',
    English: 'Yes'
  },
  no: {
    Russian: 'Нет',
    English: 'No'
  }
}


const withLocalization = (WrappedComponent) => {
  return class extends Component {
    render() {
      return (
        <Consumer>
          {context => <WrappedComponent {...this.props} translate={(hash) => hash[context]} />}
        </Consumer>
      )  
    }
  }
}


class LangProvider extends Component {
  render() {
    return (
      <Provider value={this.props.language}>
        {...this.props.children}
      </Provider>
    );
  }
}

const ButtonToolbar = ({translate}) => {
  return (
    <Fragment>
      <Button>
        {translate(dict.yes)}
      </Button>
      <Button>
        {translate(dict.no)}
      </Button>
    </Fragment>
  )
  
}

const LocalizedButtonToolbar = withLocalization(ButtonToolbar);

class Button extends Component {
  render() {
    return (
      <button>{this.props.children}</button>
    )  
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onSelectLanguage = this.onSelectLanguage.bind(this);
    this.state = {language: 'Russian'};
  }
  
  onSelectLanguage(e) {
    this.setState({language: e.target.value});
  }

  render() {
    return (
      <div>
        <select onChange={this.onSelectLanguage}>
          <option>Russian</option>
          <option>English</option>
        </select>
        <LangProvider language={this.state.language}>
          <Fragment>
            <LocalizedButtonToolbar />
          </Fragment>
        </LangProvider>
      </div>
      
    );
  }
}

export default App;