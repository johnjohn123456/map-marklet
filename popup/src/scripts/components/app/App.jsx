import React, {Component} from 'react';
import {connect} from 'react-redux';
// import './styles.css';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {url: null};
  }

  componentDidMount () {
    chrome.tabs.getSelected(null, tab => {
      this.setState({ url: tab.url });
    });
  }

  addUrl = () => {
    chrome.tabs.getSelected(null, tab => {
      this.props.addUrl(tab.url);
    });
  }

  render () {
    return (
      <div className="popup">
        <button onClick={this.addUrl}>Add URL</button>
        <br />
        {this.state.url}
        {/* <button onClick={this.logProps}>Save URL</button> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  urls: state.urls,
});

const mapDispatchToProps = (dispatch) => ({
  addUrl: (url) => dispatch({
    type: 'ADD_URL',
    url: url,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
