import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

async function init(){
const app = express()
const Port = Number(process.env.PORT) || 8000 
const gqlServer = new ApolloServer({
  typeDefs: `
  type Query {
  hello : String
  say(name:String):String
  
  }
  `,
  resolvers:{
    Query:{
        hello:()=>"hey there , I am a graphql server ",
        say:(_,{name})=> `hey ${name} welcome to the gql server`
    }

  },
});

app.use(express.json())


await gqlServer.start();


app.get('/',(req,res)=>{
    res.json({
        message:"hello"
    })

})

app.use('/graphql',expressMiddleware(gqlServer))


app.listen(Port, () =>{
    console.log("server is running on this ")
})

}

init()