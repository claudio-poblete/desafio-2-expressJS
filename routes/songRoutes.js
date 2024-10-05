const express = require('express')
const router = express.Router()
const { getSongs, addSong, editSong, deleteSong } = require('../controllers/songController')

router.get('/songs', getSongs)
router.post('/songs', addSong)
router.put('/songs/:id', editSong)
router.delete('/songs/:id', deleteSong)

module.exports = router

