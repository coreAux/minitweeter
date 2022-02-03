import React from 'react'
import { getTimeline } from 'Utilities/services/twitter'

import TweetList from 'Components/FrontPage/TweetList'

const FrontPage = () => {
  const [timeline, setTimeline] = React.useState([])

  const handleGetTimeline = async () => {
    const newTimeline = await getTimeline()
    setTimeline(newTimeline)
  }

  React.useEffect(() => {
    handleGetTimeline()
  }, [])

  // React.useEffect(() => {
  //   console.log('Timeline: ', timeline)
  // }, [timeline])

  if (timeline.length <= 0) {
    return (
      <div className="timeline cloud">
        <h1>Welcome to MiniTweeter</h1>
        <p>
          This is a student project that is a node.js twist on the Minimal Twitter part of the course
          {' '}
          <a href="https://www.superhi.com/courses/ajax-and-apis" target="_blank" rel="noopener noreferrer">
            Ajax + APIs
          </a>
          {' '}
          at SuperHi and mixes the CI/CD (part 11) of Full Stack Open 2021.
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
        </p>
        <ul>
          <li>https://www.npmjs.com/package/twitter</li>
          <li>https://www.npmjs.com/package/oauth</li>
          <li>https://www.npmjs.com/package/twitter-text</li>
        </ul>
      </div>
    )
  }

  return (
    <>
      <div className="timeline">
        {timeline.map((tweet) => (
          <TweetList key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </>
  )
}
export default FrontPage
