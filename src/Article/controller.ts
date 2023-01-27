import { Request, Response } from "express";
import { Article, validateArticle, validateUpdateArticle } from "./Article";
import { AppDataSource } from "../data-source";
import { Like } from "typeorm";

const articlesRepository = AppDataSource.getRepository(Article);

export const getArticleById = async function (req: Request, res: Response) {
  try {
    const articles = await articlesRepository.find({
      where: { id: Number(req.params.id) },
    });
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getArticles = async function (req: Request, res: Response) {
  try {
    const articles = await articlesRepository.find();
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const createArticle = async function (req: Request, res: Response) {
  try {
    const { error } = validateArticle(req.body);
    if (error)
      return res.status(400).json({ msg: "Please validate the data." });

    const IArticle = articlesRepository.create(req.body);
    const article = await articlesRepository.save(IArticle);
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const updateArticle = async function (req: Request, res: Response) {
  try {
    const { error } = validateUpdateArticle(req.body);
    if (error)
      return res.status(400).json({ msg: "Please validate the data." });

    await articlesRepository.update({ id: Number(req.params.id) }, req.body);
    const article = await articlesRepository.findOne({
      where: { id: Number(req.params.id) },
    });
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteArticle = async function (req: Request, res: Response) {
  try {
    const article = await articlesRepository.delete(req.params.id);
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const searchForArticle = async function (req: Request, res: Response) {
  try {
    const articles = await articlesRepository.find({
      where: [
        { title: Like(`%${req.query.searchText}%`) },
        { author: Like(`%${req.query.searchText}%`) },
        { body: Like(`%${req.query.searchText}%`) },
      ],
    });
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).send(error);
  }
};
