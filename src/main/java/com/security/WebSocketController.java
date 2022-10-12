package com.security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@EnableScheduling
@Controller
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/oz-websocket")
    @SendTo("/topic/events")
    public Event eventSync(InMessage message) throws Exception {
        //Thread.sleep(1000); // simulated delay
        return new Event("Evento" + HtmlUtils.htmlEscape(message.getRequest()),2022,9,15);
    }

    //Funciona!
    /*
    @Scheduled(fixedRate = 5000)
    public void periodo(){
        this.template.convertAndSend("/topic/events", new Event("nombre",2022,9,30));
    }*/
}
