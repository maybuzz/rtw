'use strict'

const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
const express = require('express')
const TwitterStreamChannels = require('twitter-stream-channels')
const credentials = require('/config.js')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3333

require('dotenv').config()

app
	.use(express.static(path.join(__dirname, 'src/static')))
	.use(express.urlencoded({ extended: true }))
	.use(express.json())
	.set('view engine', 'ejs')
	.set('views', path.join(__dirname, 'src/views'))
	.get('/', index)
  .get('/room-1', roomOne)

// db
const collection = JSON.parse(fs.readFileSync('./src/static/db/data.json', 'UTF8'))
const children = collection[0].children

// twitter
const client = new TwitterStreamChannels({
	consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
})

const channels = {
	"languages" : ['html', 'css', 'javascript','nodejs']
}

let stream = client.streamChannels({ track: channels, language: 'en', tweet_mode: "extended" })

// twitter stream
stream.on('channels/languages', function(stream) {
    let tweet = {
        body: stream.text.toLowerCase(),
        date: stream.created_at,
    }
    checkString(tweet)
})


function checkString(tweet) {
	let txt = tweet.body

	if (txt.includes('javascript')) {
    console.log('JS TWEET', txt)
		children[0].children.push({name: txt, value: 75})
		fs.writeFileSync('./src/static/db/data.json', JSON.stringify(collection))
  } else if (txt.includes('html')) {
		console.log('HTML TWEET', txt)
		children[1].children.push({name: txt, value: 25})
		fs.writeFileSync('./src/static/db/data.json', JSON.stringify(collection))
	} else if (txt.includes('css')) {
		console.log('CSS TWEET', txt)
		children[2].children.push({name: txt, value: 50})
		fs.writeFileSync('./src/static/db/data.json', JSON.stringify(collection))
	} else if (txt.includes('nodejs')) {
		console.log('NODEJSTWEET', txt)
		children[3].children.push({name: txt, value: 100})
		fs.writeFileSync('./src/static/db/data.json', JSON.stringify(collection))
	} else (
		console.log("languages: nope")
	)
}

io.on('connection', function(socket) {
	console.log('user connected ' + '(' + socket.id + ')')

	socket.emit('welcomeMessage')

  socket.emit('room')

  socket.on('joinRoom', function(url) {
    socket.join(url.roomNumber)
		socket.broadcast.emit('connectedUser', {id: socket.id})
  })

	socket.on('chatMessage', function(msg) {
		socket.broadcast.emit('chatMessage', {message: msg})
	})

	socket.on('disconnect', function() {
		console.log('user disconnected ' + '(' + socket.id + ')')
	})
})

// templates
function index(req, res) {
	res.render('main')
}

function roomOne(req, res) {

	const countJs = children[0].children.length
	const countHtml = children[1].children.length
	const countCss = children[2].children.length
	const countNode = children[3].children.length

	res.render('room', {
		js: countJs,
		html: countHtml,
		css: countCss,
		node: countNode
	})
}

http.listen(port, function() {
	console.log('listening on: ' + port)
})
