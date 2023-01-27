import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as Joi from "joi";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  body: string;

  @Column({
    nullable: false,
    length: 255,
  })
  author: string;
}

export function validateArticle(article) {
  const articleSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    author: Joi.string().required(),
  });

  return articleSchema.validate(article, { abortEarly: false });
}

export function validateUpdateArticle(article) {
  const articleSchema = Joi.object({
    title: Joi.string().optional(),
    body: Joi.string().optional(),
    author: Joi.string().optional(),
  });

  return articleSchema.validate(article, { abortEarly: false });
}
