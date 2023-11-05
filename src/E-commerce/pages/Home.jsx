import React from 'react'
import './Home.scss'
import Empty from '../components/Empty'

function Home() {
  let Content = <Empty text='Home is Empty right, try others 😁' />
  return (
    <div className='home'>
    {Content}
    </div>
  )
}

export default Home