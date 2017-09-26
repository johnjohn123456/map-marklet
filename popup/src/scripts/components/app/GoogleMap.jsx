//popup
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Marker from './Marker';

const mapStyle = {
  margin: '5px',
  width: '550px',
  height: '350px',
  backgroundColor :'green',
};

class GoogleMap extends Component {
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
    const markers = Object.keys(this.props.markers);
    if (markers.length > 0) {
      this.getLatestMarker();
    }
    this.loadMap();
  }

  componentDidUpdate (prevProps, prevState) {
    //check if props has been updated when app is first loaded
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    //check it a new marker has been added to redux store and passed down
    if (prevProps.markers !== this.props.markers) {
      this.getLatestMarker();
    }
    //check if state change when placing temp marker
    if (prevState !== this.state) {
      this.loadMap();
    }
  }

  componentWillReceiveProps (nextProps) {
    //ensures that it is the place change event in autocomplete re-setting latLng in App.jsx
    //...that causes invocation of panTo here
    if (this.props.latLng !== nextProps.latLng) {
      this.map.panTo(nextProps.latLng);
    }
    //when DELETE_MARKER is dispatched, re-load the map
    if (this.props.markers !== nextProps.markers) {
      this.loadMap();
    }
  }

  loadMap () {
    if (this.props && this.props.google) {
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
      };
      this.map = new maps.Map(node, mapConfig);

      //add listener for clicks on map to place markers
      let tempMarker = null;
      this.map.addListener('click', (e) => {
        if (tempMarker && tempMarker.setMap) {
          //remove the prev tempMarker before a new one is set
          tempMarker.setMap(null);
        }
        const date = new Date();
        const marker = new maps.Marker({
          position: e.latLng,
        });
        tempMarker = marker;
        // this.map.panTo(e.latLng);
        marker.setMap(this.map);
        this.props.placeMarker(e.latLng, date);
      });
    }
  }

  getLatestMarker () {
    //transpose markers from obj into array
    const markers = [];
    Object.keys(this.props.markers).forEach((marker) => {
      markers.push(this.props.markers[marker]);
    });

    const latestAddedMarker = markers.reduce((a,b)=>{
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return bDate > aDate ? b : a;
    });

    this.setState({
      currentCenter: {
        lat: latestAddedMarker.latLng.lat,
        lng: latestAddedMarker.latLng.lng,
      },
    });
  }

  renderMarkers () {
    if (this.props.markers) {
      const markers = this.props.markers;
      return Object.keys(markers).map(marker => {
        return <Marker
          key={marker}
          google={this.props.google}
          marker={markers[marker]}
          map={this.map}
          // mapCenter={this.state.currentCenter}
          deleteMarker={this.props.deleteMarker}
        />;
      });
    }
  }

  render () {
    return (
      <div ref="map" style={mapStyle}>
        {this.renderMarkers()}
      </div>
    );
  }
}

GoogleMap.defaultProps = {
  zoom: 13,
  initialCenter: {
    lat: 51.5073509,
    lng: -0.12775829999998223,
  },
};

export default GoogleMap;
