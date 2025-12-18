import HomePage from '../pageobjects/home.js'
import EventsPage from '../pageobjects/stores.events.js'

describe('Barnes & Noble Search', () => {
    it('should return valid results with valid query, using search button and enter key', async () => {
        await HomePage.start()
        await HomePage.searchEachCategory('national', { submitWith: 'button', expected: 'results' })
        await HomePage.searchEachCategory('national', { submitWith: 'key', expected: 'results' })
    })
    it('should return no results with invalid query, using search button or enter key', async () => {
        await HomePage.start()
        await HomePage.searchEachCategory('qazwsxedcrfv', { submitWith: 'button', expected: 'noResults' })
        await HomePage.searchEachCategory('qazwsxedcrfv', { submitWith: 'key', expected: 'noResults' })
    })
    it('should deny user access when SQL injection is attempted', async () => {
        await HomePage.start()
        await HomePage.sqlInject(`' OR 1=1 --`)
    })
})
describe('Barnes & Noble Stores and Events', () => {
    it('map buttons should function as intended', async () => {
        await EventsPage.storesEvents()
        await EventsPage.zoomInAndOut()
        await EventsPage.selStoreDetails()
        await EventsPage.changeMapView()
    })
    it('results should change when filtered and sorted', async () => {
        await EventsPage.storesEvents()
        await EventsPage.checkboxResultsFiltering()
    })
    it('event details should be viewable and virtual tickets purchaseable', async () => {
        await EventsPage.storesEvents()
        await EventsPage.virtualDetailsTickets()
        await EventsPage.inStoreDetails()
    })
})

