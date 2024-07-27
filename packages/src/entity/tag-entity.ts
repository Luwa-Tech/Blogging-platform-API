import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { Article } from './article-entity';

@Entity()
export class Tag {
    @PrimaryColumn({type: 'uuid', generated: 'uuid'})
    id: string

    @Column()
    name: string

    @ManyToMany(() => Article, (article) => article.tags)
    articles: Article[]
};