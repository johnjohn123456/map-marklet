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
    console.log('component did mount');
    const markers = this.props.markers;
    if (markers.length > 0) {
      this.getLatestMarker();
    }
    this.loadMap();
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }

    if (prevProps.markers !== this.props.markers) {
      if (this.props.google) {
        if (this.props.markers.length === 0) {
          //remove the last marker
          this.renderMarkers();
        } else {
          this.getLatestMarker();
        }
      }
    }

    if (prevState !== this.state) {
      //loadMap calles getLatestMarker which sets state to its latLng
      this.map.panTo(this.state.currentCenter);
      this.renderMarkers();
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
    //refactor to this.tempMarker = new maps.Marker(...)
    this.tempMarker = new maps.Marker({
      position: latLng,
    });
    // this.tempMarker = marker;
    this.tempMarker.setMap(this.map);
    //if place is not undefined temp marker was set via autocomplete & parent state is already set
    //only set the parent state if temp marker was set via clicking
    if (!place) this.props.placeMarker(null, latLng, date);
  }

  loadMap () {
    if (this.props && this.props.google) {
      console.log('load map called');
      console.log('---------------------------------');
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
      this.getLatestMarker();
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
      this.setState({
        currentCenter: {
          lat: latestAddedMarker.latLng.lat,
          lng: latestAddedMarker.latLng.lng,
        },
      });
    }
  }


  renderMarkers () {
    if (this.props.markers) {
      if (this.tempMarker) this.tempMarker.setMap(null)
      //remove markers from map before resetting them again
      if (this.markers) this.markers.forEach(m => m.setMap(null));

      this.markers = [];

      const markers = this.props.markers;
      const google = this.props.google;

      markers.map(m => {
        const marker = new google.maps.Marker({
          position: m.latLng,
        });

        marker.addListener('click', () => {
          this.props.deleteMarker(marker);
        });

        this.markers.push(marker);
      });
      return this.markers.forEach(m => m.setMap(this.map));
    }
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
