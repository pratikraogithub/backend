const express = require(`express`)

const app = express()

const mongoose = require('mongoose')

app.use(express.json())

app.listen(80);

// let users = [{
//     'id': 1,
//     'name': 'vinayak'
// },
// {
//     'id': 2,
//     'name': 'Faster'
// },
// {
//     'id': 3,
//     'name': 'ywre'
// }
// ]

const userRouter = express.Router()
const authRouter = express.Router()

app.use('/users', userRouter);
app.use('/auth', authRouter)

userRouter
    .route('/')
    .get(getUsers)
    .post(postUser)
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route('/:id')
    .get(getUserById)

authRouter
    .route('/signup')
    .get(middleware1, getSignUp, middleware2)
    .post(postSignUp)


// app.get('/users', (req, res) => {
//     console.log(req.query)
//     res.send(users)
// })

async function getUsers(req, res) {
    // console.log(req.query)
    let allUsers = await userModel.find()

    res.send(users)
}

// app.post('/users', (req, res) => {
//     console.log(req.body)
//     users = req.body
//     res.json({
//         message: "message received successfully",
//         user: req.body
//     })
// })

function postUser(req, res) {
    console.log(req.body)
    users = req.body
    res.json({
        message: "message received successfully",
        user: req.body
    })
}

//update-> patch
// app.patch('/users', (req, res) => {
//     console.log('reqbody->', req.body)
//     let dataToBeUpdated = req.body;
//     for (key in dataToBeUpdated) {
//         users[key] = dataToBeUpdated[key]
//     }
//     res.json({
//         message: "data update successfully"
//     })
// })

function updateUser(req, res) {
    console.log('reqbody->', req.body)
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key]
    }
    res.json({
        message: "data update successfully"
    })
}

// to delete the data
// app.delete('/users', (req, res) => {
//     users = {};
//     res.json({
//         message: "data has been deleted"
//     })
// })

function deleteUser(req, res) {
    users = {};
    res.json({
        message: "data has been deleted"
    })
}
// params
// app.get('/users/:username', (req, res) => {
//     console.log(req.params)
//     res.send("user_id received")
// })

function getUserById(req, res) {
    console.log(req.params.id)
    let paramId = req.params.id
    let obj = {}

    for (let i = 0; i < users.length; i++) {
        if (users[i]['id'] == paramId) {
            obj = users[i]

        }
        res.json({
            message: 'request received',
            data: obj
        });
    }
}

function middleware1(req, res, next) {
    console.log('middleware1 encountered');
    next();
}

function middleware2(req, res) {
    console.log('middleware2 encountered');
    // next();

    console.log("middleware 2 ended req/res cycle");
    res.sendFile('/public/index.html', { root: __dirname })


}

function getSignUp(req, res, next) {
    console.log('getSignUp called');
    // res.sendFile('/public/index.html', { root: __dirname })
    next()
}

function postSignUp(req, res) {
    let obj = req.body
    console.log('backend', obj);

    res.json({
        message: "user signed up",
        data: obj
    })

}

const db_link = 'mongodb+srv://admin:P3SPueqIpEbujtlz@cluster0.pauelpd.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
    .then(function (db) {
        console.log('db connected');

    })

    .catch(function (err) {
        console.log(err);

    })

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8
    }
})

// model
const userModel = mongoose.model('userModel', userSchema)

    (async function createUser() {
        let user = {
            name: 'satrics',
            email: 'abc@gmail.com',
            password: '123456789',
            confirmPassword: '123456789'
        }
        let data = await userModel.create(user)
        console.log(data);

    })();