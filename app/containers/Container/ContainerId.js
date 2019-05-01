// @flow
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import doc from '../utils';

const ContainerId = (props: object) => {
  const [logs, setLogs] = useState([]);
  const { id } = props;
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(
      () => {
        savedCallback.current = callback;
      },
      [callback]
    );

    // Set up the interval.
    useEffect(
      () => {
        function tick() {
          savedCallback.current();
        }
        if (delay !== null) {
          const idi = setInterval(tick, delay);
          return () => clearInterval(idi);
        }
      },
      [delay]
    );
  }
  useInterval(() => {
    const container = doc.getContainer(id);
    const array = [];

    container.logs(
      {
        follow: false,
        stdout: true,
        stderr: true,
        tail: 'all',
        since: Math.round(new Date().getTime() / 1000) - 60 * 60 * 24 * 30
      },
      (err, log) => {
        // @flow-disable-line
        array.push(log.toString('utf8').split('\n'));
        setLogs(...array);
      }
    );
  }, 500);

  return (
    <div>
      <div
        style={{
          height: '400px',
          overflowY: 'scroll'
        }}
      >
        {// eslint-disable-next-line global-require
        logs.reverse().map((x, i) => (
          <div key={i}>{x.slice(8)}</div>
        ))}
      </div>
    </div>
  );
};

ContainerId.propTypes = {
  id: PropTypes.string.isRequired
};
export default ContainerId;
