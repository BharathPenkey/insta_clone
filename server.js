// const express= require("express");
// const app= express();
// const cors= require("cors");
// const mongoose= require("mongoose");

// app.use(cors());
// app.use(express.json());


// // mongoose.connect("mongodb+srv://bharath:bharath123@cluster0.tju0upp.mongodb.net/insta_db")

// // mongoose.connect('mongodb://localhost:27017/test', () => { console.log('connected to db')}).
// //   catch(error => handleError(error));

// try {
//     // mongoose.connect('mongodb://localhost:27017/test');
//     //  mongoose.connect("mongodb+srv://bharath:bharath0@cluster0.w1gr51t.mongodb.net/insta_DB?retryWrites=true&w=majority");
//   } catch (error) {
//     console.log(error);
//   } 

// app.use("/",require("./route"));
// app.listen(3005,function(){
//     console.log("server is running on port 3005")
// })



const express= require("express");
const app= express();
const cors= require("cors");
const mongoose= require("mongoose");

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://bharath:bharath@cluster0.w1gr51t.mongodb.net/insta_DB")
app.use("/",require("./route"));
app.listen(3001,function(){
    console.log("server is running on port 3001")
})