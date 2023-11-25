const errorHandler = (err, req, res, next) => {
    let response = {
        message: err.message || 'Internal Server Error',
        error: err.error
    };

    if (err.retryAfter) {
        let retryAfter = err.retryAfter;
        response.retryAfter = `${retryAfter} seconds`;
    }

    res.status(err.status || 500).json(response);
}

module.exports = errorHandler;
