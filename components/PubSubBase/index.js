import * as MQPubSubBase from './MQPubSubBase';
import * as KafkaPubSubBase from './KafkaPubSubBase';
import * as NoOpPubSubBase from './NoOpPubSubBase';

const pubSubModuleMap = [
  {
    protocols: ['ibmmq', 'ibmmq-secure'],
    libraries: ['java'],
    module: MQPubSubBase
  },
  {
    protocols: ['kafka', 'kafka-secure'],
    libraries: ['java'],
    module: KafkaPubSubBase
  },
  {
    protocols: ['ibmmq', 'ibmmq-secure', 'kafka', 'kafka-secure'],
    libraries: ['spring'],
    module: NoOpPubSubBase
  }
];

function getModule({ asyncapi, params }) {
  const server = asyncapi.allServers().get(params.server);
  const protocol = server.protocol();
  const foundModule = pubSubModuleMap.find(item => item.protocols.includes(protocol) && item.libraries.includes(params.library));
  if (!foundModule) {
    throw new Error(`This template does not currently support the protocol ${protocol} and library ${params.library}`);
  }
  return foundModule.module;
}

export function PubSubBase(asyncapi, params) {
  return getModule({ asyncapi, params }).PubSubBase(params);
}
