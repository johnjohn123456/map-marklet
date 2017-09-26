import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {GoogleApiWrapper} from 'google-maps-react';

import Marker from './Marker';

const mapStyle = {
  width: '100vw',
  height: '100vh',
  backgroundColor :'green',
};

class App extends Component {
  constructor (props) {
    super(props);
  }

  loadMap() {

  }

  render () {

    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div ref="map" style={mapStyle}>
        WHATXXXX
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  markers: state.markers,
});

// const mapDispatchToProps = (dispatch) => ({
//   deleteMarker: (marker) => dispatch({
//     type: 'DELETE_MARKER',
//   }),
// });

export default App;
