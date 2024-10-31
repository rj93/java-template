package com.asyncapi;
  
import com.asyncapi.PubSubBase;
import com.asyncapi.models.ModelContract;
import com.asyncapi.models.Song;

import org.springframework.kafka.annotation.KafkaConsumer;

public class SongReleasedSubscriber  extends PubSubBase{

  private final String channelName;
  
  public SongReleasedSubscriber() {
    
    super();
    this.channelName = "song.released";
  
  }
  @KafkaConsumer(topics = channelName )
  public void receive(Song song) {
    logger.info("Received message type: " + receivedObject.getClass().getName());
    }
  }
  
}