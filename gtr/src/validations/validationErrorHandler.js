

const validationErrorHandler = (errors) => {

    errors.map(err => {
        const { local } = err;
        switch (err.code) {
            case "any.empty":
                err.message = `${local.label} should not be empty!`;
                break;
            case "any.required":
                err.message = `${local.label} should not be empty!`;
                break;

            default:
                break;
        }
    });
    return errors;
}

module.exports = { validationErrorHandler }