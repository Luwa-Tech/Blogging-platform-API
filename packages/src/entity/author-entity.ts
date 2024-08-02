import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './article-entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column()
    email: string

    @OneToMany(() => Article, (article) => article.user)
    article: Article[];
};