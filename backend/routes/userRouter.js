const express = require('express')
const router = express.Router()
const { body, query, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const saltRounds = 10;
var jwt = require('jsonwebtoken');

const userModel = require('../models/userModel')

// router.post(
// 	'/hello',
// 	// username must be an email
// 	// body('email').isEmail(),
// 	// password must be at least 5 chars long
// 	body('password').isLength({ min: 5 }),
// 	(req, res) => {
// 		// Finds the validation errors in this request and wraps them in an object with handy functions
// 		const errors = validationResult(req);
// 		if (!errors.isEmpty()) {
// 			return res.status(400).json({ errors: errors.array() });
// 		}


// 		userModel.create({
// 			username: req.body.username,
// 			password: req.body.password,
// 			email: req.body.email,
// 			location: req.body.location,
// 			name: req.body.name,
// 		}).then(user => res.json(user));
// 	},
// );
// router.get('/hello', query('person').notEmpty(), (req, res) => {
// 	const result = validationResult(req);
// 	if (result.isEmpty()) {
// 		return res.send(`Hello, ${req.query.person}!`);
// 	}

// 	res.send({ errors: result.array() });
// });




// working------------------------------------------------
// router.put('/login',
// 	body('password').isLength({ min: 5 }),
// 	body('email').isEmail(),
// 	(req, res) => {
// 		const errors = validationResult(req);
// 		if (!errors.isEmpty()) {
// 			res.send({ errors: errors.array() });
// 		} else {
// 			eml = req.body.email,
// 				userModel.findOne({ email: eml })
// 					.then(result => {
// 						//email und but password can be correct or not
// 						if (result)
// 						{
// 							console.log('testing')
// 							hash = result.password
// 							bcrypt.compare(req.body.password, hash).then(function (result) {
// 								console.log("result-------------", result);

// 								if (!result) { //password error
// 									res.json({ login: false, error: "Try Logging in with correct credentials" });
// 								} else {
// 									res.json({ login: true })
// 								}
// 							});
// 						}
// 					})
// 					.catch(err => {
// 						console.log('--------------------after email check inside backend//routes//login catch block');

// 						res.json({ error: 'after email check inside backend//routes//login catch block' })
// 					})






// 			// pas = req.body.password,
// 			// 	eml = req.body.email,
// 			// 	// userModel.create({
// 			// 	//   password: req.body.password,
// 			// 	//   email: req.body.email,
// 			// 	//   location: req.body.location,
// 			// 	//   name: req.body.name,
// 			// 	userModel.findOne({ "email": eml, "password": pas }).then(user => { res.json({ data: true }) })
// 			// 		.catch(err => res.json(err))
// 		}
// 	}
// );
router.put('/login',
	body('password').isLength({ min: 5 }),
	body('email').isEmail(),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log('test joji', req.body)
			res.send({ errors: errors.array() });
		} else {
			eml = req.body.email
			userModel.findOne({ "email": eml }).then(result => {
				if (result) {//email exist 
					userId=result._id
					hash = result.password
					bcrypt.compare(req.body.password, hash, function (err, result) {
						if (result) {//email exist and correct password
							const data={
								user:{id:userId}
							}
							const jwtSecret='Synchronous Sign with default (HMAC SHA256)'
							const jwToken=jwt.sign(data,jwtSecret, { expiresIn: 60 * 60 })
							res.json({ login: result,jwToken:jwToken })
						} else {//email exist but incorrect password
					res.json({ login: result, errors: "Try Logging in with correct credentials, email exist but incorrect password" })
						}
					});
				} else {//email not exist and incorrect password
					res.json({ login: result, errors: "Try Logging in with correct credentials, email not exist and incorrect password" })
				}
			})
		}
	}
);

router.get('/', 
	(req, res) => {
		userModel.find({})
			.then(result => {
				//   console.log("result:",result)
				res.json(result)
			})
			.catch(err => res.json(err));
}),
router.post('/',
	body('password').isLength({ min: 5 }),
	body('email').isEmail(),
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.send({ errors: errors.array() });
		} else {
			bcrypt.genSalt(saltRounds, function (err, salt) {
				bcrypt.hash(req.body.password, salt, function (err, hash) {
					userModel.create({
						password: hash,
						email: req.body.email,
						location: req.body.location,
						name: req.body.name,
					}).then(user => res.json(user))
						.catch(err => res.json(err))
				});
			});

		}
	},
);

router.put('/:id', 
(req, res) => {
	const { id } = req.params

	const user = req.body
	// userModel.create(user)
	userModel.findOneAndUpdate({ _id: id }, [{ $set: { name: user.name, password: user.password, email: user.email, location: user.location } }], { returnDocument: 'after' })

		.then(result => {

			res.json(result)
		})
		.catch(err => {console.log('error in edit in ',res);res.json(err)})
}),
router.delete('/:id',
 (req, res) => {
	const { id } = req.params
	userModel.findByIdAndDelete({ _id: id })
		.then(result => {
			res.json(result)
		})
		.catch(err => {console.log('delete error');res.json(err)})
})

module.exports = router






// router.get('/', (req, res) => {
//     userModel.find({})
//     .then(result=>{
//         console.log("result:",result)
//         res.json(result)})
//     .catch(err=>res.json(err));
// })