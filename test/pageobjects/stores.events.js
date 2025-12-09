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
    filter = ['today', 'thisWeek', 'month0', 'month1', 'month2', 'month3', 'month4', 'month5', 'author', 'children', 'other', 'virtual', 'inStore']
    dynamicCheckboxSelect (filter) {
        return $(`[name="${filter}"]`)
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
        
    }
    storesEvents () {
        return browser.url(`https://stores.barnesandnoble.com/`)
    }
}

export default new EventsPage();
