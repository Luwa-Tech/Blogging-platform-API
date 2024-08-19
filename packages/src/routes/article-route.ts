import express from 'express';
import ArticleController from '../controllers/article-controller';
import { UserService } from '../service/user-service';
import ArticleService from '../service/article-service';
import authoriseUser from '../middleware/authorize-user';

const router = express.Router();

const userService = new UserService();
const articleService = new ArticleService();
const articleController = new ArticleController(articleService, userService);

router.post('/create', articleController.create)
router.delete('/remove', authoriseUser, articleController.delete)
router.put('/save', authoriseUser, articleController.update)
router.get('/:id', authoriseUser, articleController.getOne)
router.get('/user/:id', authoriseUser, articleController.getAllByUserId)

// publish, archive

export default router;