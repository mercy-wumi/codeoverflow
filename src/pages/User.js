import React from 'react'
import Sidebar from '../components/Sidebar'
import { BiSearch } from 'react-icons/bi'

const users = [
  {
    id: 1,
    name: 'John',
    questions: 20,
    tags: ['react', 'node', 'express', 'mongodb']
  },
  {
    id: 2,
    name: 'Sade',
    questions: 20,
    tags: ['react', 'node', 'express', 'mongodb']
  },
  {
    id: 3,
    name: 'Macy',
    questions: 20,
    tags: ['react', 'node', 'express', 'mongodb']
  },
  {
    id: 4,
    name: 'Fred',
    questions: 20,
    tags: ['react', 'node', 'express', 'mongodb']
  },

]

const User = () => {
  return (
    <div className='row'>
      <Sidebar />
      <div className='user'>
        <div className='user-title'>
          <h4>Users</h4>
          <div className='filter-user'>
            <BiSearch />
            <input type='text' placeholder='Filter by user' />
          </div>
        </div>
        <div className='users-collection'>
          {users.map(user => (
            <div key={user.id} className='user-profile'>
              <span className='user-profile-img'>{user.name[0]}</span>
              <div className='user-profile-details'>
                <span>{user.name}</span>
                <span className='questn-number'>{user.questions}</span>
                {user.tags.map(tag => (<span className='tag'>{tag}</span>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default User