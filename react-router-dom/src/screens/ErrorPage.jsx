import React from 'react'
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Lo sentimos, algo ha ocurrido.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

ErrorPage.displayName = 'ErrorPage'
export default ErrorPage
