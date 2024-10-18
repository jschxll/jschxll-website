+++
title = "Smart Home plasma ball"
date = "2024-08-12T10:34:13+02:00"
description = "I recently decided to integrate my plasma ball into my smart home system. Why? Honestly, I just thought it would be a fun experiment, though it turned out to be a lot more challenging than expected, especially since I lack much experience with soldering and electrical engineering. Perfect conditions for such a project, right?"

tags = ["raspi5","docker","homeserver","linux"]
+++

So, yeah, I guess I don't need to add much more than the title already reveals: I built a smarthome integration for my plasma ball. Why? I don't know, I thought it would be a fun idea, but in the end it got much worse than I thought, because I don't have really a good practice in soldering and electrical engineering. Good conditions, to start such a project, I think.

### The Hardware & idea

But how could I do it? After a bit of research and thinking, I got the idea of letting the plasma ball communicating over the MQTT protocol with a broker (my raspberry pie 5), which has on top a docker container running a Node Red web-dashboard, that make it possible to control the plasma ball via an on/off switch.

Here's a diagram to visualize the process:

![Smart Home plasma ball diagram](/images/smart_home_plasma_ball_diagram.drawio.png)
(Made with draw.io)

When the on/off message is sent to the broker, it will publish the message to the channel, where the client (the ESP) is subscribed to. Then, the microcontroller sends a digital signal to the Gate pin of a MOSFET, to establish a connection between the Drain and Source pin, which is in turn connected to a 5V battery.

The reason, I built it with a MOSFET, rather than connecting the battery directly to the ESP is because of the maximal voltage the power pin of the ESP can endure (max: 3.3V), before shutting the microcontroller down. On the other hand, the tranformer in the plasma ball needs 5V to power on, so I had to find a way to regulate the power between the two consumers.

Although, the ESP8266 can run with 5V, it is only possible with the micro USB port, which assumes that I have a battery with a USB port, which I don't have. I could easily use a powerbank, but it would be too big, to fit in the original case of the plasma ball. So I stuck with the MOSFET.

### Software configuration

After a way too long time soldering all components together and five times questioning my life decisions. I finally made it work!!

Now, it's time to deal with the software. At first, I wrote a docker compose file with two services: Mosquitto and Node Red, which are communicating with each other in the docker host network. That makes the communication between the Node Red instance and the Mosquitto instance a lot easier. In Node Red, I installed the nodered-dashboard palette, to get dashboard components, like switches or diagrams. I made quickly via drag and drop a diagram with a switch and a MQTT-out-component, that publishes messages (true/false) to the subscribed channel of the ESP.

In the Mosquitto instance, I edited the configuration file to allow connections outside the localhost so that the ESP can connect to it.

In the end, it looks like this:

docker-compose.yml:

```yml
services:
  mosquitto:
    image: eclipse-mosquitto
    container_name: mosquitto
    ports:
      - 1883:1883
      - 9001:9001
    extra_hosts:
      - "host.docker.internal:host-gateway"
    volumes:
      - ./mosquitto/config/mosquitto.conf:/mosquitto/config/mosquitto.config
    restart: unless-stopped

  node-red:
    image: nodered/node-red
    container_name: node-red
    user: "0:0"
    ports:
      - 1880:1880
    extra_hosts:
      - "host.docker.internal:host-gateway"
    volumes:
      - ./node_red_data:/data
    restart: unless-stopped
volumes:
  data:
  log:
```

mosquitto.conf:

```bash
allow_anonymous true
listener 1883
persistence true
persistence_location /mosquitto/data
log_dest file /mosquitto/log/mosquitto.log
```

The only thing left over, was to deploy the Node Red dashboard in my network.
