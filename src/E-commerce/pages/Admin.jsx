import React from 'react'

import { Outlet} from 'react-router-dom'

import AdminNav from '../components/AdminNav'

import './Admin.scss'


function Admin() {
  return (
     <div className='admin'>
        <AdminNav />
        <Outlet />
    </div>
  )
}

export default Admin