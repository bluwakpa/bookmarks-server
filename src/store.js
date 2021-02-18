const uuid = require('uuid/v4') 
const bookmarks = [ { 
    id: uuid(), 
    title: 'Yahoo', 
    url: 'https://www.yahoo.com', 
    description: 'yahoo search engine', 
    rating: 5 
}, 
{ id: uuid(), 
    title: 'Google', 
    url: 'https://www.google.com', 
    description: 'google search engine', 
    rating: 5 
}, { id: uuid(), 
    title: 'Wired', 
    url: 'https://www.wired.com', 
    description: 'tech news and more', 
    rating: 5 
}, ] 

module.exports = { bookmarks }