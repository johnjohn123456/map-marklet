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

  render () {
    return (
      <div style={mapStyle}>
        MAP
      </div>
    );
  }
}

export default GoogleMap;
