import { ConnectionHelper as KafkaConnectionHelper } from './KafkaConnectionHelper';
import { ConnectionHelper as MQConnectionHelper } from './MQConnectionHelper';
import { ConnectionHelper as NoOpConnectionHelper } from './NoOpConnectionHelper';

const connectionModuleMap = [
  {
    protocols: ['ibmmq', 'ibmmq-secure'],
    libraries: ['java'],
    module: MQConnectionHelper
  },
  {
    protocols: ['kafka', 'kafka-secure'],
    libraries: ['java'],
    module: KafkaConnectionHelper
  },
  {
    protocols: ['ibmmq', 'ibmmq-secure', 'kafka', 'kafka-secure'],
    libraries: ['spring'],
    module: NoOpConnectionHelper
  }
];

export default function({ asyncapi, params }) {
  const server = asyncapi.allServers().get(params.server);
  const protocol = server.protocol();
  const foundModule = connectionModuleMap.find(item => item.protocols.includes(protocol) && item.libraries.includes(params.library));
  if (!foundModule) {
    throw new Error(`This template does not currently support the protocol ${protocol} and library ${params.library}`);
  }
  return foundModule.module({ asyncapi, params });
}
