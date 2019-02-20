/* logic to generete control cmd   */
const { crc16modbus } = require('crc');
const motor_on_cmd='01013144E0';
const motor_off_cmd='0101308421';
const pre_buffer=Buffer.from("020D", "hex");

/* phone_number is from user input */
const phone_number='+1,4102362292';

function getPhoneNumerCmd(phone_number) {
 phone_buffer = Buffer.from(phone_number);
 totalLength = pre_buffer.length + phone_buffer.length;
 bufA = Buffer.concat([pre_buffer, phone_buffer], totalLength);
 let res=crc16modbus(bufA).toString(16);
 crc16_buf=Buffer.from(res, "hex");
 finalLength = bufA.length + crc16_buf.length;
 bufF = Buffer.concat([bufA, crc16_buf], finalLength);
 final=bufF.toString('hex');
  return final;
}

/* logic for mqtt publish  */

var mqtt = require('mqtt')

var client = new mqtt.connect("mqtt://umqtt.sbdconnect.io:1883");


client.on('connect', function () {
  client.subscribe('868714047560153', function (err) {
    if (!err) {
      client.publish('868714047560153', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})
