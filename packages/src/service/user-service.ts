import { User } from "../entity/author-entity";
import dataSource from "../config/data-source";
import { Repository } from "typeorm";
import { logger } from "../log/logger";


export interface UserInt {
    firstname: string
    lastname: string
    email: string
    password: string
}

export class UserService {
    private userRepo: Repository<User>;
    
    constructor() {
        this.userRepo = dataSource.getRepository(User);
    }

    public getUser = async (userEmail: string): Promise<User | null> => {
        try {
            const findUser = await this.userRepo.findOneBy({
                email: userEmail
            });
    
            if (findUser) {
                return findUser;
            } else {
                return null;
            }
        } catch (error) {
            logger.error('Error getting user:', error);
            return null;
        }
    }

    public createUser = async (userInfo: UserInt): Promise<User | null> => {
        try {
            const newUser = this.userRepo.create(userInfo);
            const results = await this.userRepo.save(newUser);
    
            return results;
        } catch (error) {
            logger.error('Could not create new user:', error);
            return null;
        }
    }
};