const  express = require('express');
const bcrypt = require ('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const Register = require('./controllers/Register');
const Signin = require('./controllers/Signin');
const Profile = require('./controllers/Profile');
const Image = require('./controllers/Image')

const app = express();

const postg = knex({
  client: 'pg',
  connection: {
    host : 'dpg-cg0e27m4dad93e22e7k0-a',
    port : 5432,
    user : 'smartbraindatabase_8d3f_user',
    password : 'CvActlF4G0eyKcQ3XeiMyU4eF1I6g4Fj',
    database : 'smartbraindatabase_8d3f'
  }
});

app.use(cors());
app.use(express.json())


app.get('/',(req,res)=>{ res.json("its wroking")});

app.post('/signin', Signin.handleSignin(postg, bcrypt));

app.post('/register', Register.handleRegister(postg, bcrypt));

app.get('/profile/:id', Profile.handleProfileGet(postg))

app.put('/image', Image.handleImage(postg))

app.put('/imageUrl', Image.handleApiCall())

const PORT = process.env.PORT;


app.listen(PORT, ()=>{

	console.log(`its working on localhost: ${ PORT }`)
})