const mongoose= require('mongoose')

const orderSchema=new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    orderFoods:{
        type:Array,
        required:true
    }
    // orderDate:{
    //     type:Date,
    //     default:Date.now
    // }
   
})
module.exports = mongoose.model('orders', orderSchema);
