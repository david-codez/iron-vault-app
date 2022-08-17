import React from 'react'
import { useSelector } from 'react-redux'


const Dashboard = (props: any) => {
  
  const user = props.user
  console.log(props)

  console.log(props.user);
  
  return (
    <>
            <div className='welcome-message'>
              { user ? <h1>Hello, {user.name}!</h1> : <></> }
            </div>
    </>

  )
}

export default Dashboard