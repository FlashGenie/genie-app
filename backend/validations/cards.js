const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateCardInput = [
    check('title')
        .exists({checkFalsy:true})
        .isLength({min: 1, max: 40})
        .withMessage('Card must have title'),
    check('body')
        .exists({checkFalsy:true})
        .isLength({min: 1, max: 250})
        .withMessage('Body must not be empty'),
    check('author')
        .exists({checkFalsy:true})
        .withMessage('Author is required'),
    check('category')
        .exists({checkFalsy:true})
        .withMessage('Category is required'),

    handleValidationErrors
];

module.exports = validateCardInput;