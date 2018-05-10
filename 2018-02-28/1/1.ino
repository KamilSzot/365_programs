/* LedStripGradient: Example Arduino sketch that shows
 * how to control an Addressable RGB LED Strip from Pololu.
 *
 * To use this, you will need to plug an Addressable RGB LED
 * strip from Pololu into pin 12.  After uploading the sketch,
 * you should see a pattern on the LED strip that fades from
 * green to pink and also moves along the strip.
 */

#include <PololuLedStrip.h>

// Create an ledStrip object and specify the pin it will use.
PololuLedStrip<2> ledStrip;

// Create a buffer for holding the colors (3 bytes per color).
#define LED_COUNT 30
#define LED_GROUP 6
rgb_color colors[LED_COUNT];

unsigned long t0;
float t;

struct  { int r, g, b; } tint;

void makeTint() {
  int total = 255;
  tint.b = random(total+1);
  tint.g = random(total - tint.b+1);
  tint.r = total - tint.b - tint.g;
}

void setup()
{
  t0 = millis();
  makeTint();
}
 
bool lit = false;
float x, v, a = 40;

float sqr(float a) {
  return a*a;
}

float clamp(float a, float low, float high) {
    if(a < low) return low;
    if(a > high) return high;
    return a;
}

float droplet(float dx) {
  if(dx < -1.0 || dx > 1.0) return 0.0;
  return clamp((1-dx)*sqrt(1-sqr(dx)) / (3*sqrt(3)/4), 0.0, 1.0);
}

#include <math.h> 

void loop()
{
  t = fmod(millis() - t0, 5000)/1000.0;
  x = a*t*t/2;

  if(x>=LED_COUNT*3) {
    makeTint();
  }
  
  for (uint16_t i = 0; i < LED_COUNT; i++)
  {
    float b=6.0;
    float dx = (x-(float)i - b)/b*2+1;
    
    float v = droplet(dx);
    colors[i] = rgb_color(v*tint.r, v*tint.g, v*tint.b);
  }
  ledStrip.write(colors, LED_COUNT);
  
//  delay(1);

//  lit = !lit;
//  digitalWrite(LED_BUILTIN, lit ? HIGH : LOW);
}


