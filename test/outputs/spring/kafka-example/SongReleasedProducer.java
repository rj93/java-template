package com.asyncapi;
  
import java.util.logging.*;
import java.io.Serializable;
import java.util.UUID;

import com.asyncapi.ConnectionHelper;
import com.asyncapi.LoggingHelper;
import com.asyncapi.Connection;
import com.asyncapi.PubSubBase;
import com.asyncapi.models.ModelContract;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.annotation.JsonView;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
  
import com.asyncapi.models.Song;
public class SongReleasedProducer  {

    private SpringKafkaProducer producer = null;
  
  public SongReleasedProducer() {
    
    super();
    String id = "my-publisher";

    logger.info("Pub application is starting");

    // prepare connection for producer
    createConnection("song.released", id);

    producer = ch.createProducer();

  }
    public void send(ModelContract modelContract) {
        Serializable modelInstance = (Serializable) modelContract;

        try{
          // JSON encode and transmit
          ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
          String json = ow.writeValueAsString(modelInstance);

          logger.info("Sending Message: " + json);

          ProducerRecord<String, String> record = new ProducerRecord<String, String>(topicName, json);
          producer.send(record);

        }catch (Exception e){
          logger.severe("An error occured whilst attempting to send a message: " + e);
        }
    }
    public void close() {
      producer.close();
    }
  
}