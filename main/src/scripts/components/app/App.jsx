//main
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {GoogleApiWrapper} from 'google-maps-react';

import Marker from './Marker';
import GoogleMapStyle from './styles';

import './styles.scss';


const mapStyle = {
  width: '100vw',
  height: '100vh',
  backgroundColor :'green',
};

class App extends Component {
  constructor (props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentCenter : {
        lat : lat,
        lng: lng,
      },
    };
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      console.log('google maps api is loaded');
      this.loadMap();
    }

    if (prevProps.markers !== this.props.markers) {
      console.log('change in props.markers');
      if (prevProps.markers && prevProps.markers.length === 1 && this.props.markers.length === 0) {
        console.log('last marker deleted');
        this.loadMap();
      }
      if (this.props.google) {
        console.log('google loaded and markers loaded, added or deleted');
        this.renderMarkers();
      }
    }

    if (prevState !== this.state) {
      console.log('currentCenter in this.state updated');
      this.renderMarkers();
    }
  }

  // componentWillReceiveProps (nextProps) {
  //   //force googlemaps to update when component recieves props from redux store
  //   if (nextProps.markers !== this.props.markers) {
  //     console.log('force googlemaps to update by resetting state');
  //     setTimeout(() => {
  //       this.setState({foo:new Date()});
  //     }, 200);
  //   }
  // }

  loadMap () {
    console.log('load map');
    if (this.props && this.props.google) {
      //if the google api has loaded into props
      const google = this.props.google;
      const maps = google.maps;
      //ref to App's div node
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = this.props.zoom; //zoom set via default props
      //currentCenter set to default props, initialCenter set in state
      const {lat, lng} = this.state.currentCenter;
      const center = {lat, lng};
      const mapConfig = {
        center: center,
        zoom: zoom,
        styles: GoogleMapStyle,
      };
      this.map = new maps.Map(node, mapConfig);
      this.getLatestMarker();
    }
  }

  getLatestMarker () {
    if (this.props.markers.length > 0) {
      console.log('get latest marker will re-set the state');
      const markers = this.props.markers;
      const latestAddedMarker = markers[markers.length-1];
      //triggers re-render of map to center of latest marker by setting state
      //setting the state triggers componentDidUpdate which checks for state change, reloading the map
      this.setState({
        currentCenter: {
          lat: latestAddedMarker.latLng.lat,
          lng: latestAddedMarker.latLng.lng,
        },
      });
    }
  }

  renderMarkers () {
    if (this.props.markers.length > 0) {
      console.log('markers are rendered');
      const markers = this.props.markers;
      const google = this.props.google;
      return markers.map(m => {
        const marker = new google.maps.Marker({
          position: m.latLng,
          map: this.map,
          title: m.title,
        });

        const contentString =
          `<h2><a href="${m.url}" target="_blank">${m.title}</a></h2>` +
          `<div>${m.desc}</div>`;
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });
        marker.addListener('click', () => {
          infowindow.open(this.map, marker);
        });
      });
    }
  }


  render () {
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div ref="map" style={mapStyle}>
      </div>
    );
  }
}

App.defaultProps = {
  zoom: 8,
  initialCenter: {
    lat: 64.128288,
    lng: -21.827774,
  },
};

const mapStateToProps = (state) => ({
  markers: state.markers,
});

const connectAppToRedux = connect(mapStateToProps)(App);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC6xXldmd60eN7osRK0BPQjoCsMKYo0eiI',
})(connectAppToRedux);
