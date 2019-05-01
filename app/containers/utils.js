// @flow
import Docker from 'dockerode';

const doc = new Docker({ socketPath: '/var/run/docker.sock' });
export default doc;
