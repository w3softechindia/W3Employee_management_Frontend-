let express = require('express');

let app = express();

app.use(express.static(__dirname+'/dist/edon-ng'));

app.get('/*',(req,resp)=>{
    resp.sendFile(__dirname+'/dist/edon-ng/index.html');
});
app.listen(process.env.PORT || 4200);