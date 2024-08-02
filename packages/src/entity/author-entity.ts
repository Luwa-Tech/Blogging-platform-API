import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './article-entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    firstname: string

    @Column({nullable: false})
    lastname: string

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    password: string

    @OneToMany(() => Article, (article) => article.user)
    article: Article[];
};