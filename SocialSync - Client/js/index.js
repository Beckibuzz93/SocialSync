const {displayEvents} = require('./displayEvents');
const {showEvent} = require('./showEvent');
const loggedin = require('./is_loggedin');
const {postEvent} = require('./postEvent');

displayEvents();
loggedin();
showEvent();
postEvent();
