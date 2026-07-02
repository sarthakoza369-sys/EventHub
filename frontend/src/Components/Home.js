import React from 'react'
import Event from './Event'

const Home = (props) => {
  return (
    <div>
      <Event showAlert={props.showAlert}/>
    </div>
  )
}

export default Home
