module.exports = async (req, res, next) => {
    try {
        return res.json({
            'status': status
        })
    } catch (error) {
        next(error)
    }
};