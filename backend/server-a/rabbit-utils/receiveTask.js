#!/usr/bin/env node
// Process tasks from the work queue

'use strict';

var amqp = require('amqplib');
var dbOrder = require('../db/dbOrder');

module.exports.getTask = function(rabbitHost, queueName){
  amqp.connect('amqp://' + rabbitHost).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
      var ok = ch.assertQueue(queueName, {durable: true});
      ok = ok.then(function() { ch.prefetch(1); });
      ok = ok.then(function() {
        ch.consume(queueName, doWork, {noAck: false});
        console.log(" [*] Waiting for messages. To exit press CTRL+C");
      });
      return ok;

      function promiseJson(content) {
        return new Promise((resolve, reject) =>{
          try {
            // content = content.replace(/\\\"/g, "'");
            console.log("content before parsing", content);
            var parsed = JSON.parse(content);
            console.log("parsed:", parsed);
            resolve(parsed);
          } catch(err) {
            reject(err);
          }
        })
      }

      function doWork(msg) {
        var body = msg.content.toString();
        promiseJson(body).then((result) => {
          console.log("Body after parsing", JSON.parse(result));
          var objResult = JSON.parse(result);
          console.log(objResult.id, objResult.status);
          dbOrder.dbUpdateOrderById(objResult['id'], objResult['status']);  
        }).catch((err) => {console.log("Error parsing", err)});
        var secs = body.split('.').length - 1;
        //console.log(" [x] Task takes %d seconds", secs);
        setTimeout(function() {
          console.log(" [x] Done - Server a");
          ch.ack(msg);
        }, secs * 1000);
      }
    });
  }).catch(console.warn);
}
