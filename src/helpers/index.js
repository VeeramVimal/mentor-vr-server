const successResponse = (req, res, data, code = 200) => {
    res.send({
        code,
        data,
        success: true
    })
}

const errorResponse = (req, res, errorMessage = 'something went wrong', code = 500, error={}) => {
    res.send({
        code,
        errorMessage,
        error,
        data: null,
        success: false
    });
}

module.exports = {
    successResponse,
    errorResponse
}