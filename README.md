# Programmers on Twitter

## Summary
`A representation of tweets concerning programming languages. This application includes a chat function (made with socket.io) and a 'circle packing' data visualization (made with d3).`

![rtw final](/img/rtw-final.png)

## Table of contents
- [Live demo](#Live-demo)
- [Install](#Install)
- [Concept](#Concept)
  - [Tags & datavis](#Tags-&-datavis)
- [API](#API)
- [Data](#Data)
- [To-do](#To-do)
- [Resources](#Resources)

## Live demo
[Click here](...) to see my live demo.

## Install
To install this project you'll have to fork this repository and open your terminal

```bash
  # insert your username to this link
  # put this in your terminal to clone the repo
  git clone https://github.com/your-user-name/rtw/
```

## Concept
This concept is called "Programmers on Twitter" and shows the amount of tweets containing certain words. Initially I wanted to setup different rooms to stream different channels. This didn't work out -yet-, so for now there is only one room with one stream. The room contains a chat, a datavis and a counter overview.

### Tags & datavis
I used the tags `javascript`, `html`, `css` and `nodejs` to collect tweets. I used these tweets to create a data visualization. The collected tweets are separated by language. Each language contains it's own tweets. The data is structured in a tree structure. This means there is hierarchy in the data which is translated to the levels of the circles.

## API
The following code snippet show my setup for incoming tweets. I have setup a connection with Twitter and I can collect multiple tags using a stream. I'm using a package called `TwitterStreamChannels`. This allows me to setup a stream and search multiple tags instead of a single search.

```js
const channels = {
	"languages" : ['html', 'css', 'javascript','nodejs']
}

stream.on('channels/languages', function (tweet) {
  // code to append or remove stuff etc
})
```

## Data life-cycle
![data cycle](/img/datalifecycle.png)

## To-do
- [x] basic chat application, [week 1](https://github.com/maybuzz/real-time-web-1819/blob/master/week-1.md)
- [x] concept
- [x] connect to twitter api
- [ ] setup different streams
- [x] save tweets to db (json)
- [x] socket.io
- [ ] setup different rooms
- [ ] save chat data to db
- [x] d3 data visualization
- [x] counter overview
- [x] data life cycle diagram
- [ ] heroku

## License
[MIT](LICENSE) © [Luna May Johansson](https://github.com/maybuzz)
