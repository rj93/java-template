import { Readme as KafkaReadme } from './KafkaReadme';
import { Readme as MQReadme } from './MQReadme';

const readmeModuleMap = [
  {
    protocols: ['ibmmq', 'ibmmq-secure'],
    libraries: ['java', 'spring'],
    module: MQReadme
  },
  {
    protocols: ['kafka', 'kafka-secure'],
    libraries: ['java', 'spring'],
    module: KafkaReadme
  }
];

export default function({ asyncapi, params }) {
  const server = asyncapi.allServers().get(params.server);
  const protocol = server.protocol();
  const foundModule = readmeModuleMap.find(item => item.protocols.includes(protocol) && item.libraries.includes(params.library));
  if (!foundModule) {
    throw new Error(`This template does not currently support the protocol ${protocol} and library ${params.library}`);
  }
  return foundModule.module({ asyncapi, params });
}
