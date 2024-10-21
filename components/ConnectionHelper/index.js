import { ConnectionHelper as KafkaConnectionHelper } from './KafkaConnectionHelper';
import { ConnectionHelper as MQConnectionHelper } from './MQConnectionHelper';

const connectionModuleMap = [
  {
    protocols: ['ibmmq', 'ibmmq-secure'],
    libraries: ['java', 'spring'],
    module: MQConnectionHelper
  },
  {
    protocols: ['kafka', 'kafka-secure'],
    libraries: ['java', 'spring'],
    module: KafkaConnectionHelper
  }
];

export default function({ asyncapi, params }) {
  const protocol = asyncapi.server(params.server).protocol();
  const foundModule = connectionModuleMap.find(item => item.protocols.includes(protocol) && item.libraries.includes(params.library));
  if (!foundModule) {
    throw new Error(`This template does not currently support the protocol ${protocol} and library ${params.library}`);
  }
  return foundModule.module({ asyncapi, params });
}
