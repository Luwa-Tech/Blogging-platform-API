import { Entity, Column, ManyToOne, PrimaryColumn, JoinTable, ManyToMany } from 'typeorm';
import { Author } from './author-entity';
import { Tag } from './tag-entity';
import { Status } from './status-entity';

@Entity()
export class Article {
    @PrimaryColumn({type: 'uuid', generated: 'uuid'})
    id: string

    @Column()
    title: string

    @Column({type: 'text'})
    content: string

    @Column()
    date_created: Date

    @ManyToOne(() => Author, (author) => author.article)
    author: Author;

    @ManyToOne(() => Status, (status) => status.article)
    status: Status;

    @ManyToMany(() => Tag, (tag) => tag.articles, { cascade: true})
    @JoinTable({name: 'article_tags'})
    tags: Tag[]
};