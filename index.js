const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('./User')

const app = express()
const port = 3000
const cors = require('cors');
app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/Justine',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    UserModel.find()
      .then(users => res.json(users))
      .catch(err => res.json(err))
})
//get specific id
app.get('/get/:id', (req, res) => {
  const id = req.params.id
    UserModel.findById({_id: id })
      .then(post => res.json(post))
      .catch(err => res.json(err))
})
// New endpoint to get users by age
app.get('/getByAge/:age', (req, res) => {
  const age = req.params.age;
  UserModel.find({ age: age })
    .then(users => res.json(users))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
})
//to create new user
app.post('/create',(req, res) =>{
  UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
// update user john since we forgot to put his surname
app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate({_id: id}, {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  }).then(user => res.json(user))
    .catch(err => res.json(err))
})
//delete the excess user that we mistakenly made during the post process
app.delete('/deleteuser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({_id: id})
    .then(response => res.json(response))
    .catch(err => res.json(err))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//That is all thank you!!