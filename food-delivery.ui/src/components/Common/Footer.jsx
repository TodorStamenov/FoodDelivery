import React, { Fragment } from 'react'
import './Footer.css'

const Footer = () => (
  <Fragment>
    <div className='filler' />
    <footer className='footer text-white bg-secondary fixed-bottom pt-3 pr-5'>
      <p className='float-right'>&copy; {new Date().getFullYear()} - Food Delivery</p>
    </footer>
  </Fragment>
)

export default Footer
