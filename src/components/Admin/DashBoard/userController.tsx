
'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface User {
  _id: string;
  name: string;
  email: string;
  joinedClassrooms: string[];
  createdClassrooms: string[];
  blocked: boolean;
}

const userController = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const handleBlockUser = async (userId: string) => {
    // Implement the logic to block a user
  };

  const handleEditUser = (userId: string) => {
    // Implement the logic to edit a user
  };

  const handleAddUser = () => {
    // Implement the logic to add a user
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <input 
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search users..."
          className="border border-gray-300 rounded-md p-2"
        />
        <button 
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add User
        </button>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 border">Name</th>
            <th className="py-2 border">Email</th>
            <th className="py-2 border">Joined Classrooms</th>
            <th className="py-2 border">Created Classrooms</th>
            <th className="py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td className="py-2 border">{user.name}</td>
              <td className="py-2 border">{user.email}</td>
              <td className="py-2 border">{user.joinedClassrooms.join(', ')}</td>
              <td className="py-2 border">{user.createdClassrooms.join(', ')}</td>
              <td className="py-2 border">
                <button 
                  onClick={() => handleBlockUser(user._id)}
                  className="text-red-500 mr-2"
                >
                  Block
                </button>
                <button 
                  onClick={() => handleEditUser(user._id)}
                  className="text-blue-500"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default userController;
