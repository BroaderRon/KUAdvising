const express= require('express');
const app = express();
path = require('path');



app.use(express.static(__dirname+'/dist/'));

app.listen(process.env.PORT || 8080);

app.get('/*' , (req,res)=>{
    //res.setHeader("Content-Security-Policy", "script-src '*'");
    res.sendFile(path.join(__dirname,'/dist/index.html'));
});

console.log('console is listening!');