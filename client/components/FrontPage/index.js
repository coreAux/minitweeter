import React from 'react'
import { getTimeline, getMoreTimeline } from 'Utilities/services/twitter'

import { SessionContext } from 'Components/App'
import TweetList from 'Components/FrontPage/TweetList'

const FrontPage = ({ setError, setErrorMessage }) => {
  const [timeline, setTimeline] = React.useState([])
  const [fetchingMoreTweets, setFetchingMoreTweets] = React.useState(false)
  const session = React.useContext(SessionContext)

  React.useEffect(() => {
    const handleGetTimeline = async () => {
      try {
        const newTimeline = await getTimeline()
        setTimeline(newTimeline)
      } catch (e) {
        if (e.response.status === 429) {
          setError(true)
          setErrorMessage("Unfortunately Twitter doesn't allow more than 15 requests per 15 minutes per user, it seems we've managed to exceed that.")
        } else {
          setError(true)
          setErrorMessage(e.message)
        }
      }
    }

    if (session) {
      handleGetTimeline()
    }
  }, [session])

  const handleGetMoreTimeline = async () => {
    setFetchingMoreTweets(true)
    const lastTweetIndex = timeline.length - 1
    const lastTweetId = timeline[lastTweetIndex].id

    try {
      const moreTimeline = await getMoreTimeline(lastTweetId)
      setTimeline((timeline) => [...timeline, ...moreTimeline])
      setFetchingMoreTweets(false)
    } catch (e) {
      if (e.response.status === 429) {
        setError(true)
        setErrorMessage("Unfortunately Twitter doesn't allow more than 15 requests per 15 minutes per user, it seems we've managed to exceed that.")
      } else {
        setError(true)
        setErrorMessage(e.message)
      }
      setFetchingMoreTweets(false)
    }
  }

  if (timeline.length <= 0) {
    return (
      <div className="timeline cloud">
        <h1>Welcome to MiniTweeter</h1>
        <p>
          This is a student project that is a node.js twist on the Minimal Twitter project, part of the course
          {' '}
          <a href="https://www.superhi.com/courses/ajax-and-apis" target="_blank" rel="noopener noreferrer">
            Ajax + APIs
          </a>
          {' '}
          at SuperHi. MiniTweeter is also part of the final project for
          {' '}
          <a href="https://fullstackopen.com/en/part11" target="_blank" rel="noopener noreferrer">
            part 11
          </a>
          {' '}
          (CI/CD) of
          {' '}
          <a href="https://fullstackopen.com/en/" target="_blank" rel="noopener noreferrer">
            Full Stack Open
          </a>
          {' '}
          .
        </p>
        <p>
          MiniTweeter was forked from
          {' '}
          <a href="https://github.com/fullstack-hy2020/create-app" target="_blank" rel="noopener noreferrer">
            fullstack-hy2020/create-app
          </a>
          {' '}
          and uses icons from
          {' '}
          <a href="https://svgrepo.com/" target="_blank" rel="noopener noreferrer">
            svgrepo.com
          </a>
          {' '}
          .
        </p>
        <p>
          If you&apos;re curious about the code, please
          {' '}
          <a href="https://github.com/coreAux/minitweeter" target="_blank" rel="noopener noreferrer">
            check out the repo
          </a>
          {' '}
          .
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="timeline">
        {timeline.map((tweet) => (
          <TweetList key={tweet.id} tweet={tweet} />
        ))}
        <button disabled={fetchingMoreTweets} onClick={() => handleGetMoreTimeline()} type="button">{fetchingMoreTweets ? 'Loading more tweets...' : 'Load more tweets'}</button>
      </div>
    </>
  )
}

export default FrontPage
