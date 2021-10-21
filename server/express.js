var express = require('express') // node_modules 내 express 관련 코드를 가져온다
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')

var corsOptions = {
    origin : 'http://localhost:3000',
    credentials: true
}

const CONNECT_URL = 'mongodb://localhost:27017/dohyun' 
mongoose.connect(CONNECT_URL, { // Mongo DB 서버 연결 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log("mongodb connected ...")) 
.catch(e => console.log(`failed to connect mongodb: ${e}`))




app.use(cors(corsOptions))  // CORS 설정
app.use(express.json())     // request body 파싱
app.use( logger('tiny'))

app.get("/users", (req, res) => {   // 사용자에 대한 정보를 조회, 생성, 변경, 삭제
    res.send("all user list!")
})

app.get("/users/contact", (req, res) => { 
    res.send("contact page !") 
})

app.get("/users/city", (req, res) => { 
    res.send("city page !") 
})

app.get("/dhyun((mo)+)?", (req, res) => { 
    res.send("google site111") 
})

app.get( 
    "/users/:name/comments", 
    (req, res, next) => { 
        if (req.params.name !== "dhyun") { 
            res.status(401).send("you are not authorized to this page !") 
    } 
    next() 
}, 
    (req, res) => { 
        res.send("this is page to update your comments!") // 댓글 수정 페이지 보여주기 
    } 
)


const blockFirstUser = (req, res, next) => { 
    if (req.params.name === "kim") { 
        res.status(401).send("you are not authorized to this page !") 
    } 
    next() 
} 

const blockSecondUser = (req, res, next) => { 
    if (req.params.name === "park") { 
        res.status(401).send("you are not authorized to this page !") 
    } 
    next() 
} 

const allowThisUser = (req, res) => { 
    res.send("you can see this home page !") 
} 

app.get("/home/users/:name", [ 
    blockFirstUser, 
    blockSecondUser, 
    allowThisUser 
])

app.get("/chance", (req, res, next) => {
    if(Math.random() < 0.5) return next()
    res.send("first one")
})

app.get("/chance", (req, res) => {
    res.send("second one")
})





app.post("/users", (req, res) => { console.log(req.body.newUser) // 데이터베이스에 새로운 사용자 생성
    res.json(`new user - ${req.body.newUser.name} created !`) 
})

app.put("/users/:id", (req, res) => { 
    console.log(req.body.updatedUserInfo) // 데이터베이스에서 id 에 해당하는 사용자 정보 조회 후 업데이트 
    res.send( 
        `user ${req.params.id} updated with payload ${JSON.stringify( 
        req.body.updatedUserInfo 
        )}!`
    ) 
})

app.delete("/users/:id", (req, res) => { // 데이터베이스에서 id 에 해당하는 사용자 조회 후 제거 
    res.send(`user ${req.params.id} removed !`) 
})



app.use( (req, res, next) => {  // 사용자가 요청한 페이지가 없는 경우 에러처리 
    res.status(404).send("this is page you see when page don't exist") })

app.use( (err, req, res, next) => {     // 서버 내부 오류 처리
    console.error(err.stack) 
    res.status(500).send("something is broken on server !") })

            
app.listen(5000, () => { // 5000 포트로 서버 오픈, listen 함수는 젤 아래에 있어야함.
    console.log('server is running on port 5000 ...')
})

// const points = [3, 4]
// const app = {}
// app.doubleNums = (points) => {
//     return points.map(p => {
//         return p*p;
//     })

// }

// app.sum = (points_doubled) => {
//     let s = 0;
//     points_doubled.forEach(p => {
//         s += p;
//     })
//     return s;
// }

// app.sq = (s) => {
//     return Math.sqrt(s)
// }

// const pipeline = [app.doubleNums, app.sum, app.sq]


// const result = app.sq(app.sum(app.doubleNums(points)))
// console.log(result)


