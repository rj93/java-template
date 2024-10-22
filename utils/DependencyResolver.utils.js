const dependencyMap = [
  {
    protocols: ['ibmmq', 'ibmmq-secure'],
    libraries: 'java',
    dependencies: [
      { groupId: 'com.ibm.mq', artifactId: 'com.ibm.mq.allclient', version: '9.2.3.0' }
    ]
  },
  {
    protocols: ['kafka', 'kafka-secure'],
    libraries: 'java',
    dependencies: [
      { groupId: 'org.apache.kafka', artifactId: 'kafka-clients', version: '2.8.0' }
    ]
  },
  {
    protocols: ['ibmmq', 'ibmmq-secure'],
    libraries: 'spring',
    dependencies: [
      { groupId: 'com.ibm.mq', artifactId: 'mq-jms-spring-boot-starter', version: '3.3.1' }
    ]
  },
  {
    protocols: ['kafka', 'kafka-secure'],
    libraries: 'spring',
    dependencies: [
      { groupId: 'org.springframework.kafka', artifactId: 'spring-kafka', version: '3.2.4' }
    ]
  },
];

export function resolveDependencies(protocol, library) {
  const foundMapping = dependencyMap.find(item => item.protocols.includes(protocol) && item.libraries.includes(library));

  if (!foundMapping) {
    // This will never throw if the protocols in package.json match the dependency map above
    throw new Error(`This template does not currently support the protocol ${protocol} and library ${library}`);
  }

  return foundMapping.dependencies;
}