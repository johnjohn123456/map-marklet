import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor (props) {
    super(props);
  }

  addUrl = () => {
    chrome.tabs.getSelected(null, tab => {
      this.props.addUrl(tab.url);
    });
  }

  render () {
    return (
      <div className="popup">
        <button onClick={this.addUrl}>Add URL here</button>
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  urls: state.urls,
});

const mapDispatchToProps = (dispatch) => ({
  addUrl: (url) => dispatch({
    type: 'ADD_URL',
    url: url,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
