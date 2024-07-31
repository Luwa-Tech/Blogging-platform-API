import { Entity, Column, ManyToOne, JoinTable, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from './author-entity';
import { Tag } from './tag-entity';
import { Status } from './status-entity';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({type: 'text'})
    content: string

    @Column()
    date_created: Date

    @ManyToOne(() => User, (user) => user.article)
    user: User;

    @ManyToOne(() => Status, (status) => status.article)
    status: Status;

    @ManyToMany(() => Tag, { cascade: true})
    @JoinTable({name: 'article_tags'})
    tags: Tag[]
};