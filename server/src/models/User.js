const mongoose = require('mongoose')

const userSchema = mongoose.Schema({        // 스키마 정의
    name : { type: String, required: true, trim: true },
    age : { type: Number, required: true},
    email : {type : String, required: true, trim: true},
    todos : {type : Array, required: true}
})

const Todo = mongoose.model('User', userSchema) // 스키마로부터 생성된 모델 객체
module.exports = User;