import { $, browser } from '@wdio/globals'
import Primary from './primary'

class EventsPage extends Primary {

    get map () {
        return $('#mapFocus')
    }
    get zoomIn () {
        return $('#ZoomInButton')
    }
    get zoomOut () {
        return $('#ZoomOutButton')
    }
    get storeInfobox () {
        return $('.infobox-close')
    }
    get storeDetails () {
        return $('.mapStoreLink')
    }
    get detailWrapper () {
        return $('.storeDetailWrapper')
    }
    get mapType () {
        return $('#NavBar_MapTypeText')
    }
    get typeDropdown () {
        return $('#RadialMenu')
    }
    get aerialMap () {
        return $('.slot.aerial')
    }
    get birdseyeMap () {
        return $('.slot.birdseye')
    }
    get birdseyeClose () {
        return $('#BirdseyeV2ExitButton')
    }
    get locateMe () {
        return $('#LocateMeButton')
    }
    get locateMePressed () {
        return $('[aria-pressed="true"]')
    }
    get closeCookies () {
        return $('#onetrust-close-btn-container')
    }
    get resultCard () {
        return $(`//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb"]/div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-12 MuiGrid-grid-lg-6 MuiGrid-grid-xl-6 css-tletg0"]`)
    }
    get buyTickets () {
        return $('button[id*="eventbrite"]')
    }
    get ticketsContinue () {
        return $('//button[@class][contains(text(), "Continue")]')
    }
    get ticketsClose () {
        return $('[aria-label="close"]')
    }
    get viewDetails () {
        return $('//a[@class][contains(text(), "VIEW DETAILS")]')
    }
    get eventDetails () {
        return $('//h3[@class][contains(text(), "Event Details")]')
    }
    get eventLocationSelector () {
        return $('[class*="inStore"]')
    }
    checkBoxes = {
        today: {
            name: "Today",
            selector: "today",
        },
        thisWeek: {
            name: "This Week",
            selector: "thisWeek",
        },
        month0: {
            name: "December",
            selector: "month0",
        },
        month1: {
            name: "January",
            selector: "month1",
        },
        month2: {
            name: "February",
            selector: "month2",
        },
        month3: {
            name: "March",
            selector: "month3",
        },
        month4: {
            name: "April",
            selector: "month4",
        },
        month5: {
            name: "May",
            selector: "month5",
        },
        author: {
            name: "Author Event",
            selector: "author",
        },
        children: {
            name: "Children's Event",
            selector: "children",
        },
        other: {
            name: "Other",
            selector: "other",
        },
        virtual: {
            name: "Virtual Event",
            selector: "virtual",
        },
        inStore: {
            name: "In-Store",
            selector: "inStore",
        },
    }
    dynamicZoomLevel (lvl) {
        return $(`#ZoomInButton[aria-label*="Level ${lvl}"]`)
    }
    dynamicCheckboxSelect (title) {
        return $(`//input[@name="${title}"]/ancestor::label`)
    }
    dynamicCheckboxSelectByName (title) {
        return $(`//span[contains(text(), "${title}")]`)
    }
    resultsByDate (date) {
        return $(`//div[@class="eventDate"][contains(text(), "${date}")]`)
    }
    resultsByType (event) {
        return $(`//div[@class="eventType"][contains(text(), "${event}")]`)
    }
    resultsByLocation (location) {
        return $(`//div[@class="eventLocation"][contains(text(), "${location}")]`)
    }
    async uncheckDefaults () {
        await this.dynamicCheckboxSelect('today').click()
        await this.dynamicCheckboxSelect('thisWeek').click()
        await this.dynamicCheckboxSelect('month0').click()
        await this.dynamicCheckboxSelect('author').click()
        await this.dynamicCheckboxSelect('children').click()
        await this.dynamicCheckboxSelect('virtual').click()
        await this.dynamicCheckboxSelect('inStore').click()
    }
    async checkboxResultsFiltering () {
        await this.updateCheckboxes()
        await this.uncheckDefaults()
        for (const item of Object.values(this.checkBoxes)) {
            await this.dynamicCheckboxSelectByName(item.name).click()
            try {
                if (item.name == 'This Week') 
                    await expect(this.resultsByDate(this.checkBoxes.month0.name)).toExist()
                else if (item.name == 'Author Event')
                    await expect(this.resultsByType(this.checkBoxes.author.name)).toExist()
                else if (item.name == "Children's Event")
                    await expect(this.resultsByType('Storytime')).toExist()
                else if (item.name == 'Other')
                    await expect(this.resultsByType('Special Event')).toExist()
                else if (item.name == 'Virtual Event')
                    await expect(this.resultsByLocation('Virtual')).toExist()
                else if (item.name == 'In-Store')
                    await expect(this.eventLocationSelector).toExist()
                else 
                    await expect(this.resultCard).toExist()
            } catch {
                await expect(this.resultCard).not.toExist()
            }
            await this.dynamicCheckboxSelectByName(item.name).click()
        } 
    }
    async updateCheckboxes () {
        this.checkBoxes.month0.name = await this.dynamicCheckboxSelect(this.checkBoxes.month0.selector).getText()
    }
    async virtualDetailsTickets () {
        await this.dynamicCheckboxSelect('virtual').click()
        await this.viewDetails.click()
        await expect(this.eventDetails).toExist()
        await browser.back()
        await expect(this.map).toBePresent()
        await this.buyTickets.click()
        await expect(this.ticketsContinue).toBeDisplayed()
        await this.ticketsClose.waitForClickable()
        await this.ticketsClose.click()
        await this.dynamicCheckboxSelect('virtual').click()
    }
    async inStoreDetails () {
        await this.dynamicCheckboxSelect('inStore').click()
        await this.viewDetails.click()
        await expect(this.eventDetails).toExist()
        await browser.back()
        await expect(this.map).toBePresent()
    }
    async zoomInAndOut () {
        await this.closeCookies.click()
        await this.zoomIn.click()
        await expect(this.dynamicZoomLevel('11')).toExist()
        await this.zoomOut.click()
        await expect(this.dynamicZoomLevel('10')).toExist()
    }
    async selStoreDetails () {
        await this.map.moveTo()
        await expect(this.storeInfobox).toBePresent()
        await this.storeDetails.click()
        await expect(this.detailWrapper).toBePresent()
        await browser.back()
        await expect(browser).toHaveUrl('https://stores.barnesandnoble.com/')
    }
    async changeMapView () {
        await this.mapType.moveTo()
        await this.aerialMap.waitForClickable()
        await this.aerialMap.click()
        await expect(this.mapType).toHaveText('Aerial')
        await this.mapType.moveTo()
        await this.birdseyeMap.click()
        await expect(this.birdseyeClose).toExist()
        await this.birdseyeClose.click()
        await this.locateMe.click()
        await expect(this.locateMePressed).toExist()
    }
    storesEvents () {
        return browser.url(`https://stores.barnesandnoble.com/`)
    }
}

export default new EventsPage();
