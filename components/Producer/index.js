import * as MQProducer from './MQProducer';
import * as KafkaProducer from './KafkaProducer';
import * as SpringKafkaProducer from './SpringKafkaProducer';

const producerModuleMap = [
  {
    protocols: ['ibmmq', 'ibmmq-secure'],
    libraries: ['java'],
    module: MQProducer
  },
  {
    protocols: ['kafka', 'kafka-secure'],
    libraries: ['java'],
    module: KafkaProducer
  },
  {
    protocols: ['kafka', 'kafka-secure'],
    libraries: ['spring'],
    module: SpringKafkaProducer
  }
];

function getModule({ asyncapi, params }) {
  const protocol = asyncapi.server(params.server).protocol();
  const foundModule = producerModuleMap.find(item => item.protocols.includes(protocol) && item.libraries.includes(params.library));
  if (!foundModule) {
    throw new Error(`This template does not currently support the protocol ${protocol} and library ${params.library}`);
  }
  return foundModule.module;
}

export function SendMessage({ asyncapi, params }) {
  return getModule({ asyncapi, params }).SendMessage();
}
export function ProducerImports({ asyncapi, params }) {
  return getModule({ asyncapi, params }).ProducerImports({ params });
}
export function ProducerDeclaration({ asyncapi, params }) {
  return getModule({ asyncapi, params }).ProducerDeclaration();
}
export function ProducerClose({ asyncapi, params }) {
  return getModule({ asyncapi, params }).ProducerClose();
}
export function ProducerConstructor({ asyncapi, params, name }) {
  return getModule({ asyncapi, params }).ProducerConstructor({ name });
}
