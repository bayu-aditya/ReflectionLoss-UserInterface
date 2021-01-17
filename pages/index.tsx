import { useEffect } from 'react'
import Router from 'next/router'
import Head from "next/head";
import { Typography } from '@material-ui/core'

export default function HomePage() {
  useEffect(() => {
    const { pathname } = Router
    if(pathname == '/' ){
       Router.push('/simulation')
    }
  })

  return (
    <div 
      style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh"}}
    >
      <Head>
        <title>Reflection Loss</title>
      </Head>

      <Typography variant="h5">Redirect to Reflection Loss Calculation: Simulation Mode</Typography>
      <Typography variant="body2">Initialize Calculate Engine, Please Wait</Typography>
    </div>
  )
}