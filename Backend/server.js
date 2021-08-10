import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

const app = express();
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1197769",
    key: "0537683093fe8f44e6fe",
    secret: "129fd40e88c9e7125727",
    cluster: "eu",
    useTLS: true 
  });

const db = mongoose.connection;

db.once("open", ()=>{
    console.log("DB CONNECT!");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change)=>{  
        console.log("A change occured",change);

    if(change.operationType ==="insert"){
        const messageDetails = change.fullDocument;   
        pusher.trigger("messages", "inserted",
        {
            name: messageDetails.name,
            message: messageDetails.message,
            timestamp: messageDetails.timestamp,
            received: messageDetails.received, 
        }
        );
    }else{
        console.log("Error triggering pusher!")
    }
    });
});


app.use(express.json());
app.use(cors());


const connection_url = "mongodb+srv://Admin:A2ZjmC2SSyPnBrPm@cluster0.i7u2o.mongodb.net/whatsappclone?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

app.get("/", (req, res)=>res.status(200).send("Hello lovely lady!"));

app.get("/messages/sync",(req, res)=>{
    
    Messages.find((err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send({data});
        }
    });
});
  
app.post("/messages/new", (req, res)=>{
    const dbMessages = req.body

    Messages.create(dbMessages, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send({data})
        }
    })
})
 
app.listen(port, (()=>console.log(`Listening on local host:${port}`)));

