let express = require('express');
let app = express();
let morgan = require('morgan');
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 9870;
let mongo = require('mongodb');
let cors = require('cors');
let MongoClient = mongo.MongoClient;
let bodyParser = require('body-parser');
let mongoUrl = "mongodb+srv://shoppinghub:shoppinghub123@cluster0.w4byv.mongodb.net/?retryWrites=true&w=majority";
let db;

app.use(morgan('common'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.send("Response from ShoppingHub");

})

app.get('/collectiontype',(req,res)=>{
    db.collection('collectionCategory').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.get('/brandlist',(req,res)=>{
    db.collection('brand').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.get('/imagecollection',(req,res)=>{
    let query = {}
    let collectionId = Number(req.query.collectionId);
    let brandId = Number(req.query.brandId);
    let discountId = Number(req.query.discountId)
    if(collectionId){
        query = {collectionCategory_id:collectionId}
    }else if(brandId){
        query = {brand_id:brandId}
    }else if(discountId){
        query = {discount_id:discountId}
    }else{
        query = {}
    }
    db.collection('imageCollection').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.get('/products',(req,res)=>{
    let query = {}
    let brandId = Number(req.query.brandId);
    if(brandId){
        query = {"brands.brand_id":brandId}
    }else{
        query = {}
    }
    db.collection('product').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})


app.get('/filter/:brandId',(req,res) => {
    let query = {}
    let brandId = Number(req.params.brandId);
    let sizeId = Number(req.query.sizeId);
    let genderId = Number(req.query.genderId);
    let occasionId = Number(req.query.occasionId);
    if(sizeId && genderId && occasionId){
        query = {
            "brands.brand_id":brandId,
            size_id:sizeId,
            occasion_Id:occasionId,
            gender_id:genderId
        }
    }
    else if(sizeId){
        query = {
            "brands.brand_id":brandId,
             size_id:sizeId
        }
    }else if(genderId){
        query = {
            "brands.brand_id":brandId,
            gender_id:genderId
        }
    }else if(ocationId){
        query = {
            "brands.brand_id":brandId,
            occasion_Id:occasionId
        }
    } else{
        query = {
            "brands.brand_id":brandId,
        }
    }
    db.collection('product').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })

})

app.get('/details/:id',(req,res)=>{
    let id = Number(req.params.id);
    db.collection('product').find({product_id:id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.post('/productItem',(req,res) => {
    if(Array.isArray(req.body.id)){
        db.collection('product').find({product_id:{$in:req.body.id}}).toArray((err,result)=>{
            if(err) throw err;
             res.send(result); 
        })
    }else{
        res.send("Invalid input");  
    }
})

app.post('/placeOrder',(req,res)=>{
    db.collection('orders').insert(req.body, (err,result)=>{
        if(err) throw err;
        res.send('Order Placed');
    })
})

app.get('/orderList',(req,res)=>{
    let email = req.query.email;
    let query = {}
    if(email){
        query = {email:email}
    }
    db.collection('orders').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.put('/updateOrder/:id',(req,res)=>{
     let id = Number(req.params.id);
     db.collection('orders').updateOne(
        {order_id:id},
         {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bank_name,
                "date":req.body.date
            }
         },(err,result)=>{
            if(err) throw err;
            res.send("Order Updated");
         }
     )
})

app.delete('/deleteOrder/:id',(req,res) => {
    let id =  Number(req.params.id)
    db.collection('orders').remove({order_id:id},(err,result) => {
      if(err) throw err;
      res.send('Order Deleted')
    })
})

app.get('/genderList',(req,res)=>{
    db.collection('gender').find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})


MongoClient.connect(mongoUrl, (err,client)=> {
     if(err){console.log("Error While Connecting")}
     else{
         db = client.db('shoppingHub');
         app.listen(port, ()=> {
             console.log(`Listening on port ${port}`)
         })
     }
})
