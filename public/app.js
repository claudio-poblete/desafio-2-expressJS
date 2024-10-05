const form = document.getElementById('song-form')
const songList = document.getElementById('song-list')
const songIdInput = document.getElementById('song-id')
const alertMessage = document.getElementById('alert-message')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = document.getElementById('song-title').value
    const artist = document.getElementById('artist').value
    const id = songIdInput.value

    alertMessage.innerHTML = ''

    if (!title || !artist) {
        alertMessage.innerHTML = 'Por favor, ingresa ambos datos: título y artista'
        return
    }

    if (id) {
        fetch(`/songs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, artist }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alertMessage.innerHTML = data.error
            } else {
                loadSongs()
                form.reset()
                songIdInput.value = ''
            }
        })
    } else {
        fetch('/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, artist }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alertMessage.innerHTML = data.error
            } else {
                loadSongs()
                form.reset()
            }
        })
    }
})

const loadSongs = () => {
    fetch('/songs')
    .then(response => response.json())
    .then(songs => {
        songList.innerHTML = ''
        songs.forEach(song => {
            const li = document.createElement('li')
            li.innerHTML = `
                <span><strong>Canción:</strong> ${song.title}</span>
                <span><strong>Artista:</strong> ${song.artist}</span>
                <div>
                    <button onclick="editSong('${song.id}')">Editar</button>
                    <button onclick="deleteSong('${song.id}')">Eliminar</button>
                </div>
            `
            li.style.display = 'flex'
            li.style.justifyContent = 'space-between'
            li.style.alignItems = 'center'
            songList.appendChild(li)
        })
    })
}

const editSong = (id) => {
    fetch(`/songs/${id}`)
    .then(response => response.json())
    .then(song => {
        document.getElementById('song-title').value = song.title
        document.getElementById('artist').value = song.artist
        songIdInput.value = song.id
    })
}

const deleteSong = (id) => {
    fetch(`/songs/${id}`, {
        method: 'DELETE',
    }).then(() => loadSongs())
}

loadSongs()

