/* eslint-disable react/no-danger */
import React from 'react'
import twttrtxt from 'twitter-text'

const TweetList = ({ tweet }) => (
  <div className="tweet cloud">
    <h2 dangerouslySetInnerHTML={{ __html: twttrtxt.autoLink(tweet.text) }} />
    <div className="info">
      <p>
        <img src={tweet.user.profile_image_url_https} alt={tweet.user.screen_name} />
        {tweet.user.screen_name}
      </p>
      <p>
        {tweet.retweet_count}
        {' '}
        retweets
      </p>
    </div>
  </div>
)

export default TweetList
