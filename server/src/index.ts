import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { graphqlHTTP } from "express-graphql"
import  schema  from "./schema/schema"
import { root } from "./rootValue/root"
import Db from "./Database/db"
import cors from "cors"

const app = express()
const PORT = process.env.PORT

app.use(express.json({limit: "50mb"}))
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
    rootValue: root
}));

app.get("/api/config/paypal",(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

Db()
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
