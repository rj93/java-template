import { Connection as KafkaConnection } from './KafkaConnection';
import { Connection as MQConnection } from './MQConnection';

const connectionModuleMap = [
  {
    protocols: ['ibmmq', 'ibmmq-secure'],
    libraries: ['java'],
    module: MQConnection
  },
  {
    protocols: ['kafka', 'kafka-secure'],
    libraries: ['java'],
    module: KafkaConnection
  },
];

export default function({ asyncapi, params }) {
  const server = asyncapi.allServers().get(params.server);
  const protocol = server.protocol();
  const foundModule = connectionModuleMap.find(item => item.protocols.includes(protocol) && item.libraries.includes(params.library));
  if (!foundModule) {
    throw new Error(`This template does not currently support the protocol ${protocol} and library ${params.library}`);
  }
  return foundModule.module();
}
