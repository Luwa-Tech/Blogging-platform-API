import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Article } from './article-entity';

@Entity()
export class Status {
    @PrimaryColumn({type: 'uuid', generated: 'uuid'})
    id: string

    @Column()
    name: string

    @OneToMany(() => Article, (article) => article.status)
    article?: Article[];
};