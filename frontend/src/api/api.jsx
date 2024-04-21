// auth.js
export const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Токен не найден');
        return false;
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    try {
        const response = await fetch('http://localhost:8080/api/user/checkToken', {
            method: 'GET',
            headers: myHeaders,
        });
        return response.status === 200;
    } catch (error) {
        console.error('Ошибка при проверке токена:', error);
        return false;
    }
};

// fileService.js
export const loadFiles = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Токен не найден');
        return false;
    }

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${token}`);

    try {
        const response = await fetch('http://localhost:8080/api/file/files', {
            method: 'GET',
            headers: myHeaders,
        });
        if (!response.ok) {
            throw new Error('Ошибка при получении файлов');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при получении файлов:', error);
        return false;
    }
};
