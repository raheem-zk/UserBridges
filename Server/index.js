import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

const data = {name:'raheem', age:20}
app.get('/',(req,res)=>{
    res.json(data);
})

app.post('/', async (req, res)=>{
    const data = req.body;
    console.log(data);
})
const PORT = 4000;
app.listen(PORT,()=>{
    console.log(`server running port :${PORT}`);
})