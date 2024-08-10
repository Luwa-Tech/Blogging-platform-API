import { body, ContextRunner } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateNewUser = [
  body('firstname').isString().escape().withMessage('firstname is required'),
  body('lastname').isString().escape().withMessage('lastname is required'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

export const validateUserLogin = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

/* 
    In consideration of a backend security, valdiation should be added
    when creating new post.
*/
// export const ValidateNewArticle = [
//   body('title').escape(),
//   body('content').escape(),
//   body('tags').escape()
// ];

export const validateRequestBody = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // sequential processing, stops running validations chain if one fails.
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
    }

    next();
  };
}; 