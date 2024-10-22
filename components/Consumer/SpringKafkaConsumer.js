/*
* (c) Copyright IBM Corporation 2021
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import { toJavaClassName } from '../../utils/String.utils';

export function ConsumerDeclaration() {
  return `
  private final String channelName;
  `;
}

export function ConsumerImports({ params, message }) {
  const id = message.id() || message.name();
  return `
import ${params.package}.PubSubBase;
import ${params.package}.models.ModelContract;
import ${params.package}.models.${toJavaClassName(id)};

import org.springframework.kafka.annotation.KafkaConsumer;
`;
}

export function ReceiveMessage({ message }) {
  const id = message.id() || message.name();
  let groupId = '';
  if (message.groupId) {
    groupId = `, groupId = "${message.groupId}"`;
  }
  return `
  @KafkaConsumer(topics = channelName ${groupId})
  public void receive(${toJavaClassName(id)} ${id}) {
    logger.info("Received message type: " + receivedObject.getClass().getName());
    }
  }
  `;
}

export function ConsumerConstructor({ name }) {
  return `
    super();
    this.channelName = "${name}";
  `;
}

export function ConsumerClose() {
  return '';
}
