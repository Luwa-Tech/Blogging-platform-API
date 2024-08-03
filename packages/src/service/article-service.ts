import { Article } from "../entity/article-entity";
import dataSource from "../config/data-source";
import { Status } from "../entity/status-entity";
import { User } from "../entity/author-entity";
import { Tag } from "../entity/tag-entity";
import { Repository } from "typeorm";
import { logger } from "../log/logger";

export interface ArticleInt {
    user: User
    title: string
    content: string
    date_created: Date
    status: Status
    tags: Tag[]
}

class ArticleService {
    private articleRepo: Repository<Article>;
    private userRepo: Repository<User>;
    private statusRepo: Repository<Status>;
    constructor() {
        this.articleRepo = dataSource.getRepository(Article);
        this.userRepo = dataSource.getRepository(User);
        this.statusRepo = dataSource.getRepository(Status);
    }

    public getAllArticles = async (): Promise<Article[] | null> => {
        try {
            const articles = await this.articleRepo.find({
                relations: ['user', 'status', 'tags']
            });
            return articles;
        } catch (error) {
            logger.error('Error fetching articles: ', error);
            return null;
        }
    }

    public createArticle = async (articleInfo: ArticleInt, userId: number): Promise<Article | null> => {
        const user = await this.userRepo.findOneBy({
            id: userId
        });

        const defaultStatus = await this.statusRepo.findOneBy({name: 'draft'});

        if (!user || !defaultStatus) {
            // Write better error handling
            return null;
        }

        const article = this.articleRepo.create({
            ...articleInfo,
            user,
            status: defaultStatus
        });

        return await this.articleRepo.save(article);
    }

    public deleteArticle = async (articleId: number, userId: number): Promise<void> => {
        const article = await this.articleRepo.findOne({
            where: { id: articleId, user: { id: userId } },
            relations: ['user']
        })

        if(!article) {
            throw new Error('Article not found');
        }

        await this.articleRepo.delete(article);
    }

    public updateArticle = async (articleId: number, userId: number, updatedInfo: ArticleInt): Promise<void> => {
        const article = await this.articleRepo.findOne({
            where: { id: articleId, user: { id: userId } },
            relations: ['user', 'status', 'tags']
        });

        if(!article) {
            throw new Error('Article not found');
        }
        this.articleRepo.merge(article, updatedInfo);
        await this.articleRepo.save(article);
    }

    public getArticleByID = async (articleId: number): Promise<Article | null> => {
        try {
            const article = await this.articleRepo.findOneBy({
                id: articleId
            });

            return article;
        } catch (error) {
            logger.error('Could not fetch article: ', error);
            return null;
        }
    }

    public getAllUserArticles = async (userId: number): Promise<Article[] | null> => {
        try {
            const userArticles = await this.articleRepo.find({
                where: {user: {id: userId}},
                relations: ['user', 'status', 'tags']
            });
    
            return userArticles;
        } catch (error) {
            logger.error('Could not fetch user articles: ', error);
            return null
        }
    }

    // TODO:
    // 1. users should be able to filter by tags, status, or date
}


export default ArticleService;