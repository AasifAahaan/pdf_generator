import { check } from 'express-validator';

export const registerValidation = [
  check('name', 'Name is required').notEmpty().withMessage('Name field is required'),
  check('email', 'Please include a valid email')
    .isEmail()
    .withMessage('Email must be a valid format')
    .notEmpty()
    .withMessage('Email is required'),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

export const loginValidation = [
  check('email', 'Please include a valid email').isEmail().notEmpty(),
  check('password', 'Password is required').notEmpty()
];