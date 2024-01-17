const mongoose= require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
   
})
// const User=mongoose.model('user',UserSchema)
module.exports = mongoose.model('users', userSchema);

// const user1=new User({
//      name:'joji',
//      location:'pollayil'
// })
// user1.save();















// // const mongoose = require('mongoose')
// const mongoose = require('mongoose')

// // const {Schema}=mongoose

// const UserSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     location:{
//         type:String,
//         required:true
//     },
//     // email:{
//     //     type:String,
//     //     required:true
//     // },
//     // password:{
//     //     type:String,
//     //     required:true
//     // },
//     // date:{
//     //     type:Date,
//     //     default:Date.now
//     // }
// })
// const User=mongoose.model('user',UserSchema)
// module.exports=User