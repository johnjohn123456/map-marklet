//popup
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {GoogleApiWrapper} from 'google-maps-react';

import GoogleMap from './GoogleMap';


import './styles.scss';

let autocomplete = '';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      textArea: {},
    };
  }


  componentDidMount () {
    const desc = window.localStorage.getItem('desc');
    const pic = window.localStorage.getItem('pic');
    const tempMarker = window.localStorage.getItem('tempItem');
    if (window.localStorage.getItem('placeInfo')) {
      const placeInfo = JSON.parse(window.localStorage.getItem('placeInfo'))
      this.placeMarker(placeInfo.place, placeInfo.latLng, placeInfo.date)
    }

    if (window.localStorage.getItem('autocomplete')) {
      autocomplete = JSON.parse(window.localStorage.getItem('autocomplete'))
      this.setState({
        autocomplete: autocomplete
      }, ()=>{console.log('autocomplete found on window')})
    } else {
      this.setState({
        autocomplete: 'find location...'
      }, ()=>{console.log('no autocomplete found on window, setting state to find location...')})
    }

    this.setState({
      textArea: {
        desc: desc ? desc : '',
        pic: pic ? pic : '',
      },
    });
  }

  //called when autocomplete field is filled in findCenter() is filled
  //sets the state up for input to Redux store but does not send to store
  placeMarker = (place, latLng, date) => {
    this.setState({
      place: place,
      latLng: latLng,
      date: date.toString(),
    }, ()=>{
      window.localStorage.setItem('placeInfo', JSON.stringify({place, latLng, date}));
    });
  }

  //when a place is selected in the autocomplete field, placeMarker sets the state.
  //change in state is passed to GoogleMap child component which calls setTempMarker
  findCenter = (e) => {
    //const savedEvent = e;
    const findCenterInputRef = this.refs.findCenter;
    const input = ReactDOM.findDOMNode(findCenterInputRef);
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace();
      const date = new Date();
      this.placeMarker(place, place.geometry.location, date);
      window.localStorage.setItem('autocomplete', JSON.stringify(place.formatted_address));
    });
  }

  //dispatches the action
  addMarker = () => {
    if (this.state.latLng) {
      const desc = document.getElementById('desc').value;
      const pic = document.getElementById('pic').value;
      chrome.tabs.getSelected(null, tab => {

        this.props.addMarker({
          url: tab.url,
          title: tab.title,
          desc: desc,
          pic: pic,
          place: this.state.place,
          latLng: this.state.latLng,
          date: this.state.date,
        });

        const clearField = {target: {value: ''}};
        this.updateTextArea('desc', clearField);
        this.updateTextArea('pic', clearField);

      });
    }
  };

  viewMarkers = () => {
    chrome.tabs.create({
      'url': '/main.html',
    });
  }

  //passed down and called from Marker child component
  deleteMarker = (marker) => {
    marker.center = {
      lat: marker.position.lat(),
      lng: marker.position.lng(),
    };

    // //set prop latLng as stringified version of the center obj
    marker.latLng = JSON.stringify(marker.center);
    this.props.deleteMarker(marker);
  }

  changePlaceholder = () => {
    this.setState({
      autocomplete: 'find location...'
    }, () => {
      window.localStorage.removeItem('autocomplete')
    })
  }

  updateTextArea = (id, e) => {
    this.setState({
      textArea: {
        ...this.state.textArea,
        [id]: e.target.value,
      },
    }, () => {
      window.localStorage.setItem(id, this.state.textArea[id]);
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
          changePlaceholder={this.changePlaceholder}
          place={this.state.place}
          latLng={this.state.latLng}
          value={this.state.location}
        />

        <input id="findCenter"
          type="text"
          ref="findCenter"
          onKeyPress={this.findCenter}
          placeholder={this.state.autocomplete}
        />

        <textarea id="desc" value={this.state.textArea.desc} onChange={(e) => this.updateTextArea('desc', e)} placeholder="Add an desc by placing its url here..."/>
        <textarea id="pic" value={this.state.textArea.pic} onChange={(e) => this.updateTextArea('pic', e)} placeholder="Add a pic by placing its url here..."/>

        <div id="buttons">
          <button onClick={this.addMarker}>Add Marker</button>
          <button onClick={this.viewMarkers}>View Markers</button>
        </div>

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
    marker: {
      url: marker.url,
      title: marker.title,
      desc: marker.desc,
      pic: marker.pic,
      place: marker.place,
      latLng: marker.latLng,
      date: marker.date,
    },
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
