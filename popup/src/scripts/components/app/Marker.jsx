import React, {Component} from 'react';
import {connect} from 'react-redux';

class Marker extends Component {
  constructor (props) {
    super(props);
  }

  componentDidUpdate () {
    this.renderMarker();
  }

  renderMarker () {
    const google = this.props.google;
    const map = this.props.map;
    const markerInfo = this.props.marker
    // console.log(this.props.marker.place.geometry.location)
    const marker = new google.maps.Marker({
      position: markerInfo.place.geometry.location,
      map: map,
      title: 'foobar',
    });
  }

  render () {
    return null;
  }
}

export default Marker;
