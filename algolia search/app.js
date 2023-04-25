// Replace with your own values
const searchClient = algoliasearch(
    '1NS1FLCGQS',
    'dbc4cf97c3c30d9910a56a71ae0b6c39' // search only API key, not admin API key
)

const index = searchClient.initIndex('TESTING'); // Specify the index name here

const objects = [{
    firstname: 'Jimmie',
    lastname: 'Barninger',
    objectID: 'myID1'
}, {
    firstname: 'Warren',
    lastname: 'Speach',
    objectID: 'myID2'
}];

index.saveObjects(objects).then(({ objectIDs }) => {
    console.log(objectIDs);
});


search.addWidgets([
    instantsearch.widgets.configure({
        hitsPerPage: 10,
    }),
])

search.addWidgets([
    instantsearch.widgets.searchBox({
        container: '#search-box',
        placeholder: 'Search for contacts',
    }),
])

search.addWidgets([
    instantsearch.widgets.hits({
        container: '#hits',
        templates: {
            item: document.getElementById('hit-template').innerHTML,
            empty: `We didn't find any results for the search <em>"{{query}}"</em>`,
        },
    }),
])

search.start()
