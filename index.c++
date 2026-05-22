#include <ESP8266WiFi.h>

const char* ssid = "YOUR_WIFI";
const char* password = "YOUR_PASSWORD";

String apiKey = "YOUR_WRITE_API_KEY";
const char* server = "api.thingspeak.com";

WiFiClient client;
int sensorPin = A0;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}

void loop() {
  int value = analogRead(sensorPin);
  float voltage = value * (3.3 / 1023.0);

  if (client.connect(server, 80)) {
    String url = "/update?api_key=" + apiKey + "&field1=" + voltage;

    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                 "Host: " + server + "\r\n" +
                 "Connection: close\r\n\r\n");
  }

  client.stop();
  delay(15000);
}