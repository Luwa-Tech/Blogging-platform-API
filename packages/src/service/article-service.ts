import { Article } from "../entity/article-entity";
import dataSource from "../config/data-source";
import { Status } from "../entity/status-entity";
import { User } from "../entity/author-entity";
import { Tag } from "../entity/tag-entity";

export interface ArticleInterface {
    title: string
    content: string
    date_created: Date
    userid: User
    statusid: Status
    tags: Tag[]
}

class ArticleService {
    private article: typeof Article;
    constructor() {
        this.article = Article;
    }

    public getAllArticles = async (): Promise<Article[] | null> => {
        const articles = await dataSource.getRepository(this.article).find();
        return articles;
    }

    public createArticle = async (articleInfo: ArticleInterface): Promise<Article> => {
        // get article repository
        const article = await dataSource.getRepository(this.article).create(articleInfo);
        const result = await dataSource.getRepository(this.article).save(article);
        return result;
        // create new article
        // save article and return results
        // question: does article return all results or just added result
    }
        
    public deleteArticle = async (articleID: number): Promise<void> => {
        // Get article repository
        // find article using articleID and user relation
        // delete article
        // return results
    }

    public updateArticle = async (articleID: number): Promise<void> => {
        // Get article repository
        // find article using articleID and user relation
        // updated article
        // return results
    }

    // public getSearchedArticles

    public getArticleByID = async (articleID: number): Promise<void> => {
        // Get article repository
        // find article using articleID and user relation
        // return results
    }

    // public getAllArticlesCreatedByAuthor
}


export default ArticleService;