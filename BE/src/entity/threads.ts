import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User";
import { Reply } from "./reply";

@Entity({name: "threads" })
export class Thread {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string;

    @Column({nullable:true})
    image: string;

    @Column({type:"timestamp",default: ()=> "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column({type:"timestamp",default: ()=> "CURRENT_TIMESTAMP"})
    updated_at: Date;

    @ManyToOne (() => User, (user) => user.thread)
    user: User;

    @OneToMany(() => Reply, (reply) => reply.thread)
	reply: Reply[];


}