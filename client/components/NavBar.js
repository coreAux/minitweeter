import React from 'react'
import { Link } from 'react-router-dom'
import { images } from 'Utilities/common'

import { SessionContext } from 'Components/App'

const NavBar = () => {
  const session = React.useContext(SessionContext)

  return (
    <div className="navbar">
      <div className="cloud">
        <Link to="/">
          <img src={images.miniTweeterLogo} alt="MiniTweeter" />
        </Link>
      </div>
      <div className="cloud">
        <Link className="title" to="/">
          <h1>
            MiniTweeter
          </h1>
        </Link>
      </div>
      <div className="cloud">
        {!session && (
          <a href="/api/twitter/authenticate">
            <button type="button">Log in</button>
          </a>
        )}
        {session && (
          <>
            <p>
              @
              {session}
            </p>
            <a href="/api/twitter/logout">
              <button type="button">Log out</button>
            </a>
          </>
        )}
      </div>
    </div>
  )
}

export default NavBar
