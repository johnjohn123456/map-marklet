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

const inputStyle = {
  width: '300px',
};

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      address: '',
      center: {},
    };

  }

  addMarker = () => {
    chrome.tabs.getSelected(null, tab => {
      this.props.addMarker({
        name: this.state.name,
        url: tab.url,
        center: this.state.center,
        address: this.state.address,
      });
    });
  };

  findCenter = (e) => {
    const savedEvent = e;
    const findCenterInputRef = this.refs.findCenter;
    const input = ReactDOM.findDOMNode(findCenterInputRef);
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace();
      this.setState({
        name: place.name,
        address: place.formatted_address,
        center: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
      });
      console.log(place)
    });
  }

  componentDidUpdate (prevProps, prevState) {
    console.log(this.state)
  }

  render () {

    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div style={AppStyle}>
        <GoogleMap google={this.props.google} />
        <br />
        <input id="findCenter" style={inputStyle} type="text" ref="findCenter" onKeyPress={this.findCenter} placeholder="find location"/>
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
    name: marker.name,
    url: marker.url,
    center: marker.center,
    address: marker.address,
  }),
});

const connectAppToRedux = connect(mapStateToProps, mapDispatchToProps)(App);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC6xXldmd60eN7osRK0BPQjoCsMKYo0eiI',
})(connectAppToRedux);
