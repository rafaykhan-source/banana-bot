var url = 'http://mylogger.io/log';

function log(message) {
    // Send an https request
    console.log(message);
}

function add(num1, num2) {
    console.log(num1 + num2);
}
module.exports.addition = add;
module.exports.log = log;

// Notice how you can change the name globally
// but in the scope of this program the name is
// url, but globally it is endPoint.
// module.exports.endPoint = url;