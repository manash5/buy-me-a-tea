import React from 'react'
import PaymentPage from '@/components/PaymentPage'

const UsernamePage = ({params}) => {
  const {username} = React.use(params); 
  return (
    <> 
    <PaymentPage username ={username}/> 
    </>
  )
  
}

export default UsernamePage
