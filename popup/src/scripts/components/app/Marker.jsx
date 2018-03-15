import React, {Component} from 'react';
import {connect} from 'react-redux';

class Marker extends Component {
  constructor (props) {
    super(props);
    this.props.marker
  }

  componentDidMount () {
    this.renderMarker();
  }

  componentDidUpdate () {
    this.renderMarker();
  }

  renderMarker () {
    const google = this.props.google;
    const map = this.props.map;
    const markerInfo = this.props.marker;
    const marker = new google.maps.Marker({
      position: markerInfo.latLng,
      map: map,
    });
    marker.addListener('click', () => {
      this.props.deleteMarker(marker);
    });
  }

  render () {
    return null;
  }
}

export default Marker;
