import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './article-entity';

@Entity()
export class Author {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @OneToMany(() => Article, (article) => article.author)
    article?: Article[];
};