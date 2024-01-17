const mongoose = require('mongoose')
const uri = "mongodb+srv://username:username@cluster101.0ktl0i6.mongodb.net/curryclan?retryWrites=true&w=majority";

// const connect =()=>{

//      mongoose.connect(uri).then(console.log('connected..'))
//      // const fetcheddata=await mongoose.connection.db.collection('user')
//      // console.log(fetcheddata)
// }
// module.exports=connect;

connectMongo = () => {
     mongoose.connect(uri)
          .then(() => {
               console.log('connected to mongodb..')
               mongoose.connection.db.collection("foodItems").find({}).toArray().then((data, err) => {
                    if (err) {
                         console.log(err)
                    }
                    else {
                         global.foodItems = data
                    }
               })
               mongoose.connection.db.collection("foodCategory").find({}).toArray().then((data, err) => {
                    if (err) {
                         console.log(err)
                    }
                    else {
                         global.foodCategory = data
                    }
               })
          })
          .catch((err) => console.log(err))
}
module.exports = { connectMongo };
