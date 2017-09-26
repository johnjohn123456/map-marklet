//main-Marker
import React, {Component} from 'react';

class Marker extends Component {
  constructor (props) {
    super(props);
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
      title: markerInfo.title,
    });
    const infowindow = new google.maps.InfoWindow({
      content: markerInfo.title,
    });
    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });
  }

  render () {
    return null;
  }
}

export default Marker;
