const { ApplicationError } = require('@util/customErrors')
const oauth = require('oauth')
const Twitter = require('twitter')

const callbackURI = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api/twitter/callback' : 'https://minitweeter-fso21.herokuapp.com/api/twitter/callback'

const oauthConsumer = new oauth.OAuth(
  'https://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token',
  process.env.TWITTER_API_KEY,
  process.env.TWITTER_API_KEY_SECRET,
  '1.0A', callbackURI, 'HMAC-SHA1',
)

const getOAuthRequestToken = () => new Promise((resolve, reject) => {
  oauthConsumer.getOAuthRequestToken((error, oauthRequestToken, oauthRequestTokenSecret, results) => (error
    ? reject(new ApplicationError('Error getting OAuth request token'))
    : resolve({ oauthRequestToken, oauthRequestTokenSecret, results })))
})

const authenticate = async (req, res) => {
  const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken()

  req.session = req.session || {}
  req.session.oauthRequestToken = oauthRequestToken
  req.session.oauthRequestTokenSecret = oauthRequestTokenSecret

  const authorizationUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthRequestToken}`
  res.redirect(authorizationUrl)
}

const getOAuthAccessTokenWith = ({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier }) => new Promise((resolve, reject) => {
  oauthConsumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier, (error, oauthAccessToken, oauthAccessTokenSecret, results) => (error
    ? reject(new ApplicationError('Error getting OAuth access token'))
    : resolve({ oauthAccessToken, oauthAccessTokenSecret, results })))
})

const callback = async (req, res) => {
  const { oauthRequestToken, oauthRequestTokenSecret } = req.session
  const { oauth_verifier: oauthVerifier } = req.query

  const { oauthAccessToken, oauthAccessTokenSecret, results } = await getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier })
  req.session.oauthAccessToken = oauthAccessToken
  req.session.oauthAccessTokenSecret = oauthAccessTokenSecret

  const { screen_name: screenName } = results

  req.session.twitter_screen_name = screenName

  res.cookie('twitter_screen_name', screenName, { maxAge: 900000, httpOnly: true })

  req.session.save(() => res.redirect('/'))
}

const timeline = (req, res) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_KEY_SECRET,
    access_token_key: req.session.oauthAccessToken,
    access_token_secret: req.session.oauthAccessTokenSecret,
  })

  const params = { screen_name: req.session.twitter_screen_name, include_entities: false, count: 20 }

  client.get('statuses/home_timeline', params, (error, tweets) => {
    if (error && error[0].code === 88) {
      res.status(429).send()
    } else if (error) {
      res.status(500).send()
    } else {
      res.send(tweets)
    }
  })
}

const moreTimeline = (req, res) => {
  const { maxId } = req.body
  const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_KEY_SECRET,
    access_token_key: req.session.oauthAccessToken,
    access_token_secret: req.session.oauthAccessTokenSecret,
  })

  const params = {
    screen_name: req.session.twitter_screen_name,
    include_entities: false,
    count: 21,
    max_id: maxId,
  }

  client.get('statuses/home_timeline', params, (error, tweets) => {
    if (error && error[0].code === 88) {
      res.status(429).send()
    } else if (error) {
      res.status(500).send()
    } else {
      tweets.splice(0, 1)
      res.send(tweets)
    }
  })
}

const logout = (req, res) => {
  res.clearCookie('twitter_screen_name')
  req.session.destroy(() => res.redirect('/'))
}

const user = (req, res) => {
  res.send(req.session.twitter_screen_name)
}

module.exports = {
  timeline,
  moreTimeline,
  authenticate,
  callback,
  logout,
  user,
}
