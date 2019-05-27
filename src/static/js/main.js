(function() {
  const form = document.querySelector('.chat-form')
  const ul = document.querySelector('#messages')
  const input = document.querySelector('#m')
  // const oneBtn = document.querySelector('#one')
  // const twoBtn = document.querySelector('#two')
  // const threeBtn = document.querySelector('#three')

  var socket = io()

  socket.on('welcomeMessage', function(res) {

    var msg = `welcome to ${res}`
    var newLi = document.createElement('li')
		newLi.setAttribute('class', 'welcome')
		newLi.textContent = msg
		ul.append(newLi)

  })

  socket.on('connectedUser', function(res) {

    console.log(res.id);

    var msg = `${res.id} joined the room`
    var newLi = document.createElement('li')
		newLi.setAttribute('class', 'joined')
		newLi.textContent = msg
		ul.append(newLi)

  })

  socket.on('room', function() {

    var url = splitUrl();
    socket.emit('joinRoom', { roomNumber: url.roomNumber });

  })

  form.addEventListener('submit', function(e) {
		e.preventDefault()

    if (input.value.length > 0 && input.value !== ' ' && input.value !== '  ' && input.value !== '   ') {
      socket.emit('chat message', input.value)

      var newLi = document.createElement('li')
      newLi.setAttribute('class', 'me')
      newLi.textContent = input.value
      ul.append(newLi)

      input.value = ''
  		return false
    } else {
      console.log("jemoer");
    }

  })

	socket.on('chatMessage', function(msg) {

    var newLi = document.createElement('li')
		newLi.setAttribute('class', 'other')
		newLi.textContent = msg.message
		ul.append(newLi)

  })


}())

// oneBtn[0].addEventListener('click', () => {
//   socket.on('roomOne', function(msg) {
//
//     console.log("euy");
//
//   })
// })

function splitUrl() {
    var url_array = document.location.href.split('/');
    var url = {
        roomNumber: url_array[url_array.length - 1]
    }
    return url
}
