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

float t;


typedef struct tint { int r, g, b; } tint;

tint makeTint() {
  int total = 150;
  tint t;
  t.b = random(total+1);
  t.g = random(total - t.b+1);
  t.r = total - t.b - t.g;
  return t;
}

 
bool lit = false;

float sqr(float a) {
  return a*a;
}

float clamp(float a, float low, float high) {
    if(a < low) return low;
    if(a > high) return high;
    return a;
}

float dropletFn(float dx) {
  if(dx < -1.0 || dx > 1.0) return 0.0;
  return clamp((1-dx)*sqrt(1-sqr(dx)) / (3*sqrt(3)/4), 0.0, 1.0);
}

#include <math.h> 

typedef struct droplet {
  unsigned long t0;
  struct tint t, t2;
  float a;
} droplet;

droplet droplets[10];
int dropletsCount = 0;

void createDroplet(int offset = 0) {
  droplets[dropletsCount].t0 = millis()+offset*1000;
  droplets[dropletsCount].t = makeTint();
  droplets[dropletsCount].t2 = makeTint();
  droplets[dropletsCount].a = random(10, 50);
  dropletsCount++;  
}

void drawDroplet(struct droplet &d, rgb_color* canvas) {
  float t = fmod(millis() - d.t0, 5000)/1000.0;
  float x = d.a*t*t/2;
  
  for (uint16_t i = 0; i < LED_COUNT; i++)
  {
    float b=6.0;
    float dx = (x-(float)i - b)/b*2+1;
    
    float v = dropletFn(dx);
    canvas[i] = rgb_color(canvas[i].red + v*(v*d.t.r+(1.0-v)*d.t2.r), canvas[i].green + v*(v*d.t.g + (1.0-v)*d.t2.g), canvas[i].blue + v*(v*d.t.b + (1.0-v)*d.t2.b));
  }
}

void drawDroplets() {
  clear(colors);
  for(int i = 0; i < dropletsCount; i++) {
    drawDroplet(droplets[i], colors);
  }
}

void clear(rgb_color *canvas) {
  for (uint16_t i = 0; i < LED_COUNT; i++)
  {
    canvas[i] = rgb_color(0, 0, 0);
  }  
}

void loop()
{

  drawDroplets();
  
  ledStrip.write(colors, LED_COUNT);
  
//  delay(1);

//  lit = !lit;
//  digitalWrite(LED_BUILTIN, lit ? HIGH : LOW);
}

void setup()
{
  randomSeed(analogRead(0));
  createDroplet();
  createDroplet(1);
  createDroplet(2);
  createDroplet(3);
}

