import React, { useEffect, useState } from 'react';
import { fetchData, addData, editData, deleteData } from '../commponents/dataService';

function Users() {
    const [users, setUsers] = useState([]);  // Changed 'todos' to 'users'
    const [loading, setLoading] = useState(true);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchData('users');  // Corrected to 'users' endpoint
                setUsers(data);
            } catch (error) {
                console.error('Error loading users:', error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    // Add User
    const handleAddUser = async () => {
        if (newUserName.trim() === '' || newUserEmail.trim() === '') return;
        try {
            const newUser = await addData('users', { name: newUserName, email: newUserEmail });
            setUsers([...users, newUser]);
            setNewUserName('');
            setNewUserEmail('');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Edit User
    const handleEditUser = async () => {
        if (newUserName.trim() === '' || newUserEmail.trim() === '' || !editMode) return;
        try {
            const updatedUser = await editData('users', editUserId, { name: newUserName, email: newUserEmail });
            setUsers(users.map(user => user.id === editUserId ? updatedUser : user));
            setNewUserName('');
            setNewUserEmail('');
            setEditMode(false);
            setEditUserId(null);
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    // Delete User
    const handleDeleteUser = async (id) => {
        try {
            await deleteData('users', id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Users</h2>

            {/* Add/Edit Form */}
            <div className="mb-6">
                <input
                    type="text"
                    className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                    placeholder="User Name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                />
                <input
                    type="email"
                    className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                    placeholder="User Email"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                />
                {editMode ? (
                    <button
                        onClick={handleEditUser}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        onClick={handleAddUser}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add User
                    </button>
                )}
                {editMode && (
                    <button
                        onClick={() => { setEditMode(false); setNewUserName(''); setNewUserEmail(''); }}
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* User List */}
            <ul className="space-y-6">
                {users.map(user => (
                    <li key={user.id} className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">{user.name}</h3>
                        <p className="text-gray-600 mb-4">{user.email}</p>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => {
                                    setEditMode(true);
                                    setEditUserId(user.id);
                                    setNewUserName(user.name);
                                    setNewUserEmail(user.email);
                                }}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;
