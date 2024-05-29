

export const getURL = (path = '') => {
    // Verifica si NEXT_PUBLIC_SITE_URL está configurada y no está vacía.
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL &&
        process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
            ? process.env.NEXT_PUBLIC_SITE_URL
            : // Si no está configurada, verifica NEXT_PUBLIC_VERCEL_URL, que es configurada automáticamente por Vercel.
            process?.env?.NEXT_PUBLIC_VERCEL_URL &&
            process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
                ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
                : // Si ninguna está configurada, por defecto usa localhost para desarrollo local.
                'http://localhost:3000';

    // Elimina el slash final si existe.
    url = url.replace(/\/+$/, '');
    // Asegúrate de incluir `https://` cuando no sea localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Asegúrate de que el path no tenga un slash inicial para evitar dobles slashes en la URL final.
    path = path.replace(/^\/+/, '');

    const finalUrl = path ? `${url}/${path}` : url;
    console.log("Final URL:", finalUrl);

    return finalUrl;
};