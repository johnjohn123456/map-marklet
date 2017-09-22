import React, {Component} from 'react';
import ReactDOM from 'react-dom';


const mapStyle = {
  margin: '10px',
  width: '350px',
  height: '200px',
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
      console.log(mapRef)
      console.log(node)
      console.log(google)
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
