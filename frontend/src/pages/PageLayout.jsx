import React from 'react'
import Header from '../components/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import { ErrorBoundary } from "react-error-boundary"
import ErrorBoundaryEle from '../components/ErrorBoundaryEle'

function PageLayout() {

  const navigator = useNavigate();

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryEle}
    onReset={() => {
      navigator("/")
      window.location.reload();
    }}
    >
    <>
        <Header/>
        <Outlet/>
    </>
    </ErrorBoundary>
  )
}

export default PageLayout
