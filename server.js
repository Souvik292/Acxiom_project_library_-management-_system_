import express, { urlencoded } from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

mongoose.connect("mongodb://0.0.0.0:27017/axciom");
const userschema =mongoose.Schema;
const dataschema=new userschema({
    email:String,
    password:String
});
const collection =mongoose.model("user",dataschema);


const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
const port=9000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));
app.get("/",(req,res)=>{
    res.render("E:\\my projects\\axciom\\index.ejs"); 
});
app.get("/login",(req,res)=>{
    res.render("E:\\my projects\\axciom\\public\\partial\\login.ejs")
})
app.get("/signup",(req,res)=>{
    res.render("E:\\my projects\\axciom\\public\\partial\\signup.ejs")
})



     


app.post("/signup", async(req,res)=>{


const {email,password}=req.body;
// const email=req.body.email;
// const password=req.body.password;
// const newdata=new collection({
//     email,
//     password
// });
// newdata.save();
const existinguser=await collection.find({email:req.body.email});
if(existinguser){
    res.redirect("/login");
}
else{
    const newdata=new collection({
        email,
        password
    });
    newdata.save();

}
// res.redirect("/login");
     
 });
 app.post("/login", async (req,res)=>{


    try{
        const check=await collection.find({email:req.body.email})
            if (check.password===req.body.password){
                // res.send("its ok");
                res.render("E:\\my projects\\axciom\\public\\partial\\admin_home_page.ejs");
            }
            else{
                res.render("E:\\my projects\\axciom\\public\\partial\\admin_home_page.ejs");
                res.render("E:\\my projects\\axciom\\public\\partial\\transaction.ejs");
                // res.send("pagil");
            }
    }
    catch{
        res.send("wrong details");
    }

});
app.get("/")




app.listen(port,(req,res)=>{
    console.log(`website is runnnig on :localhost:${port}`)
    
});


