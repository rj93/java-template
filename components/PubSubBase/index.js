import * as MQPubSubBase from './MQPubSubBase';
import * as KafkaPubSubBase from './KafkaPubSubBase';

const pubSubModuleMap = [
  {
    protocols: ['ibmmq', 'ibmmq-secure'],
    libraries: ['java', 'spring'],
    module: MQPubSubBase
  },
  {
    protocols: ['kafka', 'kafka-secure'],
    libraries: ['java', 'spring'],
    module: KafkaPubSubBase
  }
];

function getModule({ asyncapi, params }) {
  const protocol = asyncapi.server(params.server).protocol();
  const foundModule = pubSubModuleMap.find(item => item.protocols.includes(protocol) && item.libraries.includes(params.library));
  if (!foundModule) {
    throw new Error(`This template does not currently support the protocol ${protocol} and library ${params.library}`);
  }
  return foundModule.module;
}

export function PubSubBase(asyncapi, params) {
  return getModule({ asyncapi, params }).PubSubBase(params);
}
