var express = require('express');
var sql = require('mysql');
var jade = require('jade');
var sys = require('sys');
var path = require('path');
var less = require('less');
var fs = require('fs');
var io = require('socket.io')
var util = require('util');


var app = require('express').createServer();
exports.StartSite = function() {

   app.listen(9000);
   this.StartSocket();  
}


app.get('/client',function(req,res) {
   
   var path = "/home/<user/...";
   //dosent remember why i do this. 
   res.render(path.resolve(path,"views/layout.jade"),{});

});

exports.StartSocket = function() 
{
  var clients = []; 
  var socket = io.listen(app)
  socket.on('connection', function(client) {
   
  clients.push(client);
  client.on('message',function(){ });
  client.on('disconnect',function() {}); 
   
  });

   setInterval(function() {
      for(var i = 0;i < clients.length;i++ )
      {
          clients[i].send(util.inspect(process.memoryUsage()))
      }
 
  },1000)
};


  
  
