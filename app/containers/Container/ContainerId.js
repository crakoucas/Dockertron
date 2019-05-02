// @flow
import React, { useEffect, useState, useRef } from 'react';

import doc from '../utils';

const ContainerId = (props: { id: ?string }) => {
  const { id } = props;

  const [logs, setLogs] = useState([]);
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
          // $FlowFixMe
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
        array.push(log.toString('utf8').split('\n'));
        // $FlowFixMe
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
        logs.reverse().map(x => (
          <div key={x}>{x.slice(8)}</div>
        ))}
      </div>
    </div>
  );
};

export default ContainerId;
