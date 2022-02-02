const Router = require('express')
const messages = require('@controllers/messagesController')
const twitter = require('@controllers/twitterController')

const router = Router()

router.get('/messages', messages.getAll)
router.post('/messages', messages.create)
router.delete('/messages/:id', messages.destroy)

router.get('/twitter/authenticate', twitter.authenticate)
router.get('/twitter/callback', twitter.callback)
router.get('/twitter/timeline', twitter.timeline)
router.get('/twitter/user', twitter.user)
router.get('/twitter/logout', twitter.logout)

module.exports = router
