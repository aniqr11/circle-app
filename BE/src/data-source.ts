import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Thread } from "./entity/threads"
import { Reply } from "./entity/reply"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "makanbang1",
    database: "circle",
    synchronize: true,
    logging: false,
    entities: [User,Thread,Reply],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})
