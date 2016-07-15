var lcfn = require('lambda-cfn');
var message = lcfn.message;


module.exports = {};

var m = module.exports;

module.exports.fn = function (event, callback) {
    if (m.isRootNotValid(event)) {
        var notification = {
            subject: 'Root user login in to the console',
            summary: 'Patrol detected that the root AWS user logged in to the console.',
            event: event
        };
        message(notification, function (err, result) {
            callback(err, result);
        });
    }else if (m.isRoot(event) || m.isOtherUser(event)) {
        callback(null,'');  
    }
};
module.exports.isRoot = function (event) {//OFICINA - NO MENSAJE
    var userDetail = event.detail;
    return userDetail.userIdentity.userName === 'root' 
           && userDetail.sourceIPAddress === '192.168.1.120';
};
module.exports.isRootNotValid = function (event) {//DESCONOCIDO - MENSAJE
    var userDetail = event.detail;
    return userDetail.userIdentity.userName === 'root' 
           && userDetail.sourceIPAddress !== '127.0.0.1';
};
module.exports.isOtherUser = function (event) {//NO MENSAJE
    var userName = event.detail.userIdentity.userName;
    return userName === 'other';
};

module.exports.config = {
    name: 'rootLogin',
    eventRule: {
        eventPattern: {
            'detail-type': [
                'AWS API Call via CloudTrail'
            ],
            detail: {
                eventSource: [
                    'sigin.amazonaws.com'
                ],
                eventName: [
                    'ConsoleLogin'
                ]
            }
        }
    }
};



