// @flow
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';

import { Menu, Icon } from 'antd';
import Docker from './Docker';
import Error404 from './Error';
import ContainerId from './Container/ContainerId';
import Volume from './Volume/Volume';
import Network from './Network/Network';

const Home = props => {
  const { history } = props;
  const [menu, setMenu] = useState('/home');

  if (history.location.pathname === '/') {
    history.push('/home');
  }
  const handleClick = e => {
    history.push(`/${e.key}`);
    setMenu(e.key);
  };

  return (
    <div>
      <Menu onClick={handleClick} selectedKeys={[menu]} mode="horizontal">
        <Menu.Item key="home">
          <Icon type="mail" />
          Container
        </Menu.Item>
        <Menu.Item key="volume">
          <Icon type="appstore" />
          Volume
        </Menu.Item>
        <Menu.Item key="network">
          <Icon type="appstore" />
          Network
        </Menu.Item>
      </Menu>
      <div>
        <Switch location={history.location}>
          <Route path="/home" component={Docker} />
          <Route path="/volume" component={Volume} />
          <Route path="/network" component={Network} />
          <Route path="*" component={Error404} />
          <Route path="/container/:id" component={ContainerId} />
        </Switch>
      </div>
    </div>
  );
};
Home.propTypes = {
  history: PropTypes.shape({}).isRequired
};
export default withRouter(Home);
