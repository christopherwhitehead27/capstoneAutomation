import { $ } from '@wdio/globals'
import ResultsPage from './results.js';
import Page from './page.js';


class HomePage extends Page {
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

    async searchEachWithBtn (query) {
        await this.inputSearch.setValue(`${query}`)
        await this.searchButton.click()
        await expect(ResultsPage.showResults).toBeExisting()
        for (let i = 0; i < this.category.length; i++) {
            await this.dropdownSelect.click()
            await this.dynamicCategorySelect(this.category[i]).click()
            await this.inputSearch.setValue(`${query}`)
            await this.searchButton.click()
            await expect(ResultsPage.showResults).toBeExisting()
        }
    }
    async searchEachWithBtnInv (query) {
        await this.inputSearch.setValue(`${query}`)
        await this.searchButton.click()
        await expect(ResultsPage.noResults).toBeExisting()
        for (let i = 0; i < this.category.length; i++) {
            await this.dropdownSelect.click()
            await this.dynamicCategorySelect(this.category[i]).click()
            await this.inputSearch.setValue(`${query}`)
            await this.searchButton.click()
            await expect(ResultsPage.noResults).toBeExisting()
        }
    }
    async searchEachWithKey (query) {
        await this.inputSearch.setValue(`${query}`);
        await browser.keys('Enter');
        await expect(ResultsPage.showResults).toBeExisting()
        for (let i = 0; i < this.category.length; i++) {
            await this.dropdownSelect.click()
            await this.dynamicCategorySelect(this.category[i]).click()
            await this.inputSearch.setValue(`${query}`)
            await browser.keys('Enter')
            await expect(ResultsPage.showResults).toBeExisting()
        }
    }
    async searchEachWithKeyInv (query) {
        await this.inputSearch.setValue(`${query}`);
        await browser.keys('Enter');
        await expect(ResultsPage.noResults).toBeExisting()
        for (let i = 0; i < this.category.length; i++) {
            await this.dropdownSelect.click()
            await this.dynamicCategorySelect(this.category[i]).click()
            await this.inputSearch.setValue(`${query}`)
            await browser.keys('Enter')
            await expect(ResultsPage.noResults).toBeExisting()
        }
    }
    async sqlInject (searchQuery) {
        await this.inputSearch.setValue(searchQuery)
        await this.searchButton.click()
        await expect(ResultsPage.accessDenied).toBeExisting()
    }
    start () {
        return browser.url(`https://www.barnesandnoble.com/`)
    }
}

export default new HomePage();
