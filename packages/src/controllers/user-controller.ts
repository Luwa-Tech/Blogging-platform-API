import { Request, Response } from "express-serve-static-core";
import { matchedData } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logger } from "../log/logger";
import { UserService } from "../service/user-service";
import { accessKey, nodeEnv } from "../env-variables";

class UserHandler {
    private userService: UserService;
    constructor (userService: UserService) {
        this.userService = userService;
    }

    public registerNewUser = async (req: Request, res: Response):  Promise<void> => {
        logger.http(`Incoming POST request at ${req.path}`);
        const data = matchedData(req);

        const findUser = await this.userService.getUser(data.email);
        if (findUser) {
            logger.warn(`Registration attempt failed: Email ${data.email} already in use`);
            res.status(409).json({ "message": "Email already in use" });
            return;
        }

        try {
            const hashedPwd = await bcrypt.hash(data.password, 10);

            logger.info('Creating new user..');
            await this.userService.createUser({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: hashedPwd
            });

            logger.info("User registered successfully");
            res.status(201).json({ "message": "User created successfully" });
        } catch (err) {
            logger.error('Internal server error during user registration', err);
            res.status(500).json({ "message": "Internal server error" });
        }
    }

    public loginUser = async (req: Request, res: Response): Promise<void> => {
        logger.http(`Incoming POST request at ${req.path}`);
        const data = matchedData(req);

        const findUser = await this.userService.getUser(data.email);
        if (!findUser) {
            logger.warn(`Login attempt failed: Email ${data.email} does not exist`);
            res.status(400).json({ "message": "User does not exist" });
            return;
        }
    
        const match = await bcrypt.compare(data.password, findUser.password);
        if (!match) {
            res.status(400).json({ "message": "Incorrect password" });
            return;
        }
    
        try {
            
            if (accessKey) {
                logger.info('Create and assign token to user');
                const token = jwt.sign({ id: findUser.id }, accessKey, { expiresIn: "1h" });

                logger.info('User is logged in');
                res.cookie("access_token", token, {
                    httpOnly: true,
                    secure: nodeEnv === 'production',
                }).status(200).json({ "message": "Logged in successfully" });
            }

        } catch (err) {
            logger.error('Internal server error during user login: ', err);
            res.status(500).json({ "message": "Internal server error" });
        }
    }

    public logoutUser = async (req: Request, res: Response): Promise<void> => {
        logger.http(`Incoming GET request at ${req.path}`);

        logger.info('User logged out');
        res.clearCookie("access_token").status(200).json({"message": "logged out successfully"});
    }
}


export default UserHandler;