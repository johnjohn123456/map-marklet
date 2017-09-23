import React, {Component} from 'react';
import ReactDOM from 'react-dom';


const mapStyle = {
  margin: '10px',
  width: '550px',
  height: '350px',
  backgroundColor :'grey',
};

class GoogleMap extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.loadMap();
  }

  componentDidUpdate (prevProps, prevState) {
    //check if props has been updated when app is first loaded
    if (prevProps.google !== this.props.google) {
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

      let zoom = 14;
      let lat = 1.290270;
      let lng = 103.851959;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = {
        center: center,
        zoom: zoom,
      };
      this.map = new maps.Map(node, mapConfig);
    }
  }

  render () {
    return (
      <div ref="map" style={mapStyle}>
        MAP boondogles
      </div>
    );
  }
}

export default GoogleMap;
