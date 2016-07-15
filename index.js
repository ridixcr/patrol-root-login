var lcfn = require('lambda-cfn');
var message = lcfn.message;


module.exports = {};

var m = module.exports;

module.exports.fn = function (event, callback) {
    if (m.isRoot(event)) {
        var notification = {
            subject: 'Root user login in to the console',
            summary: 'Patrol detected that the root AWS user logged in to the console.',
            event: event
        };
        message(notification, function (err, result) {
            callback(err, result);
        });
    } else if (m.isOtherUser(event)) {
        var notification = {
            subject: 'Other user login in to the console',
            summary: 'Patrol detected that the other AWS user logged in to the console.',
            event: event
        };
        message(notification, function (err, result) {
            callback(err, result);
        });        
    }else{
        callback();
    }
};
module.exports.isRoot = function (event) {
    var userName = event.detail.userIdentity.userName;
    return userName === 'root';
};
module.exports.isOtherUser = function (event) {
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



