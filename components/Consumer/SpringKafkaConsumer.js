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
  return `
import java.time.Duration;
import java.util.logging.*;
import java.io.Serializable;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.annotation.JsonView;

import ${params.package}.ConnectionHelper;
import ${params.package}.LoggingHelper;
import ${params.package}.Connection;
import ${params.package}.PubSubBase;

import ${params.package}.models.ModelContract;
import ${params.package}.models.${toJavaClassName(message.uid())};

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
`;
}

export function ReceiveMessage({ message }) {
  let groupId = '';
  if (message.groupId) {
    groupId = `, groupId = "${message.groupId}"`;
  }
  return `
  @KafkaConsumer(topics = channelName ${groupId})
  public void receive(${toJavaClassName(message.uid())} ${message.uid()}) {
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
