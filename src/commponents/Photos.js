import React, { useEffect, useState } from 'react';
import { fetchData, addData, editData, deleteData } from '../commponents/dataService';

function Photos() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPhotoTitle, setNewPhotoTitle] = useState('');
    const [newPhotoUrl, setNewPhotoUrl] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editPhotoId, setEditPhotoId] = useState(null);

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const data = await fetchData('photos');
                setPhotos(data);
            } catch (error) {
                console.error('Error loading photos:', error);
            } finally {
                setLoading(false);
            }
        };
        loadPhotos();
    }, []);

    // Add Photo
    const handleAddPhoto = async () => {
        if (newPhotoTitle.trim() === '' || newPhotoUrl.trim() === '') return;
        try {
            const newPhoto = await addData('photos', { title: newPhotoTitle, url: newPhotoUrl });
            setPhotos([...photos, newPhoto]);
            setNewPhotoTitle('');
            setNewPhotoUrl('');
        } catch (error) {
            console.error('Error adding photo:', error);
        }
    };

    // Edit Photo
    const handleEditPhoto = async () => {
        if (newPhotoTitle.trim() === '' || newPhotoUrl.trim() === '' || !editMode) return;
        try {
            const updatedPhoto = await editData('photos', editPhotoId, { title: newPhotoTitle, url: newPhotoUrl });
            setPhotos(photos.map(photo => photo.id === editPhotoId ? updatedPhoto : photo));
            setNewPhotoTitle('');
            setNewPhotoUrl('');
            setEditMode(false);
            setEditPhotoId(null);
        } catch (error) {
            console.error('Error editing photo:', error);
        }
    };

    // Delete Photo
    const handleDeletePhoto = async (id) => {
        try {
            await deleteData('photos', id);
            setPhotos(photos.filter(photo => photo.id !== id));
        } catch (error) {
            console.error('Error deleting photo:', error);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Photos</h2>

            {/* Add/Edit Form */}
            <div className="mb-6">
                <input
                    type="text"
                    className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                    placeholder="Photo Title"
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                />
                <input
                    type="text"
                    className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
                    placeholder="Photo URL"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                />
                {editMode ? (
                    <button
                        onClick={handleEditPhoto}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>
                ) : (
                    <button
                        onClick={handleAddPhoto}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add Photo
                    </button>
                )}
                {editMode && (
                    <button
                        onClick={() => { setEditMode(false); setNewPhotoTitle(''); setNewPhotoUrl(''); }}
                        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* Photo List */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {photos.map(photo => (
                    <li key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img 
                            src={photo.thumbnailUrl} 
                            alt={photo.title} 
                            className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">{photo.title}</h3>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => {
                                        setEditMode(true);
                                        setEditPhotoId(photo.id);
                                        setNewPhotoTitle(photo.title);
                                        setNewPhotoUrl(photo.url);
                                    }}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeletePhoto(photo.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Photos;
