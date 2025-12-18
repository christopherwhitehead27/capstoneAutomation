import { $ } from '@wdio/globals'
import Primary from './primary.js';


class HomePage extends Primary {
    get inputSearch () {
        return $('[role="combobox"]');
    }
    get searchButton () {
        return $('[aria-label="Search button"]');
    }
    get dropdownSelect () {
        return $('.rhf-down-arrow');
    }

    category = ['Books', 'Audiobooks', 'ebooks & NOOK', 'Newsstand', 'Teens & YA', 'Kids', 'Toys & Games', 'Stationery & Gifts', 'Movies & TV', 'Music', 'Book Annex']
    dynamicCategorySelect(category) {
        return $(`//a[@class="dropdown-item "][contains(text(), "${category}")]`)
    }

    async triggerSearch(submitWith) {
        if (submitWith === 'button') {
            await this.searchButton.click()
        } else {
            await browser.keys('Enter')
        }
    }

    async expectResult(expected) {
        if (expected === 'results') {
            await expect(this.showResults).toExist()
        } else {
            await expect(this.noResults).toExist()
        }
    }

    async searchEachCategory (query, { submitWith = 'button', expected = 'results' }) {
        await this.inputSearch.setValue(query)
        await this.triggerSearch(submitWith)
        await this.expectResult(expected)
        for (const category of this.category) {
            await this.dropdownSelect.click()
            await this.dynamicCategorySelect(category).click()
            await this.inputSearch.setValue(query)
            await this.triggerSearch(submitWith)
            await this.expectResult(expected)
        }
    }
    async sqlInject (searchQuery) {
        await this.inputSearch.setValue(searchQuery)
        await this.searchButton.click()
        await expect(this.accessDenied).toBeExisting()
    }
    start () {
        return browser.url(`https://www.barnesandnoble.com/`)
    }
}

export default new HomePage();
