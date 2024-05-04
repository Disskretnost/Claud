import React, { useState, useEffect, useRef, useCallback } from 'react';
import FileCard from './../../components/file/file';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import { checkToken, loadFiles } from '../../api/api';

const HomePage = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }, []);

    const handleFileChange = useCallback((event) => {
        setSelectedFile(event.target.files[0]);
    }, []);

    const handleClick = useCallback(() => {
        fileInputRef.current.click();
    }, []);

    const handleUpload = useCallback(async () => {
        if (!selectedFile) {
            alert('Пожалуйста, выберите файл для загрузки');
            return;
        }
    
        // Кодирование имени файла
        const encodedFileName = encodeURIComponent(selectedFile.name);
    
        const formData = new FormData();
        formData.append('file', selectedFile, encodedFileName); // Используем закодированное имя файла
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/file/uploadFile', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Ошибка при загрузке файла');
            }
    
            const data = await response.json();
            alert('Файл успешно загружен');
            setSelectedFile(null);
    
            const updatedFiles = await loadFiles();
            if (updatedFiles) {
                setFiles(updatedFiles);
            }
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
            alert('Ошибка при загрузке файла');
        }
    }, [selectedFile]);
    

    const handleFileDelete = useCallback(async () => {
        const updatedFiles = await loadFiles();
        if (updatedFiles) {
            setFiles(updatedFiles);
        }
    }, []);

    useEffect(() => {
        const authenticateAndLoadFiles = async () => {
            const isAuthenticated = await checkToken();
            if (!isAuthenticated) {
                window.location.href = '/login';
                return;
            }
            const data = await loadFiles();
            if (data) {
                setFiles(data);
                setLoading(false);
            }
        };

        authenticateAndLoadFiles();
    }, []);

    useEffect(() => {
        if (selectedFile) {
            handleUpload();
        }
    }, [selectedFile, handleUpload]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className='files-container'>
            <Navbar onLogout={handleLogout} />
            <div className="files-list">
                <button className="Download" onClick={handleClick}>Download</button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    acceptCharset="UTF-8"
                />
                
                <div className="file-header">
                    <div>Name</div>
                    <div></div>
                    <div>Date</div>
                    <div>size</div>
                </div>
                {files.map(file => (
                    <FileCard key={file.id} file={file} onDelete={handleFileDelete} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
