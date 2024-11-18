const eventHandler = require('./eventHandler'); 
const communityHandler = require('./communityHandler');  
const newsHandler = require('./newsHandler'); 

const routes = [
    //Events
    {
        method: 'GET',
        path: '/events',
        handler: eventHandler.getAllEvents
    },
    {
        method: 'GET',
        path: '/events/{id}',
        handler: eventHandler.getEventById
    },
    {
        method: 'POST',
        path: '/events',
        handler: eventHandler.createEvent
    },
    {
        method: 'PUT',
        path: '/events/{id}',
        handler: eventHandler.updateEvent
    },
    {
        method: 'DELETE',
        path: '/events/{id}',
        handler: eventHandler.deleteEvent
    },

    // Community
    {
        method: 'GET',
        path: '/community',
        handler: communityHandler.getAllCommunities
    },
    {
        method: 'GET',
        path: '/community/{id}',
        handler: communityHandler.getCommunityById
    },
    {
        method: 'POST',
        path: '/community',
        handler: communityHandler.createCommunity
    },
    {
        method: 'PUT',
        path: '/community/{id}',
        handler: communityHandler.updateCommunity
    },
    {
        method: 'DELETE',
        path: '/community/{id}',
        handler: communityHandler.deleteCommunity
    },

    // News
    {
        method: 'GET',
        path: '/news',
        handler: newsHandler.getAllNews
    },
    {
        method: 'GET',
        path: '/news/{id}',
        handler: newsHandler.getNewsById
    },
    {
        method: 'POST',
        path: '/news',
        handler: newsHandler.createNews
    },
    {
        method: 'PUT',
        path: '/news/{id}',
        handler: newsHandler.updateNews
    },
    {
        method: 'DELETE',
        path: '/news/{id}',
        handler: newsHandler.deleteNews
    }
];

module.exports = routes;