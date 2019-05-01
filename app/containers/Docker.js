// @flow

import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Radio, Modal } from 'antd';

import ContainerId from './Container/ContainerId';
import Container from './Container/Container';
import doc from './utils';

const Root = () => {
  const [docker, setDocker] = useState([]);
  const [dockerpa, setDockerpa] = useState([]);
  const [dockerpause, setDockerpause] = useState([]);
  const [dockerActive, setdockerActive] = useState('active');
  const [showModal, setShowModal] = useState(false);
  const [idDocker, setIdDocker] = useState(null);
  const [change, setChange] = useState(false);

  useEffect(
    () => {
      doc.listContainers(
        { filters: { status: ['running'] } },
        (err, containers) => {
          setDocker([...containers]);
          console.log('change');
        }
      );
    },
    [change]
  );

  useEffect(
    () => {
      doc.listContainers(
        { filters: { status: ['exited'] } },
        (err, containers) => {
          setDockerpa([...containers]);
        }
      );
    },
    [change]
  );
  useEffect(
    () => {
      doc.listContainers(
        { filters: { status: ['paused'] } },
        (err, containers) => {
          setDockerpause([...containers]);
        }
      );
    },
    [change]
  );
  function showM(id) {
    setShowModal(!showModal);
    setIdDocker(id);
  }
  function update() {
    setChange(!change);
  }

  function handleOk() {
    setShowModal(false);
    setIdDocker(null);
  }

  function onChange(e) {
    setdockerActive(e.target.value);
  }

  // function gotoContainer(id) {
  //   history.push(`/container/${id}`);
  // }

  function type() {
    switch (dockerActive) {
      case 'active':
        return (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {docker.map(x => (
              <Container
                docker={x}
                update={update}
                power={dockerActive}
                logs={showM}
                key={x.Id}
              />
            ))}
          </div>
        );

      case 'paused':
        return (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {dockerpause.map(x => (
              <Container
                docker={x}
                update={update}
                power={dockerActive}
                logs={showM}
                key={x.Id}
              />
            ))}
          </div>
        );

      case 'stopped':
        return (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {dockerpa.map(x => (
              <Container
                docker={x}
                update={update}
                power={dockerActive}
                logs={showM}
                key={x.Id}
              />
            ))}
          </div>
        );

      default:
        break;
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px'
        }}
      >
        <h1>Containers List - Docker </h1>
        <div>
          <Radio.Group
            defaultValue="active"
            buttonStyle="solid"
            size="large"
            onChange={onChange}
          >
            <Radio.Button value="active" style={{ margin: 10 }}>
              Active - {docker.length}
            </Radio.Button>
            <Radio.Button value="paused" style={{ margin: 10 }}>
              Paused - {dockerpause.length}
            </Radio.Button>
            <Radio.Button value="stopped" style={{ margin: 10 }}>
              Stopped - {dockerpa.length}
            </Radio.Button>
          </Radio.Group>
        </div>

        {type()}
      </div>

      <Modal
        visible={showModal}
        title="Logs"
        onOk={handleOk}
        onCancel={showM}
        width="850px"
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Return
          </Button>
        ]}
      >
        <ContainerId id={idDocker} />
      </Modal>
    </div>
  );
};

export default withRouter(Root);
