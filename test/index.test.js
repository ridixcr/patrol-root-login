var tape = require('tape');
var rule = require('../index.js');

tape('Logeo de root detectado', function (t) {
    var rootLoginEvent = require('./fixtures/rootLoginEvent.json');
    rule.fn(rootLoginEvent,function (err,message){
        t.ok(message.subject,'Detected root user login');
        //alert(rootLoginEvent.detail.userIdentity.userName);
        //console.log(rootLoginEvent.detail.userIdentity.userName);
        //t.equal(message.subject,'Root user login in to the console','Detected root user login');        
        t.end();
    });
});
tape('Logeo de otro usuario detectado', function (t) {
    var rootLoginEvent = require('./fixtures/otherUserLoginEvent.json');
    rule.fn(rootLoginEvent,function (err,message){
        t.ok(message.subject,'Detected other user login');    
        t.end();
    });
});
