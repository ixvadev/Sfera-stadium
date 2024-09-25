import React from 'react'
import Header from '../../components/header'
import Help from '../../components/help'
import Dashboard from '../../components/dashboard'

const Admin: React.FC = () => {
  return (
    <div>
      <Header/>
      <div className="flex">
        <Help/>
        <div>
          <Dashboard/>
        </div>
      </div>
    </div>
  )
}

export default Admin