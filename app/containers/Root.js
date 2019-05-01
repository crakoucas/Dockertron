// @flow
import React, { Component } from 'react';

import { Router } from 'react-router-dom';

import Home from './Home';

type Props = {
  history: {}
};
export default class Root extends Component<Props> {
  render() {
    const { history } = this.props;
    return (
      <Router history={history}>
        <Home />
      </Router>
    );
  }
}
