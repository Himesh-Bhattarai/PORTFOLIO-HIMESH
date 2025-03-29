import React from 'react'
import Navbar from './navbar'
import About from './about'
import Portfolio from './portfolio'
import Experience from './experience'
import Resume from './resume'
import Contact from './contact'
import Home from './Home'

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <Home />
            <About />
            <Portfolio />
            <Experience />
            <Resume />
            <Contact />
        </>
    )
}
