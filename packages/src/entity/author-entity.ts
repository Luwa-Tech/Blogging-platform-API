import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Article } from './article-entity';

@Entity()
export class Author {
    @PrimaryColumn({type: 'uuid', generated: 'uuid'})
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @OneToMany(() => Article, (article) => article.author)
    article?: Article[];
};