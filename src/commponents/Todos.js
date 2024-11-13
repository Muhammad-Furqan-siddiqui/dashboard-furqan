import React, { useEffect, useState } from 'react';
import { fetchData, addData, editData, deleteData } from '../commponents/dataService';

function Todos() {
    const [todos, setTodos] = useState([]);  // Changed 'photos' to 'todos'
    const [loading, setLoading] = useState(true);
    const [newTodoTitle, setNewTodoTitle] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editTodoId, setEditTodoId] = useState(null);

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const data = await fetchData('todos');  // Corrected to 'todos' endpoint
                setTodos(data);
            } catch (error) {
                console.error('Error loading todos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadTodos();
    }, []);

    // Add Todo
    const handleAddTodo = async () => {
        if (newTodoTitle.trim() === '') return;
        try {
            const newTodo = await addData('todos', { title: newTodoTitle, completed: false });
            setTodos([...todos, newTodo]);
            setNewTodoTitle('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    // Edit Todo
    const handleEditTodo = async () => {
        if (newTodoTitle.trim() === '' || !editMode) return;
        try {
            const updatedTodo = await editData('todos', editTodoId, { title: newTodoTitle });
            setTodos(todos.map(todo => todo.id === editTodoId ? updatedTodo : todo));
            setNewTodoTitle('');
            setEditMode(false);
            setEditTodoId(null);
        } catch (error) {
            console.error('Error editing todo:', error);
        }
    };

    // Delete Todo
    const handleDeleteTodo = async (id) => {
        try {
            await deleteData('todos', id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Todos</h2>

            {/* Add/Edit Form */}
            <div className="mb-6">
                <input
                    type="text"
                    className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                    placeholder="Todo Title"
                    value={newTodoTitle}
                    onChange={(e) => setNewTodoTitle(e.target.value)}
                />
                {editMode ? (
                    <button
                        onClick={handleEditTodo}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        onClick={handleAddTodo}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Todo
                    </button>
                )}
                {editMode && (
                    <button
                        onClick={() => { setEditMode(false); setNewTodoTitle(''); }}
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* Todo List */}
            <ul className="space-y-6">
                {todos.map(todo => (
                    <li key={todo.id} className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">{todo.title}</h3>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => {
                                    setEditMode(true);
                                    setEditTodoId(todo.id);
                                    setNewTodoTitle(todo.title);
                                }}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteTodo(todo.id)}
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

export default Todos;
