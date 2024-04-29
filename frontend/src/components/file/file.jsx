import React from 'react';
import './file.css';
import { FaDownload, FaTrash, FaShareSquare, FaFile, FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFileVideo, FaFileAudio, FaFileCode, FaFileArchive } from 'react-icons/fa';
const FileCard = ({ file, onDelete }) => {
    const { name, originalName, id, createdAt, size } = file;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}.${month}.${year}`;
    };

    const formatFileSize = (size) => {
        if (size < 1024) {
            return `${size} B`;
        } else if (size < 1048576) {
            return `${(size / 1024).toFixed(2)} KB`;
        } else if (size < 1073741824) {
            return `${(size / 1048576).toFixed(2)} MB`;
        } else {
            return `${(size / 1073741824).toFixed(2)} GB`;
        }
    };
    
    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf':
                return <FaFilePdf />;
            case 'doc':
            case 'docx':
                return <FaFileWord />;
            case 'xls':
            case 'xlsx':
                return <FaFileExcel />;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return <FaFileImage />;
            case 'mp4':
            case 'avi':
            case 'mov':
                return <FaFileVideo />;
            case 'mp3':
            case 'wav':
                return <FaFileAudio />;
            case 'js':
            case 'html':
            case 'css':
                return <FaFileCode />;
            case 'zip':
            case 'rar':
            case 'tar':
            case 'gz':
                return <FaFileArchive />;
            default:
                return <FaFile />;
        }
    };

    const downloadFile = async () => {
        try {
            // Получаем токен аутентификации из localStorage
            const token = localStorage.getItem('token');

            // Формируем URL для запроса, используя id файла
            const response = await fetch(`/api/file/download/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при скачивании файла');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', originalName);

            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);

            return response;
        } catch (error) {
            console.error('Ошибка при скачивании файла:', error);
            return error;
        }
    };

    const handleDelete = async () => {
        try {
            const url = `/api/file/delete/${id}`;
            const token = localStorage.getItem("token");
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const response = await fetch(url, {
                method: 'DELETE',
                headers: headers,
            });

            if (!response.ok) {
                throw new Error('Ошибка при удалении файла');
            }

            console.log('Файл успешно удален');
            onDelete(); // Вызов функции обратного вызова для обновления списка файлов
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleShare = () => {
        // Ваш код для поделиться файлом
    };

    return (
        <div className="file-card">
            <div className="file-info">
                <div className='icon__wrapper'>
                    <img src="vecteezy_document-file-icon-paper-doc-sign_10148680.png" alt="Default Icon" width="27" height="27" />
                </div>

                <h3 className='title'>{originalName}</h3>
                <div className='icon__wrapper'>
                    <button onClick={downloadFile}><FaDownload /></button>
                    <button onClick={handleShare}><FaShareSquare /></button>
                    <button onClick={handleDelete}><FaTrash /></button>
                </div>
                <p>{formatDate(createdAt)}</p>
                <p>{formatFileSize(size)}</p>
            </div>
        </div>
    );
};

export default FileCard;
