(function() {
  const form = document.querySelector('.chat-form')
  const ul = document.querySelector('#messages')
  const input = document.querySelector('#m')

  console.log("have fun");

  const socket = io()

  socket.on('welcomeMessage', function(res) {

    const msg = `welcome!`
    const newLi = document.createElement('li')
		newLi.setAttribute('class', 'welcome')
		newLi.textContent = msg
		ul.append(newLi)

  })

  socket.on('connectedUser', function(res) {

    const msg = `${res.id} joined the room`
    const newLi = document.createElement('li')
		newLi.setAttribute('class', 'joined')
		newLi.textContent = msg
		ul.append(newLi)

  })

  socket.on('room', function() {

    const url = splitUrl();
    socket.emit('joinRoom', { roomNumber: url.roomNumber });

  })

  form.addEventListener('submit', function(e) {
		e.preventDefault()

    if (input.value.length > 0 && input.value !== ' ' && input.value !== '  ' && input.value !== '   ') {
      socket.emit('chat message', input.value)

      const newLi = document.createElement('li')
      newLi.setAttribute('class', 'me')
      newLi.textContent = input.value
      ul.append(newLi)

      input.value = ''
  		return false
    } else {
      console.log("ewa mag niet");
    }

  })

	socket.on('chatMessage', function(msg) {

    const newLi = document.createElement('li')
		newLi.setAttribute('class', 'other')
		newLi.textContent = msg.message
		ul.append(newLi)

  })


}())

function splitUrl() {
    const url_array = document.location.href.split('/');
    const url = {
        roomNumber: url_array[url_array.length - 1]
    }
    return url
}
