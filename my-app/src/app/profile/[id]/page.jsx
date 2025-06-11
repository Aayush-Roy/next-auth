import React from 'react'

const UserProfile = ({params}) => {
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <p>Profile Page {params.id}</p>
    </div>
  )
}

export default UserProfile
