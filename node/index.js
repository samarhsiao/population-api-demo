require('dotenv').config();
const cors = require('cors');
const http = require('http');
const express = require('express');
const app = express();
const axios = require('axios');
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({
  extended: false
}));

app.use(express.json());
const corsOptions = {
  credentials: true,
  origin: (origin, cb) => {
    // console.log(`origin: ${origin}`);
    cb(null, true);
  }
};

app.use(cors(corsOptions));


app.use(express.static('public'));
app.use('/jquery', express.static('node_modules/jquery/dist')); //把node_modules的jquery檔案掛在/jquery路徑底下
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use(async(req,res,next)=>{
  res.locals.title = `Popularity API Demo`;
    next();
})




app.get('/',async(req,res)=>{

 const url = 'https://od.moi.gov.tw/api/v1/rest/datastore/301000000A-000082-041?fbclid=IwAR3F3293bGzIdvwvhRcPwreAWNGpIO1ClikWTFZ7j5mCRsFzXmpXT2ipG-Q';

res.header("Content-Type", "text/html; charset=utf-8");
const r = await axios.get(url);
const j = r.data.result.records;
// console.log(typeof(j))
// res.render('home',{data:j});
res.json(j);


})


let port = process.env.PORT || 3002;
const node_env = process.env.NODE_ENV || 'development';

server.listen(port, () => {
  console.log(`NODE_ENV: ${node_env}`);
  console.log(`啟動: ${port}`, new Date());
});