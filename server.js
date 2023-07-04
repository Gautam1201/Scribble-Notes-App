require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

const NoteSchema = new mongoose.Schema({
  title: {
    type: String
    // default: "Untitled",
  },
  content: {
    type: String,
    required: true
  },
});

const Note = mongoose.model("Note", NoteSchema);

app.get("/api", (req, res) => {
  Note.find()
  .then((notes) => res.json(notes))
  .catch(err => {
    console.log(err.message);
  });
});

app.post("/api", (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content
  });
  newNote.save()
  .then((item) => res.json(item))
  .catch((err) => {
    console.log(err)
  });
});

app.delete("/api/:id",(req,res) => {
    Note.findByIdAndDelete(req.params.id, (err,item) => {
        if(err) res.status(404).json({success: "Something's Wrong!"})
        else res.json({success: "Deleted!"});
    })
})

app.patch("/api/:id", (req,res) => {
  Note.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      content: req.body.content
    }, (err,newNote) => {
    
    if(err) console.log(err);
    else{
      res.json({result: "Updated!"})
    }
  })
})
/*
//Serving Static Client Files
if(process.env.NODE_ENV === "production"){
  //Set Static Folder
  app.use(express.static("scribble-notes-client/build"));
}
*/

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
