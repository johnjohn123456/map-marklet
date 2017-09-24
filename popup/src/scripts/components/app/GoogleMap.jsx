import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


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
    this.loadMap();
  }

  componentDidUpdate (prevProps, prevState) {
    //check if props has been updated when app is first loaded
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevProps.markers !== this.props.markers) {
      this.getLatestMarker();
      // const currentCenter = getLatestMarker();
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
    }
  }

  getLatestMarker () {
    const urls = this.props.markers;
    let latest = {};

    // for (uuid in urls) {
    //   const place = urls[uuid];
    //   const date = new Date(place.date);
    //   if (Object.keys(obj).length === 0 && obj.constructor === Object
    //       || date > latest.date) {
    //     latest = place;
    //   }
    // }
    // console.log(latest);
  }

  render () {
    return (
      <div ref="map" style={mapStyle}>
      </div>
    );
  }
}

GoogleMap.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  initialCenter: PropTypes.object,
};

GoogleMap.defaultProps = {
  zoom: 13,
  initialCenter: {
    lat: 1.351128,
    lng: 103.872199,
  },
};

export default GoogleMap;
