import React, {Component} from 'react';

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
      const {google} = this.props;
      const maps = google.maps;
      console.log(google)
    }
  }

  render () {
    return (
      <div style={mapStyle}>
        MAP boondogles
      </div>
    );
  }
}

export default GoogleMap;
