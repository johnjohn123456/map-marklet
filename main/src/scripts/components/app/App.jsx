//main
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
      this.loadMap();
    }
    console.log(this.props)
  }

  componentWillReceiveProps (nextProps) {
    //force googlemaps to update when component recieves props from redux store
    if (nextProps.markers !== this.props.markers) {
      setTimeout(() => {
        this.setState({foo:new Date()});
      }, 200);
    }
  }

  loadMap () {
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
      };
      this.map = new maps.Map(node, mapConfig);
    }
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
          mapCenter={this.state.currentCenter}
        />;
      });
    }
  }

  render () {
    if (!this.props.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div ref="map" style={mapStyle}>
        MAIN PAGE xxx xxx xxx
        {this.renderMarkers()}
      </div>
    );
  }
}

App.defaultProps = {
  zoom: 13,
  initialCenter: {
    lat: 51.5073509,
    lng: -0.12775829999998223,
  },
};

const mapStateToProps = (state) => ({
  markers: state.markers,
});

const connectAppToRedux = connect(mapStateToProps)(App);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC6xXldmd60eN7osRK0BPQjoCsMKYo0eiI',
})(connectAppToRedux);
