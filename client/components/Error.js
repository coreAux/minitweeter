import React from 'react'

export const Error = ({ setError, errorMessage }) => (
  <div className="error">
    <h1>An error has occurred!</h1>
    <p>{errorMessage}</p>
    <button className="errorButton" onClick={() => setError(false)} type="button">Ok</button>
  </div>
)

export default Error
