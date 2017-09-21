import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    chrome.tabs.getSelected(null, tab => {
      this.setState({ url: tab.url });
    });
  }

  saveUrl () {
    console.log('foo')
  }

  render () {
    return (
      <div>
        <button onClick={this.saveUrl}>Save URL</button>
        <br />
        {/* URL: {this.state.url} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    urls: state.urls,
  };
};

const mapDispatchToProps = (dispatch) => ({
  saveUrl: (url) => dispatch({
    type: 'SAVE_URL',
    url: url,
  }),
});

export default (mapStateToProps)(mapDispatchToProps)(App);
