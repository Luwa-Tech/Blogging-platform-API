import express from 'express';
import UserController from '../controllers/user-controller';
import { UserService } from '../service/user-service';
import { 
    validateRequestBody, 
    validateUserLogin,
    validateNewUser
} from '../middleware/validate-req-body';
const router = express.Router();

const userService = new UserService();
const userController = new UserController(userService);

router.post('/register', validateRequestBody(validateNewUser), userController.registerNewUser)
router.post('/login', validateRequestBody(validateUserLogin), userController.loginUser)
router.get('/logout', userController.logoutUser)

export default router;