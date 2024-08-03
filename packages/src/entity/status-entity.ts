import { Entity, Column, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Article } from './article-entity';

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Article, (article) => article.status)
    article?: Article[];
};