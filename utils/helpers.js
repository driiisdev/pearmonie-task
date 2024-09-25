const sendResponse = (res, status, message, data = null) => {
    return res.status(status).json({ message, data });
};

const sendError = (res, status, message, error) => {
    return res.status(status).json({ message, error });
};

module.exports = {
    sendResponse,
    sendError,
}
