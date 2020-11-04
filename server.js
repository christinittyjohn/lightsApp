var fs = require('fs'); //require filesystem module
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
const http = require('http');

http
  .createServer((request, response) => {
    if (request.method === 'GET') {
      const status = LED.readSync();
      response.end(status.toString());
    }
    if (request.method === 'POST') {
      console.log('GOT POST');
      let body = [];
      request
        .on('data', (chunk) => {
          body.push(chunk);
        })
        .on('end', () => {
          body = Buffer.concat(body).toString();
          const lightvalue = JSON.parse(body);
          console.log('light is ---->', LED.readSync(), {lightvalue});
          if (lightvalue != LED.readSync()) {
            //only change LED if status has changed
            console.log('WRITING', {lightvalue}, LED.readSync());
            LED.writeSync(lightvalue); //turn LED on or off
          }
          response.end(body);
        });
    } else {
      response.statusCode = 404;
      response.end();
    }
  })
  .listen(8080);

process.on('SIGINT', function () {
  //on ctrl+c
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  process.exit(); //exit completely
});
