//popup
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import GoogleMapStyles from './styles.js';

import './styles.scss';

class GoogleMap extends Component {

  tempMarker = null;

  constructor (props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentCenter: {
        lat: lat,
        lng: lng,
      },
    };
  }


  componentDidMount () {
    const markers = this.props.markers;
    if (markers.length > 0) {
      this.getLatestMarker();
    }
    console.log('component did mount');
    this.loadMap();
  }

  componentDidUpdate (prevProps, prevState) {
    // if (prevProps.google !== this.props.google) {
    //   console.log('google maps api is loaded');
    //   this.loadMap();
    // }

    //check if markers have been added or removed in redux store
    if (prevProps.markers !== this.props.markers) {
      console.log('redux store markers array has been modified');
      if (this.props.markers.length === 0) {
        this.loadMap();
      }
      this.getLatestMarker();
    }
    //getLatestMarker changes state to focus map around the latest added marker
    //placing temp marker changes state, triggers map to load with center on new temp marker --not sure...
    //can re-render markers w/o reloading map?
    if (prevState !== this.state) {
      console.log('state was re-set');
      this.loadMap();
    }
  }

  componentWillReceiveProps (nextProps) {
    //conditional to ensure that only the place change event in autocomplete is re-setting latLng in App.jsx
    //otherwise props will change when temp marker is set via clicking
    if (this.props.latLng !== nextProps.latLng) {
      this.map.panTo(nextProps.latLng);
      this.setTempMarker(nextProps.place, nextProps.latLng);
    }
  }

  setTempMarker = (place, latLng) => {
    //if the google api has loaded into props
    const {google} = this.props;
    const maps = google.maps;

    if (this.tempMarker && this.tempMarker.setMap) {
      //remove the prev this.tempMarker before a new one is set
      this.tempMarker.setMap(null);
    }
    const date = new Date();
    const marker = new maps.Marker({
      position: latLng,
    });
    this.tempMarker = marker;
    marker.setMap(this.map);
    //if place is not undefined temp marker was set via autocomplete & parent state is already set
    //only set the parent state if temp marker was set via clicking
    if (!place) this.props.placeMarker(null, latLng, date);
  }

  loadMap () {
    if (this.props && this.props.google) {
      console.log('load map called');
      //if the google api has loaded into props
      const {google} = this.props;
      const maps = google.maps;

      //reference to GoogleMap's div node
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = this.props.zoom; //zoom set via default props
      //currentCenter set to default props initialCenter in state
      const {lat, lng} = this.state.currentCenter;
      const center = {lat, lng};
      const mapConfig = {
        center: center,
        zoom: zoom,
        styles: GoogleMapStyles,
      };
      this.map = new maps.Map(node, mapConfig);
      //render the markers
      this.renderMarkers();
      //add listener for clicks on map to place markers
      this.map.addListener('click', (e) => {
        this.setTempMarker(null, e.latLng);
      });
    }
  }

  getLatestMarker () {
    if (this.props.markers.length > 0) {
      console.log('get latest marker');
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
      console.log('props.markers.length > 0 when rendering markers');
      const markers = this.props.markers;
      const google = this.props.google;
      return markers.map(m => {
        const marker = new google.maps.Marker({
          position: m.latLng,
          map: this.map,
        });
        marker.addListener('click', () => {
          this.props.deleteMarker(marker);
        });
      });
    }
    console.log('render markers triggered but latest marker length is 0');
  }

  render () {
    return (
      <div ref="map" className="mapStyle">
      </div>
    );
  }
}

GoogleMap.defaultProps = {
  zoom: 8,
  initialCenter: {
    lat: 64.128288,
    lng: -21.827774,
  },
};

export default GoogleMap;
