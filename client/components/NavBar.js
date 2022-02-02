import React from 'react'
import { Link } from 'react-router-dom'
import { images } from 'Utilities/common'
import { getUser } from 'Utilities/services/twitter'

const NavBar = () => {
  const [user, setUser] = React.useState()

  const handleGetUser = async () => {
    const newUser = await getUser()
    setUser(newUser)
  }

  React.useEffect(() => {
    handleGetUser()
  }, [])

  return (
    <div className="navbar">
      <Link to="/">
        <img src={images.miniTweeterLogo} alt="MiniTweeter" />
      </Link>
      <h1>
        MiniTweeter
      </h1>
      <div>
        {!user && (
          <a href="/api/twitter/authenticate">
            <button type="button">Log in</button>
          </a>
        )}
        {user && (
          <>
            <p>
              @
              {user}
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
