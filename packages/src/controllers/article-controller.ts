import ArticleService from "../service/article-service";
import { Request, Response } from "express-serve-static-core";
// import { matchedData } from "express-validator";
import { logger } from "../log/logger";
import { UserService } from "../service/user-service";

class ArticleController {
    private articleService: ArticleService;
    private userService: UserService;

    constructor(articleService: ArticleService, userService: UserService) {
        this.articleService = articleService;
        this.userService = userService;
    }

     public create = async (req: Request, res: Response): Promise<void> => {
        logger.http(`Incoming POST request at ${req.path}`);
        // const articleInfo = req.body;
        const user = req?.user;
        console.log(user)

        const findUser = await this.userService.getUserById(parseInt(user?.id));
        if (!findUser) {
            logger.warn('User is not found');
            res.status(400).json({ 'message': 'User does not exist' });
            return;
        };

        try {
            const result = await this.articleService.createArticle(findUser);

            logger.info('New article created successfully');
            res.status(201).json({'message': 'New article created', result});

        } catch (error) {
            logger.error('Encountered an error creating article: ', error);
            res.status(500).json({ 'message': 'Internal server error' })
        } 
    }

    public delete = async (req: Request, res: Response): Promise<void> => {
        logger.http(`Incoming DELETE request at ${req.path}`);
        const userId = parseInt(req?.user?.id);
        const articleId = parseInt(req.params.id);

        try {
            logger.info(`Deleting article ${articleId} for user ${userId}`);
            const article = await this.articleService.deleteArticle(articleId, userId);

            if (article === null) {
                res.status(204).json({'message': 'Article not in database'});
            }

            logger.info(`Article with id ${articleId} for user ${userId} has been deleted`);
            res.status(200).json({'message': 'Article deleted successfully'});
        } catch (error) {
            logger.error('Error deleting article: ', error);
            res.status(500).json({'message': 'Internal server error'});
        }

    }

    /*
    Structure of data that should be sent from client
        interface updatedInfoInt {
            title: string
            content: string
            tags: string[]
        }
    */
    public update = async (req: Request, res: Response): Promise<void> => {
        logger.http(`Incoming PUT request at ${req.path}`);
        const updatedInfo = req.body;
        const userId = parseInt(req?.user?.id);
        const articleId = parseInt(req.params.id);

        try {
            logger.info(`Updating article ${articleId} for user ${userId}`);
            await this.articleService.updateArticle(articleId, updatedInfo);

            logger.info(`Article with id ${articleId} for user ${userId} has been updated`);
            res.status(200).json({'message': 'Article updated successfully'});
        } catch (error) {
            logger.error(`Error updating article with id ${articleId}: `, error);
            res.status(500).json({'message': 'Internal server error'});
        }
    }

    public getOne = async (req: Request, res: Response): Promise<void> => {
        logger.http(`Incoming GET request at ${req.path}`);
        const articleId = parseInt(req.params.id);

        try {
            logger.info(`Getting article with id: ${articleId}`);
            const article = await this.articleService.getArticleByID(articleId);

            res.status(200).json(article);
        } catch (error) {
            logger.error(`Error getting article with id ${articleId}: `, error);
            res.status(500).json({'message': 'Internal server error'});
        }
    }

    public getAllByUserId = async (req: Request, res: Response): Promise<void> => {
        logger.http(`Incoming GET request at ${req.path}`);
        const userId = parseInt(req?.user?.id);

        try {
            logger.info(`Getting all articles for user with id: ${userId}`);
            const articles = await this.articleService.getAllUserArticles(userId);

            res.status(200).json(articles);
        } catch (error) {
            logger.error('Error getting all user articles', error);
            res.status(500).json({'message': 'Internal server error'});
        }
    }

}

export default ArticleController;