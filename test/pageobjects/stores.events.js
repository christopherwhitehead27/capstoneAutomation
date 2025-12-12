import { $, browser } from '@wdio/globals'
import Page from './page'

class EventsPage extends Page {

    get map () {
        return $('canvas+div')
    }
    get mapFocus () {
        return $('#mapFocus')
    }
    get zoomIn () {
        return $('#ZoomInButton')
    }
    get zoomLevelUp () {
        return $('#ZoomInButton[aria-label*="Level 11"]')
    }
    get zoomOut () {
        return $('#ZoomOutButton')
    }
    get zoomLevelDown () {
        return $('#ZoomOutButton[aria-label*="Level 10"]')
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
    get resultsHeader () {
        return $('[xxl="9"]>h2[class="sectionHeaders"]')
    }
    get resultCard () {
        return $(`//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 css-1h77wgb"]/div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-12 MuiGrid-grid-lg-6 MuiGrid-grid-xl-6 css-tletg0"]`)
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
        // author: {
        //     name: "Author Event",
        //     selector: "author",
        // },
        // children: {
        //     name: "Children's Event",
        //     selector: "children",
        // },
        // other: {
        //     name: "Other",
        //     selector: "other",
        // },
        // virtual: {
        //     name: "Virtual Event",
        //     selector: "virtual",
        // },
        // inStore: {
        //     name: "In-Store",
        //     selector: "inStore",
        // },
    }
    // filter = ['today', 'thisWeek', 'month0', 'month1', 'month2', 'month3', 'month4', 'month5', 'author', 'children', 'other', 'virtual', 'inStore']
    dynamicCheckboxSelect (title) {
        return $(`//input[@name="${title}"]/ancestor::label`)
    }
    dynamicCheckboxSelectByName (title) {
        return $(`//span[contains(text(), "${title}")]`)
    }
    resultsByDate (date) {
        return $(`//div[@class="eventDate"][contains(text(), "${date}")]`)
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
        await this.closeCookies.click()
        await this.updateCheckboxes()
        await this.uncheckDefaults()
        for (const item of Object.values(this.checkBoxes)) {
            await this.dynamicCheckboxSelectByName(item.name).click()
            try {
                if (item.name == 'This Week') 
                    await expect(this.resultsByDate(this.checkBoxes.month0.name)).toExist()
                else 
                    await expect(this.resultsByDate(item.name)).toExist()
            }catch {
                await expect(this.resultCard).not.toExist()
            }
            await this.dynamicCheckboxSelectByName(item.name).click()
        } 
    }

    async updateCheckboxes () {
        // currentName = await this.dynamicCheckboxSelect(this.checkBoxes.month0.selector).getText()
        this.checkBoxes.month0.name = await this.dynamicCheckboxSelect(this.checkBoxes.month0.selector).getText()
    }

    async zoomInAndOut () {
        await this.zoomIn.click()
        await expect(this.zoomLevelUp).toBeExisting()
        await this.zoomOut.click()
        await expect(this.zoomLevelDown).toBeExisting()
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
        await this.aerialMap.click()
        await expect(this.mapType).toHaveText('Aerial')
        await this.mapType.moveTo()
        await this.birdseyeMap.click()
        await expect(this.birdseyeClose).toBeExisting()
        await this.birdseyeClose.click()
        await this.locateMe.click()
        await expect(this.locateMePressed).toBeExisting()
    }
    async filterResults () {
        await this.closeCookies.click()
        for (let i = 0; i < this.filter.length; i++) {
            await this.dynamicCheckboxSelect(this.filter[i]).click()
        }
        await expect(this.resultsHeader).toHaveText('0 Upcoming Events Near Kansas City, KS')
    }
    storesEvents () {
        return browser.url(`https://stores.barnesandnoble.com/`)
    }
}

export default new EventsPage();
