import React from 'react'
import Navigation from '../components/Navigation'
import { Outlet, ScrollRestoration } from 'react-router-dom'

const RootLayout = () => {
    return (
        <div className='relative h-screen w-full'> 
            <Navigation />
            <Outlet />
        </div>
    )
}

export default RootLayout