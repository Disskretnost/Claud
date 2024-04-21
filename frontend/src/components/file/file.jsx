import React from 'react';
import { FaDownload, FaTrash, FaShareSquare } from 'react-icons/fa'; // Импортируем иконки
import './file.css';

const FileCard = ({ file }) => {
    const { name, contentType, createdAt, size, uploadDate } = file;

    // Функция для форматирования даты создания
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}.${month}.${year}`;
    };

    // Функция для форматирования размера файла
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

    // Обработчики событий для скачивания и удаления файла
    const handleDownload = () => {
        // Ваш код для скачивания файла
    };

    const handleDelete = () => {
        // Ваш код для удаления файла
    };

    // Функция для поделиться файлом
    const handleShare = () => {
        // Ваш код для поделиться файлом
    };

    return (
        <div className="file-card">
            <div className="file-info">
                <h3>{name}</h3>
                <div className='icon__wrapper'>
                    <button onClick={handleDownload}><FaDownload /></button>
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
