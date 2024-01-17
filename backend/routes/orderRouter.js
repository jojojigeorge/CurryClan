const express = require('express')
const router = express.Router()
const { body, query, validationResult } = require('express-validator')

const orderModel = require('../models/orderModel')

//url=>/checkout
router.post('/', (req, res) => {
    let DATA=req.body.cartData
    DATA.splice(0,0,{'orderDate':req.body.orderDate})
    let eid = null
    orderModel.findOne({ 'email': req.body.email }).then(result => {
        console.log("result of findone-------------------- ", result)
        console.log("DATA-------------------- ", DATA)
        // eid = result.email
        // console.log('eid', result.email)
        if (result === null||result.email===null) {
            orderModel.create({
                email: req.body.email,
                orderFoods: [DATA]
                // orderDate:req.body.orderDate
            }).then(res.json({ success: true }))
        }else {
            orderModel.findOneAndUpdate({ email: req.body.email },
                {
                    $push: { orderFoods: DATA }
                }).then(() => {
                    res.json({ success: true })
                })
        }
    })
    // res.json({ error: 'error eid not found' })
   
});


router.post('/myorder', 
	(req, res) => {
		orderModel.findOne({ email: req.body.email }    )
			.then(result => {
                if(result)
				//   console.log("result:=======================")
				res.json(result)
                else
                    res.json({error:'no data found'})
			})
			.catch(err => res.json(err));
})

module.exports = router