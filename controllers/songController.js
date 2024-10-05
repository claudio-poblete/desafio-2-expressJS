const { readRepertoire, writeRepertoire } = require('../utils/fileManager')

const getSongs = (req, res) => {
  const songs = readRepertoire()
  res.json(songs)
}

const addSong = (req, res) => {
  const { title, artist } = req.body
  const songs = readRepertoire()
  const songExists = songs.some(song => song.title === title && song.artist === artist)

  if (songExists) {
    return res.status(400).json({ error: 'La canción y el artista ya existen en el repertorio' })
  }

  const newSong = { id: Date.now().toString(), title, artist }
  songs.push(newSong)
  writeRepertoire(songs)
  res.status(201).json(newSong)
}

const editSong = (req, res) => {
  const { title, artist } = req.body
  const songs = readRepertoire()
  const id = req.params.id
  const songExists = songs.some(song => song.title === title && song.artist === artist && song.id !== id)

  if (songExists) {
    return res.status(400).json({ error: 'La canción y el artista ya existen en el repertorio' })
  }

  const updatedSongs = songs.map(song =>
    song.id === id ? { ...song, title, artist } : song
  )
  writeRepertoire(updatedSongs)
  res.json({ message: 'Canción actualizada' })
}

const deleteSong = (req, res) => {
  const songs = readRepertoire()
  const id = req.params.id
  const updatedSongs = songs.filter(song => song.id !== id)
  writeRepertoire(updatedSongs)
  res.json({ message: 'Canción eliminada' })
}

module.exports = { getSongs, addSong, editSong, deleteSong }

