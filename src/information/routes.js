const eventHandler = require('./eventHandler'); 
const communityHandler = require('./communityHandler');  
const newsHandler = require('./newsHandler'); 
const validateToken = require('../middleware/middleware');

const routes = [
    //Events
    {
        method: 'GET',
        path: '/events',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: eventHandler.getAllEvents
    },
    {
        method: 'GET',
        path: '/events/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: eventHandler.getEventById
    },
    {
        method: 'POST',
        path: '/events',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: eventHandler.createEvent
    },
    {
        method: 'PUT',
        path: '/events/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: eventHandler.updateEvent
    },
    {
        method: 'DELETE',
        path: '/events/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: eventHandler.deleteEvent
    },

    // Community
    {
        method: 'GET',
        path: '/community',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: communityHandler.getAllCommunities
    },
    {
        method: 'GET',
        path: '/community/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: communityHandler.getCommunityById
    },
    {
        method: 'POST',
        path: '/community',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: communityHandler.createCommunity
    },
    {
        method: 'PUT',
        path: '/community/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: communityHandler.updateCommunity
    },
    {
        method: 'DELETE',
        path: '/community/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: communityHandler.deleteCommunity
    },

    // News
    {
        method: 'GET',
        path: '/news',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: newsHandler.getAllNews
    },
    {
        method: 'GET',
        path: '/news/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: newsHandler.getNewsById
    },
    {
        method: 'POST',
        path: '/news',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: newsHandler.createNews
    },
    {
        method: 'PUT',
        path: '/news/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: newsHandler.updateNews
    },
    {
        method: 'DELETE',
        path: '/news/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: newsHandler.deleteNews
    }
];

module.exports = routes;