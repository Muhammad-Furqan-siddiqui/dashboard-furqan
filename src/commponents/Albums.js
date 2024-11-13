import React, { useEffect, useState } from 'react';
import { fetchData, addData, editData, deleteData } from '../commponents/dataService';

function Albums() {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editAlbumId, setEditAlbumId] = useState(null);

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                const data = await fetchData('albums');
                setAlbums(data);
            } catch (error) {
                console.error('Error loading albums:', error);
            } finally {
                setLoading(false);
            }
        };
        loadAlbums();
    }, []);

    // Add Album
    const handleAddAlbum = async () => {
        if (newAlbumTitle.trim() === '') return;
        try {
            const newAlbum = await addData('albums', { title: newAlbumTitle });
            setAlbums([...albums, newAlbum]);
            setNewAlbumTitle('');
        } catch (error) {
            console.error('Error adding album:', error);
        }
    };

    // Edit Album
    const handleEditAlbum = async () => {
        if (newAlbumTitle.trim() === '' || !editMode) return;
        try {
            const updatedAlbum = await editData('albums', editAlbumId, { title: newAlbumTitle });
            setAlbums(albums.map(album => album.id === editAlbumId ? updatedAlbum : album));
            setNewAlbumTitle('');
            setEditMode(false);
            setEditAlbumId(null);
        } catch (error) {
            console.error('Error editing album:', error);
        }
    };

    // Delete Album
    const handleDeleteAlbum = async (id) => {
        try {
            await deleteData('albums', id);
            setAlbums(albums.filter(album => album.id !== id));
        } catch (error) {
            console.error('Error deleting album:', error);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Albums</h2>

            {/* Add/Edit Form */}
            <div className="mb-6">
                <input
                    type="text"
                    className="border border-gray-300 rounded px-3 py-2 mr-2"
                    placeholder="Album Title"
                    value={newAlbumTitle}
                    onChange={(e) => setNewAlbumTitle(e.target.value)}
                />
                {editMode ? (
                    <button
                        onClick={handleEditAlbum}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        onClick={handleAddAlbum}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Album
                    </button>
                )}
                {editMode && (
                    <button
                        onClick={() => { setEditMode(false); setNewAlbumTitle(''); }}
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* Album List */}
            <ul className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {albums.map(album => (
                    <li key={album.id} className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">{album.title}</h3>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => {
                                    setEditMode(true);
                                    setEditAlbumId(album.id);
                                    setNewAlbumTitle(album.title);  // Set the title to the album's title for editing
                                }}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteAlbum(album.id)}
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

export default Albums;
