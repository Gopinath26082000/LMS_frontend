import React from 'react'
import Home1 from './Home1'
import HomeNavbar from './HomeNavbar'
import Services from './Services'
import WhyChooseUs from './WhyChooseUs'
import OurClients from './OurClients'
import ContactUs from './ContactUs'
import OurStudents from './OurTopStudents'

function Home() {
  return (
    <div>
         <HomeNavbar/>
      <Home1/>
      <br/>
      <Services/>
      <br/>
      <OurStudents/>
      <br/>
      <OurClients/>
      <br/>
      <WhyChooseUs/>
      <br/>
      <ContactUs/>
    </div>
  )
}

export default Home