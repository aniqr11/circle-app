import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Thread } from "./threads";
import { Reply } from "./reply";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string;
    
    @Column()
    fullname: string;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable:true})
    profile_picture: string;

    @Column({nullable:true})
    profile_description: string;

    @Column({type:"timestamp",default: ()=> "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column({type:"timestamp",default: ()=> "CURRENT_TIMESTAMP"})
    updated_at: Date;

    @OneToMany(() => Thread,(thread) => thread.user)
    thread: Thread[];

    @OneToMany(() => Reply, (reply) => reply.thread)
	reply: Reply[];

}
