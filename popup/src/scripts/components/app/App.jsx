import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {GoogleApiWrapper} from 'google-maps-react';

import GoogleMap from './GoogleMap';

const AppStyle = {
  width: '600px',
  height: '600px',
  backgroundColor :'gray',
};

const buttonStyle = {
  backgroundColor: '#778899',
  color: 'white',
};

class App extends Component {
  constructor (props) {
    super(props);
  }

  addMarker = () => {
    const center = {
      lat: document.getElementById('lat').value,
      lng: document.getElementById('lng').value,
    };
    chrome.tabs.getSelected(null, tab => {
      this.props.addMarker({
        url: tab.url,
        center: center,
      });
    });
  };

  findCenter = () => {
    const findCenterInputRef = this.refs.findCenter;
    const input = ReactDOM.findDOMNode(findCenterInputRef);
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace();
      console.log(place);
    });
  }

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
        <input id="findCenter" type="text" ref="findCenter" onChange={this.findCenter} placeholder="find location"/>
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
    center: marker.center,
  }),
});

const connectAppToRedux = connect(mapStateToProps, mapDispatchToProps)(App);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC6xXldmd60eN7osRK0BPQjoCsMKYo0eiI',
})(connectAppToRedux);
