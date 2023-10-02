import cloudinary from 'cloudinary-core';

export const all_endpoints = [
    { name: 'districts', path: '/districts', collection: 'Districts'},
    { name: 'members', path: '/allmembers', collection: 'allmembers' },
    { name: 'events', path: '/allevents', collection: 'activitiesinfo' },
    { name: 'partners', path: '/partners', collection: 'partnersinfo' },
    { name: 'projects', path: '/projects', collection: 'projectsinfo' },
    { name: 'gallery', path: '/gallery', collection: 'galleryinfo' },
    { name: 'timeline', path: '/timeline', collection: 'timelineinfo' },
    { name: 'reports', path: '/reports', collection: 'reports' },
    { name: 'users', path: '/accounts', collection: 'user' },
    { name: 'messages', path: '/messages', collection: 'All_messages' },
    { name: 'alerts', path: '/alerts', collection: 'alerts' }
];

export const post_endpoints = all_endpoints.filter(endpoint =>
    ['members', 'events', 'partners', 'projects', 'gallery', 'reports', 'users', 'messages', 'alerts']
    .includes(endpoint.name)
).map(endpoint => ({
    ...endpoint, cloud_folder: endpoint.name
}));

export const cloudinary_endpoint = cloudinary.Cloudinary.new({
    cloud_name: 'dxtqwdeqa',
    api_key: '458695849459986'
});

export const frontendhost = 'http://127.0.0.1:3000';
export const backendhost = 'http://127.0.0.1:5000';
export const PORT = '5000'