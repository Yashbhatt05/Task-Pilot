import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import ReqHandler from './req-handler';








dotenv.config();


const app = express();

const PORT  =  process.env.PORT || 3001;


console.log("PORT : ", PORT);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
   res.send('Running App Server');
   return;
});

app.get("/v1/fn/:fnid", async (req, res) => {
  const r = await ReqHandler.Function(req, res);
  res.json(r);
  return;
})

app.post("/v1/fn/:fnid", async (req, res) => {
  const r = await ReqHandler.Function(req, res);
  res.json(r);
  return;
})

app.post("/*", async (req, res) => {
  const r = await ReqHandler.Post(req, res);
  res.json(r);
  return;
});

app.post("/*", async (req, res) => {
    
    const r = await ReqHandler.Post(req, res); 
    res.json(r);
    return; 
})




app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT + "!");
});

