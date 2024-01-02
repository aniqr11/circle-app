import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinColumn } from "typeorm"
import { User } from "./User";
import { Thread } from "./threads";

@Entity({name: "reply" })
export class Reply {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 500})
    content: string

    @Column({nullable:true})
    image: string;

    @Column({type:"timestamp",default: ()=> "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column({type:"timestamp",default: ()=> "CURRENT_TIMESTAMP"})
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.reply, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "user_id" }) // untuk membuat foreignkey
	user: User;

	@ManyToOne(() => Thread, (thread) => thread.reply, {
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "thread_id" }) // untuk membuat foreignkey
	thread: Thread;
}