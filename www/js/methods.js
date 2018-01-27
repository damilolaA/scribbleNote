exports.listener = function(target, event, cb) {
	target.addEventListener(event, cb, false);
}