import React from 'react'

const Footer = () => (
  <div className='row'>
    <footer style={{position: 'fixed', bottom: 0}} className='col-md-2 offset-md-10'>
      <p>&copy; {new Date().getFullYear()} - Food Delivery</p>
    </footer>
  </div>
)

export default Footer
