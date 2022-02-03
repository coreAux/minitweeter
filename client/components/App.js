import React from 'react'
import { getUser } from 'Utilities/services/twitter'

import NavBar from 'Components/NavBar'
import Footer from 'Components/Footer'
import FrontPage from 'Components/FrontPage'
import Error from 'Components/Error'

export const SessionContext = React.createContext()

export default () => {
  const [user, setUser] = React.useState()
  const [error, setError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')

  React.useEffect(() => {
    const handleUser = async () => {
      const hasSession = await getUser()
      if (hasSession) {
        setUser(hasSession)
      } if (!hasSession) {
        setUser(false)
      }
    }

    handleUser()
  }, [])

  return (
    <>
      <SessionContext.Provider
        value={user}
      >
        <NavBar />
        <div className="content">
          {error && <Error errorMessage={errorMessage} setError={setError} />}
          <FrontPage
            setError={setError}
            setErrorMessage={setErrorMessage}
          />
        </div>
        <Footer />
      </SessionContext.Provider>
    </>
  )
}
