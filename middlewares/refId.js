const getRefId = () => {
	return 'Id-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
};

const refId = (req, res, next) => {
    const refId = req.headers['refid'] || req.headers['meta-transid'] || getRefId();
    res.locals.refId = refId;
    next();
};

module.exports = refId;