import { useState } from 'react'
import { Button } from 'antd'
import 'antd/dist/reset.css'
import UserForm from './assets/components/UserForm'

function App() {
  const [users, setUsers] = useState([])
  const [editUser, setEditUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSave = (user) => {
    if (editUser) {
      setUsers(users.map(u => u.email === editUser.email ? user : u))
    } else {
      setUsers([...users, user])
    }
    setEditUser(null)
    setIsModalOpen(false)
  }

  const handleEdit = (user) => {
    setEditUser(user)
    setIsModalOpen(true)
  }

  const handleDelete = (email) => {
    setUsers(users.filter(u => u.email !== email))
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User List</h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>+ Add User</Button>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-500 text-center">No users added yet.</p>
      ) : (
        users.map(user => (
          <div key={user.email} className="border rounded p-4 mb-3 shadow-sm flex justify-between items-center">
            <div>
              <p><strong>{user.name}</strong> ({user.age})</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleEdit(user)}>Edit</Button>
              <Button danger onClick={() => handleDelete(user.email)}>Delete</Button>
            </div>
          </div>
        ))
      )}

      <UserForm
        open={isModalOpen}
        onClose={() => {
          setEditUser(null)
          setIsModalOpen(false)
        }}
        onSave={handleSave}
        editUser={editUser}
      />
    </div>
  )
}

export default App
