// @flow
import React, { useState } from 'react';
import PropTypes from 'prop-types';
// $FlowFixMe
import { notification, Spin, Card, Icon, Avatar } from 'antd';

import ContainerInfo from './ContainerInfo';
import doc from '../utils';

const { Meta } = Card;

const Container = (props: {
  power: string,
  docker: { Id: string, Image: string, Names: string },
  logs: string => void,
  update: void => void
}) => {
  // eslint-disable-next-line
  const [idDocker, setIdDocker] = useState(null);
  // eslint-disable-next-line
  const [change, setChange] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const { docker, logs, update, power } = props;

  const openNotification = (message, description) => {
    notification.warning({
      duration: 2,
      message,
      description,
      placement: 'bottomRight'
    });
  };
  const containerName = docker.Names.toString()
    .slice(1)
    .toUpperCase();

  function changeStatus(id, key) {
    setisLoading(true);
    setIdDocker(id);
    setChange(true);
    switch (key) {
      case 'stopcontainer':
        doc.getContainer(id).stop(err => {
          if (err) {
            openNotification('Error', err);
          }
          openNotification(
            `${containerName} - ${docker.Image.toString()}`,
            'Stopped with no Error'
          );
          setChange(false);
          setisLoading(false);
          setIdDocker(null);
          update();
        });
        break;
      case 'startcontainer':
        doc.getContainer(id).start(err => {
          if (err) {
            openNotification('Error', err);
          }
          openNotification(
            `${containerName} - ${docker.Image.toString()}`,
            'Started with no Error'
          );
          setChange(false);
          setisLoading(false);
          setIdDocker(null);
          update();
        });
        break;
      case 'removecontainer':
        doc.getContainer(id).remove(err => {
          if (err) {
            openNotification('Error', err);
          }
          openNotification(
            `${containerName} - ${docker.Image.toString()}`,
            'Deleted with no Error'
          );
          setChange(false);
          setisLoading(false);
          setIdDocker(null);
          update();
        });
        break;
      case 'pausecontainer':
        doc.getContainer(id).pause(err => {
          if (err) {
            openNotification('Error', err);
          }
          openNotification(
            `${containerName} - ${docker.Image.toString()}`,
            'Paused with no Error'
          );
          setChange(false);
          setisLoading(false);
          update();
        });
        break;
      case 'restart':
        doc.getContainer(id).restart(err => {
          if (err) {
            openNotification('Error', err);
          }
          openNotification(
            `${containerName} - ${docker.Image.toString()}`,
            'Restarted with no Error'
          );
          setChange(false);
          setisLoading(false);
          update();
        });
        break;
      case 'unpausecontainer':
        doc.getContainer(id).unpause(err => {
          if (err) {
            openNotification('Error', err);
          }
          openNotification(
            `${containerName} - ${docker.Image.toString()}`,
            'Unpaused with no Error'
          );
          setChange(false);
          setisLoading(false);
          update();
        });
        break;
      default:
        break;
    }
  }
  function iconAction() {
    switch (power) {
      case 'active':
        return action.active;
      case 'stopped':
        return action.stop;
      case 'paused':
        return action.paused;
      default:
        break;
    }
  }

  const render = () => {
    if (isLoading === true) {
      return (
        <div style={{ marginLeft: '45%' }}>
          <Spin spinning={isLoading} size="large" />
        </div>
      );
    }
    if (power === 'paused') {
      return <div style={{ marginLeft: '45%', height: '40px' }} />;
    }
    if (power === 'stopped') {
      return <div style={{ marginLeft: '45%', height: '40px' }} />;
    }
    return <ContainerInfo id={docker} />;
  };

  const action = {
    active: [
      <Icon
        type="poweroff"
        onClick={() => changeStatus(docker.Id, 'stopcontainer')}
        style={{ color: 'red' }}
      />,
      <Icon
        type="pause"
        onClick={() => changeStatus(docker.Id, 'pausecontainer')}
        style={{ color: 'black' }}
      />,
      <Icon
        type="profile"
        style={{ color: 'black' }}
        onClick={() => logs(docker.Id)}
      />,
      <Icon
        type="sync"
        style={{ color: 'black' }}
        onClick={() => changeStatus(docker.Id, 'restart')}
      />,
      <Icon
        type="delete"
        onClick={() => changeStatus(docker.Id, 'removecontainer')}
        style={{ color: 'red' }}
      />
    ],
    stop: [
      <Icon
        type="thunderbolt"
        onClick={() => changeStatus(docker.Id, 'startcontainer')}
        style={{ color: 'green' }}
      />,
      <Icon
        type="delete"
        onClick={() => changeStatus(docker.Id, 'removecontainer')}
        style={{ color: 'red' }}
      />
    ],
    paused: [
      <Icon
        type="play-circle"
        onClick={() => changeStatus(docker.Id, 'unpausecontainer')}
        style={{ color: 'green' }}
      />,
      <Icon
        type="delete"
        onClick={() => changeStatus(docker.Id, 'removecontainer')}
        style={{ color: 'red' }}
      />
    ]
  };
  return (
    <Card
      key={docker.Id}
      style={{ width: '300px', margin: '20px' }}
      actions={iconAction()}
    >
      <Meta
        avatar={
          <Avatar src="https://d36jcksde1wxzq.cloudfront.net/be7833db9bddb4494d2a7c3dd659199a.png" />
        }
        title={containerName}
        description={docker.Image.toString()}
      />

      <div style={{ marginTop: '1em' }}>{render()}</div>
    </Card>
  );
};

Container.propTypes = {
  docker: PropTypes.shape({}).isRequired,
  logs: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  power: PropTypes.string.isRequired
};
export default Container;
