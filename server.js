import express, { urlencoded } from "express";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";

mongoose.connect("mongodb://0.0.0.0:27017/acxiom");
const userschema =mongoose.Schema;
const dataschema=new userschema({
    email:String,
    password:String
});
const collection =mongoose.model("admin",dataschema);
const collection2 =mongoose.model("student",dataschema);


const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
const port=9000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));
app.get("/",(req,res)=>{
    res.render("E:\\my projects\\acxiom\\index.ejs"); 
});
app.get("/login",(req,res)=>{
    res.render("E:\\my projects\\acxiom\\public\\partial\\login.ejs")
});
app.get("/login/student",(req,res)=>{
    res.render("E:\\my projects\\acxiom\\public\\partial\\loginstudent.ejs")
});
app.get("/signup",(req,res)=>{
    res.render("E:\\my projects\\acxiom\\public\\partial\\signup.ejs")
});
app.get("/signup/student",(req,res)=>{
    res.render("E:\\my projects\\acxiom\\public\\partial\\signupstudent.ejs")
});



     


app.post("/signup", (req,res)=>{


const {email,password}=req.body;
console.log(password);

bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,async(err,hash)=>{
        const newdata=await collection.create({
            email,
            password:hash
        });
        
       const token= jwt.sign({email},"secret");
       res.cookie("save password",token);
       res.redirect("/login");


    });
});

});
app.post("/signup/student", (req,res)=>{


const {email,password}=req.body;
console.log(password);

bcrypt.genSalt(5,(err,salt)=>{
    bcrypt.hash(password,salt,async(err,hash)=>{
        const newdata2=await collection2.create({
            email,
            password:hash
        });
        
       const token1= jwt.sign({email},"secret");
       res.cookie("save password",token1);
       res.redirect("/login/student");


    });
});

});

     

 app.post("/login", async (req,res)=>{



    try{
        const check=await collection.findOne({email:req.body.email})
        bcrypt.compare(req.body.password,check.password,(err,result)=>{
            if(result){
                let token=jwt.sign({email:check.email},"passwordsave");
                res.cookie("save password",token);
                res.render("E:\\my projects\\acxiom\\public\\partial\\admin_home_page.ejs");

            }
            else{
    
                res.redirect("/login");
            }
        });
           
    }
    catch{
        res.send("wrong details");
    }

});
 app.post("/login/student", async (req,res)=>{



    try{
        const check=await collection2.findOne({email:req.body.email})
        bcrypt.compare(req.body.password,check.password,(err,result)=>{
            if(result){
                let token1=jwt.sign({email:check.email},"passwordsave");
                res.cookie("save password",token1);
                res.render("E:\\my projects\\acxiom\\public\\partial\\studenthomepage.ejs");

            }
            else{
    
                res.redirect("/login/student");
            }
        });
           
    }
    catch{
        res.send("wrong details");
    }

});
app.get("/maintainance",(req,res)=>{
    res.render("E:\\my projects\\acxiom\\public\\partial\\maintainance.ejs")

});
app.get("/report",(req,res)=>{
    res.render("E:\\my projects\\acxiom\\public\\partial\\report.ejs")

});
app.get("/transaction",(req,res)=>{
    res.render("E:\\my projects\\acxiom\\public\\partial\\transaction.ejs")

});




app.listen(port,(req,res)=>{
    console.log(`website is runnnig on :localhost:${port}`)
    
});


