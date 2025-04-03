import React from 'react'
import Navbar from './Navbar.jsx'
import About from './About.jsx'
import Portfolio from './Portfolio.jsx'
import Experience from './Experience.jsx'
import Resume from './Resume.jsx'
import Contact from './Contact.jsx'
import Home from './Home.jsx'
import Footer from './Footer.jsx'

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
            <Footer />
        </>
    )
}
