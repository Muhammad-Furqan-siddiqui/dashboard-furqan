import React, { useEffect, useState } from 'react';
import { fetchData, addData, editData, deleteData } from '../commponents/dataService';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostBody, setNewPostBody] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editPostId, setEditPostId] = useState(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchData('posts');
                setPosts(data);
            } catch (error) {
                console.error('Error loading posts:', error);
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    // Add Post
    const handleAddPost = async () => {
        if (newPostTitle.trim() === '' || newPostBody.trim() === '') return;
        try {
            const newPost = await addData('posts', { title: newPostTitle, body: newPostBody });
            setPosts([...posts, newPost]);
            setNewPostTitle('');
            setNewPostBody('');
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    // Edit Post
    const handleEditPost = async () => {
        if (newPostTitle.trim() === '' || newPostBody.trim() === '' || !editMode) return;
        try {
            const updatedPost = await editData('posts', editPostId, { title: newPostTitle, body: newPostBody });
            setPosts(posts.map(post => post.id === editPostId ? updatedPost : post));
            setNewPostTitle('');
            setNewPostBody('');
            setEditMode(false);
            setEditPostId(null);
        } catch (error) {
            console.error('Error editing post:', error);
        }
    };

    // Delete Post
    const handleDeletePost = async (id) => {
        try {
            await deleteData('posts', id);
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Posts</h2>

            {/* Add/Edit Form */}
            <div className="mb-6">
                <input
                    type="text"
                    className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                    placeholder="Post Title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <textarea
                    className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                    placeholder="Post Body"
                    value={newPostBody}
                    onChange={(e) => setNewPostBody(e.target.value)}
                />
                {editMode ? (
                    <button
                        onClick={handleEditPost}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        onClick={handleAddPost}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Post
                    </button>
                )}
                {editMode && (
                    <button
                        onClick={() => { setEditMode(false); setNewPostTitle(''); setNewPostBody(''); }}
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* Posts List */}
            <ul className="space-y-6">
                {posts.map(post => (
                    <li key={post.id} className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">{post.title}</h3>
                        <p className="text-gray-600 mb-4">{post.body}</p>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => {
                                    setEditMode(true);
                                    setEditPostId(post.id);
                                    setNewPostTitle(post.title);
                                    setNewPostBody(post.body);
                                }}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeletePost(post.id)}
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

export default Posts;
