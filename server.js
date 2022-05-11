const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Halo Duniaku!')
})

// users
const users = [
	{
		id: 1,
		name: 'John Doe',
		age: 22,
	},
	{
		id: 2,
		name: 'Jane Dae',
		age: 21,
	},
]

/**
 * 3 cara mengirim data melalui request
 * 	- query string / query params
 * 	- params
 * 	- body
 */

app.get('/users', (req, res) => {
	const { query } = req

	const result = query.search
		? users.filter(user =>
				user.name.toLowerCase().includes(query.search.toLowerCase()),
		  )
		: users

	res.send(result)
})

app.post('/users', (req, res) => {
	const { body } = req

	users.push(body)

	res.status(201).json(body)
})

app.put('/users/:id', (req, res) => {
	const { body, params } = req

	const idx = users.findIndex(user => user.id === parseInt(params.id, 10))

	if (idx === -1) {
		return res.status(404).json({
			message: 'error',
			error: 'user not found',
		})
	}

	users[idx].name = body.name
	users[idx].age = body.age

	res.status(200).json({
		message: 'success',
		data: users[idx],
	})
})

app.delete('/users/:id', (req, res) => {
	const { params } = req

	const idx = users.findIndex(user => user.id === parseInt(params.id, 10))

	if (idx === -1) {
		return res.status(404).json({
			message: 'error',
			error: 'user not found',
		})
	}

	users.splice(idx, 1)

	res.status(200).json({
		message: 'success',
		data: null,
	})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
