import React, { useEffect, useState } from 'react';
import { fetchData, addData, editData, deleteData } from '../commponents/dataService';

function Comments() {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState({ title: '' });
    const [editCommentId, setEditCommentId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    useEffect(() => {
        const loadComments = async () => {
            try {
                const data = await fetchData('comments');
                setComments(data);
            } catch (error) {
                console.error('Error loading comments:', error);
            } finally {
                setLoading(false);
            }
        };
        loadComments();
    }, []);

    const handleAddComment = async () => {
        if (newComment.title) {
            const addedComment = await addData('comments', newComment);
            setComments([addedComment, ...comments]);
            setNewComment({ title: '' });
        }
    };

    const handleEditComment = async (id) => {
        if (editTitle) {
            const updatedComment = await editData('comments', id, { title: editTitle });
            setComments(comments.map(c => c.id === id ? updatedComment : c));
            setEditCommentId(null);
            setEditTitle('');
        }
    };

    const handleDeleteComment = async (id) => {
        await deleteData('comments', id);
        setComments(comments.filter(c => c.id !== id));
    };

    if (loading) return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Comments</h2>
            <div className="mb-6">
                <input
                    type="text"
                    value={newComment.title}
                    onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
                    placeholder="Add new comment title"
                    className="border border-gray-300 p-2 mr-2 rounded-md"
                />
                <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Comment</button>
            </div>
            <ul className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {comments.map(comment => (
                    <li key={comment.id} className="bg-white shadow-md rounded-lg p-6">
                        {editCommentId === comment.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="border border-gray-300 p-2 rounded-md"
                                />
                                <button onClick={() => handleEditComment(comment.id)} className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">Save</button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">{comment.title}</h3>
                                <button onClick={() => { setEditCommentId(comment.id); setEditTitle(comment.title); }} className="bg-yellow-500 text-white px-4 py-1 rounded-md mr-2">Edit</button>
                                <button onClick={() => handleDeleteComment(comment.id)} className="bg-red-500 text-white px-4 py-1 rounded-md">Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Comments;
