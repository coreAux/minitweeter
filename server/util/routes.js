const Router = require('express')
const twitter = require('@controllers/twitterController')

const router = Router()

router.get('/health', (req, res) => {
  res.send('ok')
})

router.get('/twitter/authenticate', twitter.authenticate)
router.get('/twitter/callback', twitter.callback)
router.get('/twitter/timeline', twitter.timeline)
router.post('/twitter/moreTimeline', twitter.moreTimeline)
router.get('/twitter/user', twitter.user)
router.get('/twitter/logout', twitter.logout)

module.exports = router
