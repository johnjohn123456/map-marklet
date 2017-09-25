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

    // setTimeout(() => {
    //   console.log(this);
    //   this.setState({foo:new Date()})
    // }, 500);
  }

  addMarker = () => {
    chrome.tabs.getSelected(null, tab => {
      this.props.addMarker({
        url: tab.url,
        title: tab.title,
        place: this.state.place,
        date: this.state.date,
      });
    });
  };

  findCenter = (e) => {
    const savedEvent = e;
    const findCenterInputRef = this.refs.findCenter;
    const input = ReactDOM.findDOMNode(findCenterInputRef);
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      console.log('state changed in App.jsx')
      let place = autocomplete.getPlace();
      const date = new Date();
      this.setState({
        place: place,
        date: date.toString(),
      });
    });
  }

  componentDidUpdate (prevProps, prevState) {
    // console.log(this.props.markers)
  }

  componentWillReceiveProps (nextProps) {
    //force googlemaps to update when component recieves props from redux store
    if (nextProps.markers !== this.props.markers) {
      setTimeout(() => {
        this.setState({foo:new Date()});
      }, 500);
    }
  }

  render () {

    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }

    console.log('MARKERS', this.props.marker);

    return (
      <div style={AppStyle}>
        <GoogleMap google={this.props.google} markers={this.props.markers} />
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
    date: marker.date,
  }),
});

const connectAppToRedux = connect(mapStateToProps, mapDispatchToProps)(App);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC6xXldmd60eN7osRK0BPQjoCsMKYo0eiI',
})(connectAppToRedux);
