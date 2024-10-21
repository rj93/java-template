import * as MQConsumer from './MQConsumer';
import * as KafkaConsumer from './KafkaConsumer';
import * as SpringKafkaConsumer from './SpringKafkaConsumer';

const consumerModuleMap = [
  {
    protocols: ['ibmmq', 'ibmmq-secure'],
    libraries: ['java'],
    module: MQConsumer
  },
  {
    protocols: ['kafka', 'kafka-secure'],
    libraries: ['java'],
    module: KafkaConsumer
  },
  {
    protocols: ['kafka', 'kafka-secure'],
    libraries: ['spring'],
    module: SpringKafkaConsumer
  }
];

function getModule({ asyncapi, params }) {
  const server = asyncapi.allServers().get(params.server);
  const protocol = server.protocol();
  const foundModule = consumerModuleMap.find(item => item.protocols.includes(protocol) && item.libraries.includes(params.library));
  if (!foundModule) {
    throw new Error(`This template does not currently support the protocol ${protocol} and library ${params.library}`);
  }
  return foundModule.module;
}

export function ConsumerDeclaration({ asyncapi, params }) {
  return getModule({ asyncapi, params }).ConsumerDeclaration();
}
export function ConsumerImports({ asyncapi, params, message }) {
  return getModule({ asyncapi, params }).ConsumerImports({ asyncapi, params, message });
}
export function ReceiveMessage({ asyncapi, params, message }) {
  return getModule({ asyncapi, params }).ReceiveMessage({ message });
}
export function ConsumerClose({ asyncapi, params }) {
  return getModule({ asyncapi, params }).ConsumerClose();
}
export function ConsumerConstructor({ asyncapi, params, name }) {
  return getModule({ asyncapi, params }).ConsumerConstructor({ name });
}
