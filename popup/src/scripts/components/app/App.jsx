import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {GoogleApiWrapper} from 'google-maps-react';

import GoogleMap from './GoogleMap';
import Marker from './Marker';

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
  width: '450px',
};

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {};

  }

  addMarker = () => {
    chrome.tabs.getSelected(null, tab => {
      this.props.addMarker({
        url: tab.url,
        title: tab.title,
        place: this.state.place,
        latLng: this.state.latLng,
        date: this.state.date,
      });
    });
  };

  //when a place is selected in the autocomplete field, setState with place data.
  findCenter = (e) => {
    const savedEvent = e;
    const findCenterInputRef = this.refs.findCenter;
    const input = ReactDOM.findDOMNode(findCenterInputRef);
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace();
      const date = new Date();
      console.log('place-changed')
      this.setState({
        place: place,
        latLng: place.geometry.location,
        date: date.toString(),
      });
    });
  }

  placeMarker = (latLng, date) => {
    this.setState({
      place: null,
      latLng: latLng,
      date: date.toString(),
    });
  }

  componentWillReceiveProps (nextProps) {
    //force googlemaps to update when component recieves props from redux store
    if (nextProps.markers !== this.props.markers) {
      setTimeout(() => {
        this.setState({foo:new Date()});
      }, 200);
    }
  }

  render () {

    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div style={AppStyle}>
        <GoogleMap google={this.props.google} markers={this.props.markers} placeMarker={this.placeMarker}/>
        <br />
        <input id="findCenter" style={inputStyle} type="text" ref="findCenter" onKeyPress={this.findCenter} placeholder="find location"/>
        <button style={buttonStyle} onClick={this.addMarker}>Add Marker</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  markers: state.markers,
});

const mapDispatchToProps = (dispatch) => ({
  addMarker: (marker) => dispatch({
    type: 'ADD_URL',
    url: marker.url,
    title: marker.title,
    place: marker.place,
    latLng: marker.latLng,
    date: marker.date,
  }),
});

const connectAppToRedux = connect(mapStateToProps, mapDispatchToProps)(App);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC6xXldmd60eN7osRK0BPQjoCsMKYo0eiI',
})(connectAppToRedux);
