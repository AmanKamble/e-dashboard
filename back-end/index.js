const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const app = express();

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
});

app.post('/login', async (req, resp) => {
    console.log(req.body)
    if (req.body.email && req.body.password) 
    {
        let user = await User.findOne(req.body).select("-password");
        user ? resp.send(user) : resp.send({ result: 'No user found.' });
    }else
    {
        resp.send({result:'No user found.'})
    }
});

app.post('/add-product', async (req, resp)=>{
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get('/products', async (req, resp)=>{
    let products = await Product.find();
    if(products.length>0)
    {
        resp.send(products)
    }else{
        resp.send({result:"No Result Found"})
    }
});

app.delete('/delete/:id', async (req, resp)=>{
    console.log(req.params.id)
    let result = await Product.deleteOne({_id:req.params.id});
    resp.send(result)
});

app.get('/product/:id', async (req, resp)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"No Result Found"}) 
    }
})

app.put('/update/:id', async (req, resp)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set: req.body
        }
    )
    resp.send(result);
})

app.get('/search/:key?', async (req, resp)=>{
    if(req.params.key == null){
        let products = await Product.find();
        if(products.length>0)
        {
            resp.send(products)
        }else{
            resp.send({result:"No Result Found"})
        }
    }else{
        let result = await Product.find({
            "$or":[
                {name:{$regex:req.params.key}},
                {company:{$regex:req.params.key}},
                {price:{$regex:req.params.key}},
                {category:{$regex:req.params.key}}
            ]
        });
        resp.send(result)
    }
})

app.listen(5000);