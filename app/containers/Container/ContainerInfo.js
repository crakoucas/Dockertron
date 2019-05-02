// @flow
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Tag } from 'antd';
import doc from '../utils';

const cpuPercentage = (
  totalUse,
  totalUsePre,
  systemeUse,
  systemeUsePre,
  PercpuUsage
) => {
  let cpuPercent = 0;
  const cpuDelta = totalUse - totalUsePre;
  const systemDelta = systemeUse - systemeUsePre;

  if (systemDelta < 0 && cpuDelta < 0) {
    cpuPercent = (cpuDelta / systemDelta) * PercpuUsage.length * 100;
  }
  return Math.floor(cpuPercent * 100) / 100;
};
function memUsage(use, limit) {
  return Math.floor((use / limit) * 10000) / 100;
}
// function maxRam(ram) {
//   return Math.floor((ram / Math.pow(1024, 3)) * 100) / 100;
// }
const ContainerInfo = (props: { id: { Id: string } }) => {
  const { id } = props;
  const { Id } = id;

  const [cpu, setCpu] = useState(0);
  const [memUsag, setMemUsage] = useState(0);

  const container = doc.getContainer(Id);

  useEffect(() => {
    container.stats({ stream: true }, (err, stream) => {
      const array = [];
      stream.on('data', chunk => {
        array.push(JSON.parse(chunk.toString('utf8')));
        if (array.length < 2) {
          return null;
        }
        const arrayReverse = array.reverse();

        const use = JSON.parse(chunk.toString('utf8')).memory_stats.usage;
        const { limit } = arrayReverse[1].memory_stats;

        const cpuContainer = arrayReverse[1].cpu_stats.cpu_usage;
        const systemeUse = arrayReverse[1].cpu_stats.system_cpu_usage;
        const totalUse = cpuContainer.total_usage;
        const PercpuUsage = cpuContainer.percpu_usage;

        const cpuPre = arrayReverse[0].cpu_stats.cpu_usage;
        const systemeUsePre = arrayReverse[0].cpu_stats.system_cpu_usage;
        const totalUsePre = cpuPre.total_usage;
        setCpu(
          cpuPercentage(
            totalUse,
            totalUsePre,
            systemeUse,
            systemeUsePre,
            PercpuUsage
          )
        );
        setMemUsage(memUsage(use, limit));
        arrayReverse.pop();
      });
    });
  });
  /* eslint no-unreachable: 2 */
  function color(percent) {
    switch (true) {
      case percent < 40:
        return '#87d068';

      case percent >= 40:
      case percent < 70:
        return '#ff9800';

      default:
        return '#f44336';
    }
  }

  return (
    <div style={{ display: 'flex', textAlign: 'center' }}>
      <Tag
        style={{ flex: 1, height: '44px', padding: '3px', fontSize: '15px' }}
        color={color(cpu)}
      >
        CPU <br />
        {cpu}%
      </Tag>
      <Tag
        style={{ flex: 1, height: '44px', padding: '3px', fontSize: '15px' }}
        color={color(memUsag)}
      >
        MEMORY <br />
        {memUsag}%
      </Tag>
    </div>
  );
};
ContainerInfo.protoTypes = {
  id: PropTypes.shape({}).isRequired
};

export default ContainerInfo;
