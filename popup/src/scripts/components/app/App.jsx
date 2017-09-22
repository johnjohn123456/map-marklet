import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GoogleApiWrapper} from 'google-maps-react';

import GoogleMap from './GoogleMap';

const AppStyle = {
  width: '600px',
  height: '400px',
  backgroundColor :'black',
};

const mapStyle = {
  margin: '10px',
  width: '350px',
  height: '200px',
  backgroundColor :'grey',
};

const buttonStyle = {
  backgroundColor: '#778899',
  color: 'white',
};

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

    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div style={AppStyle}>
        <GoogleMap google={this.props.google}/>/>
        <button style={buttonStyle} onClick={this.addUrl}>Add URL</button>
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

const connectAppToRedux = connect(mapStateToProps, mapDispatchToProps)(App);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC6xXldmd60eN7osRK0BPQjoCsMKYo0eiI',
})(connectAppToRedux);
