

export const getURL = (path = '') => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000';

    // Elimina el slash final si existe.
    const url = baseUrl.replace(/\/+$/, '');
    // Asegúrate de que el path no tenga un slash inicial para evitar dobles slashes en la URL final.
    const finalPath = path.replace(/^\/+/, '');

    // Concatenar la URL y el path.
    return `${url}/${finalPath}`;
};