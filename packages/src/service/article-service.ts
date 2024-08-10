import { Article } from "../entity/article-entity";
import dataSource from "../config/data-source";
import { Status } from "../entity/status-entity";
import { User } from "../entity/author-entity";
import { Tag } from "../entity/tag-entity";
import { Repository } from "typeorm";
import { logger } from "../log/logger";

export interface ArticleInt {
    title: string
    content: string
    tags: Tag[]
}

class ArticleService {
    private articleRepo: Repository<Article>;
    private userRepo: Repository<User>;
    private statusRepo: Repository<Status>;
    private tagRepo: Repository<Tag>;
    constructor() {
        this.articleRepo = dataSource.getRepository(Article);
        this.userRepo = dataSource.getRepository(User);
        this.statusRepo = dataSource.getRepository(Status);
        this.tagRepo = dataSource.getRepository(Tag);
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

    public createArticle = async (articleInfo: ArticleInt, user: User): Promise<Article | null> => {
        const defaultStatus = await this.statusRepo.findOneBy({ name: 'draft' });

        if (!user || !defaultStatus) {
            // Write better error handling
            return null;
        }

        const article = this.articleRepo.create(articleInfo);
        article.user = user;
        article.status = defaultStatus;

        const result = await this.articleRepo.save(article);
        return result;
    }

    public deleteArticle = async (articleId: number, userId: number): Promise<void | null> => {
        const article = await this.articleRepo.findOne({
            where: { id: articleId, user: { id: userId } },
            relations: ['user']
        })

        if (article) {
            await this.articleRepo.delete(article);
        } else {
            return null;
        }
    }

    public updateArticle = async (articleId: number, updatedInfo: ArticleInt): Promise<Article> => {
        const article = await this.articleRepo.findOne({
            where: { id: articleId },
            relations: ['tags']
        });

        if (!article) {
            throw new Error('Article not found');
        }
        const tags = await this.findTags(updatedInfo.tags);

        this.articleRepo.merge(article, updatedInfo, { tags });
        return await this.articleRepo.save(article);
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
                where: { user: { id: userId } },
                relations: ['user', 'status', 'tags']
            });

            return userArticles;
        } catch (error) {
            logger.error('Could not fetch user articles: ', error);
            return null;
        }
    }

    // Change tags type if error occurs
    private findTags = async (tags: any[]): Promise<Tag[]> => {
        let articleTags: Tag[] = [];

        for (let tagName of tags) {
            const findTag = await this.tagRepo.findOne({ where: { name: tagName } });

            if (findTag) {
                articleTags.push(findTag);
            }
        };

        return articleTags;
    }

    // TODO:
    // 1. users should be able to filter by tags, status, or date
    // 2. publish
    // 3. archive
}


export default ArticleService;