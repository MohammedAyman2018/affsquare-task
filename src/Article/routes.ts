import { Router } from "express";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  searchForArticle,
  getArticleById,
} from "./controller";
const router = Router();

router.route("/").get(getArticles).post(createArticle);
router.get("/search", searchForArticle);
router
  .route("/one/:id")
  .get(getArticleById)
  .put(updateArticle)
  .delete(deleteArticle);

export default router;
