#include <Wire.h>
#include <SFE_MMA8452Q.h>

MMA8452Q acelerometro(0x1C);

void setup() {
  Serial.begin(9600);
  acelerometro.init(SCALE_2G, ODR_50);
}

void loop() {
  if (acelerometro.available()) {
    acelerometro.read();
    printCalculatedAccels();
    delay(50);
  }
}

void printCalculatedAccels() {
  Serial.print(acelerometro.cx, 3);
  Serial.print(",");
  Serial.print(acelerometro.cy, 3);
  Serial.print(",");
  Serial.print(acelerometro.cz, 3);
  Serial.print("\n");
}