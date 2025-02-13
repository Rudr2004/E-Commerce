import exprss from "express"
import dotenv from "dotenv"
dotenv.config()
import { graphqlHTTP } from "express-graphql"
import  schema  from "./schema/schema"
import { root } from "./rootValue/root"
import Db from "./Database/db"

const app = exprss()
const PORT = process.env.PORT || 9000

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
    rootValue: root
}))

Db()
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
