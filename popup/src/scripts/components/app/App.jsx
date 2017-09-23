import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GoogleApiWrapper} from 'google-maps-react';

import GoogleMap from './GoogleMap';

const AppStyle = {
  width: '600px',
  height: '400px',
  backgroundColor :'gray',
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

  // addUrl = () => {
  //   chrome.tabs.getSelected(null, tab => {
  //     this.props.addUrl(tab.url);
  //   });
  // }

  // addLocation = () => {
  //   const center = {
  //     lat: document.getElementById('lat').value,
  //     lng: document.getElementById('lng').value,
  //   };
  // };

  addMarker = () => {
    chrome.tabs.getSelected(null, tab => {
      this.props.addMarker({url: tab.url});
    });
  };

  render () {

    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div style={AppStyle}>
        <GoogleMap google={this.props.google} />
        <br />
        <input id="lat" type="text" placeholder="latitude" />
        <input id="lng" type="text" placeholder="longitude" />
        <button style={buttonStyle} onClick={this.addMarker}>Add Marker</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  urls: state.urls,
});

const mapDispatchToProps = (dispatch) => ({
  addMarker: (marker) => dispatch({
    type: 'ADD_URL',
    url: marker.url,
    // location: location,
  }),
});

const connectAppToRedux = connect(mapStateToProps, mapDispatchToProps)(App);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC6xXldmd60eN7osRK0BPQjoCsMKYo0eiI',
})(connectAppToRedux);
