import { Entity, Column, ManyToOne, JoinTable, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn } from 'typeorm';
import { User } from './author-entity';
import { Tag } from './tag-entity';
import { Status } from './status-entity';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.article)
    user: User;

    @Column()
    title: string

    @Column({type: 'text'})
    content: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => Status, (status) => status.article)
    status: Status;

    @ManyToMany(() => Tag, { cascade: true})
    @JoinTable({name: 'article_tags'})
    tags: Tag[]
};