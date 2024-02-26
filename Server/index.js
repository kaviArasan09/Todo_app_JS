import express, { json } from 'express'
import mongoose, { Schema } from 'mongoose'
import cors from 'cors'


const app=express()
app.use(express.json())
app.use(cors())
   
const connect=async()=>{
    try{
    await mongoose.connect('mongodb+srv://hello:kavi@cluster0.wjcn8sl.mongodb.net/?retryWrites=true&w=majority')
    console.log("Mongo connected")
    }catch(error){
        console.log(error)
    }
}

const todo=new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    }
})
const TodoModel = mongoose.model('Todo',todo);

app.post('/todo',async(req,res)=>{
    try{
        const data={title:req.body.title,description:req.body.description}
        const entry= new TodoModel(data)
        await entry.save()
        res.status(200).json(data)   
    }catch(error){
        console.log(error); 
    }

    
})

app.get('/todo',async(req,res)=>{
    try{
        const get= await TodoModel.find()
        res.status(200).json(get)
    }catch(error){
        console.log(error)
    }
})

app.put('/todo/:id',async(req,res)=>{
    try{
      const update= await TodoModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
      console.log("updated",update)
      res.status(200).json(update)
    }catch(error){
        console.log("update failed")
        res.status(404).json(error)
    }
})

app.delete('/todo/:id',async(req,res) =>{
    try{
        await TodoModel.findByIdAndDelete(req.params.id)
        console.log("deleted successfully")
        res.status(200).json("deleted")
    }catch(error){
        console.log("failed to delete")
        res.status(400).json(error);
    }                               
})


app.listen(5003,() => {
    connect()
     console.log("server running")
})