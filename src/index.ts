import express from 'express'
import { expressMiddleware } from '@as-integrations/express5';
import createApolloGraphqlServer from './graphql/index.js';


async function init(){
const app = express()
const Port = Number(process.env.PORT) || 8000 


app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        message:"hello"
    })

})
const gqlServer = await createApolloGraphqlServer()

app.use('/graphql',expressMiddleware(gqlServer, {
   context: async ({ req }) => {
      const token = req.headers.authorization?.replace("Bearer ", "")
      return { token }
    }
}))


app.listen(Port, () =>{
    console.log("server is running on this ")
})

}

init()