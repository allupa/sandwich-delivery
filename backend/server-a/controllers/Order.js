'use strict';

var utils = require('../utils/writer.js');
var Order = require('../service/OrderService');
var sendTask = require('../rabbit-utils/sendTask.js');
var receiveTask = require('../rabbit-utils/receiveTask.js');
var dbOrder = require('../db/dbOrder.js');

module.exports.addOrder = function addOrder (req, res, next) {
  var order = req.swagger.params['order'].value;
  Order.addOrder(order)
    .then(function (response) {
      utils.writeJson(res, response);
      console.log("Adding order", order);
      sendTask.addTask("rapid-runner-rabbit", "received-orders", order);
      dbOrder.dbAddOrder(order);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrderById = function getOrderById (req, res, next) {
  var orderId = req.swagger.params['orderId'].value;
  Order.getOrderById(orderId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrders = function getOrders (req, res, next) {
  Order.getOrders()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.orderOptions = function orderOptions (req, res, next) {
  console.log(req.payload);
  Order.orderOptions()
  .then(function (response) {
    console.log("Options being resolved");
    res.writeHead(200);
    res.end();
  })
  .catch(function (response) {
    res.writeHead(400);
    res.end();
  });}

  receiveTask.getTask('rapid-runner-rabbit', 'completed-orders');