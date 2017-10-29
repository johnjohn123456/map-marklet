//popup
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {GoogleApiWrapper} from 'google-maps-react';

import GoogleMap from './GoogleMap';
import Marker from './Marker';

import './styles.scss';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {};

  }

  renderUserButton = () => {
    if (this.state.authorization) {
      return <button>My Trips</button>;
    } else {
      return <button onClick={this.signIn}>Login</button>;
    }
  }

  signIn = () => {
    chrome.identity.getAuthToken({ 'interactive': true }, (token) => {
      this.setState({
        authorization: token,
      });
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

  //called when autocomplete field is filled in findCenter() is filled
  //sets the state up for input to Redux store but does not send to store
  placeMarker = (latLng, date) => {
    this.setState({
      place: null,
      latLng: latLng,
      date: date.toString(),
    });
  }

  //dispatches the action
  addMarker = () => {
    const desc = document.getElementById('desc').value;
    chrome.tabs.getSelected(null, tab => {
      this.props.addMarker({
        url: tab.url,
        title: tab.title,
        desc: desc,
        place: this.state.place,
        latLng: this.state.latLng,
        date: this.state.date,
      });
    });
  };

  //passed down and called from Marker child component
  deleteMarker = (marker) => {
    console.log('deleted marker triggered: ', marker);
    marker.center = {
      lat: marker.position.lat(),
      lng: marker.position.lng(),
    };

    //set prop latLng as stringified version of the center obj
    marker.latLng = JSON.stringify(marker.center);
    this.props.deleteMarker(marker);

  }

  //when a place is selected in the autocomplete field, setState with place data.
  findCenter = (e) => {
    const savedEvent = e;
    const findCenterInputRef = this.refs.findCenter;
    const input = ReactDOM.findDOMNode(findCenterInputRef);
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace();
      const date = new Date();
      this.setState({
        place: place,
        latLng: place.geometry.location,
        date: date.toString(),
      });
    });
  }

  render () {

    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }


    return (
      <div className="app">

        <GoogleMap ref="map"
          google={this.props.google}
          markers={this.props.markers}
          placeMarker={this.placeMarker}
          deleteMarker={this.deleteMarker}
          place={this.state.place}
          latLng={this.state.latLng}
        />

        <input id="findCenter"
          type="text"
          ref="findCenter"
          onKeyPress={this.findCenter}
          placeholder="find location"
        />

        <textarea id="desc" />

        <button onClick={this.addMarker}>Add Marker</button>
        {this.renderUserButton()}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  markers: state.markers,
});

const mapDispatchToProps = (dispatch) => ({
  addMarker: (marker) => dispatch({
    type: 'ADD_MARKER',
    url: marker.url,
    title: marker.title,
    desc: marker.desc,
    place: marker.place,
    latLng: marker.latLng,
    date: marker.date,
  }),

  deleteMarker: (marker) => dispatch({
    type: 'DELETE_MARKER',
    latLng: marker.latLng,
  }),
});

const connectAppToRedux = connect(mapStateToProps, mapDispatchToProps)(App);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC6xXldmd60eN7osRK0BPQjoCsMKYo0eiI',
})(connectAppToRedux);
