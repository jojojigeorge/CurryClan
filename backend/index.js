const express = require('express')
const app = express()
const port = 5000
const userRouter=require('./routes/userRouter')
const displayData=require('./routes/displayData')
const orderRouter=require('./routes/orderRouter')
var cors = require('cors');

const db=require('./db')
db.connectMongo()


app.use(express.json())
app.use(cors())
app.use('/userrouter',userRouter)
app.use('/api/displaydata',displayData)
app.use('/checkout',orderRouter)






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`CurryClan [BackEnd] listening on port ${port}`)
})

