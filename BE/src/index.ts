import { Request, Response }  from 'express'
import { AppDataSource } from './data-source'
import router from './route/routes';
import * as cors from 'cors'
//import dlu donenv=panggil process.env


const express = require('express')
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

AppDataSource.initialize()

.then(async()=> {
    const app = express()
    const port = 5000
    app.use(cors())

    app.use(express.json())
    app.use("/api/v1", router);

    app.get("/", (req: Request, res: Response) =>{
        res.send("gatau apa ini")
    });

    app.listen(port, () => {
        console.log(`server running on http://localhost:${port}`);
        
    })
})
.catch((error) => console.log(error));
