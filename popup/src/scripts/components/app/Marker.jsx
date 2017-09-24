import React, {Component} from 'react';
import {connect} from 'react-redux';

class Marker extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    console.log(this.props.marker)
  }

  render () {
    return (
      <div>Foobar</div>
    );
  }
}

export default Marker;
