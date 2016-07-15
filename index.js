var lcfn = require('lambda-cfn');
var message = lcfn.message;


module.exports = {};

module.exports.fn = function (event, callback) {
    var notification = {
        subject: 'Root user login in to the console',
        summary: 'Patrol detected that the root AWS user logged in to the console.',
        event: event
    };
    message(notification, function(err, result) {
      callback(err, result);
    });
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



