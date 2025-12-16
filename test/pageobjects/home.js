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

    async searchEachWithBtn (query) {
        await this.inputSearch.setValue(`${query}`)
        await this.searchButton.click()
        await expect(this.showResults).toBeExisting()
        for (let i = 0; i < this.category.length; i++) {
            await this.dropdownSelect.click()
            await this.dynamicCategorySelect(this.category[i]).click()
            await this.inputSearch.setValue(`${query}`)
            await this.searchButton.click()
            await expect(this.showResults).toBeExisting()
        }
    }
    async searchEachWithBtnInv (query) {
        await this.inputSearch.setValue(`${query}`)
        await this.searchButton.click()
        await expect(this.noResults).toBeExisting()
        for (let i = 0; i < this.category.length; i++) {
            await this.dropdownSelect.click()
            await this.dynamicCategorySelect(this.category[i]).click()
            await this.inputSearch.setValue(`${query}`)
            await this.searchButton.click()
            await expect(this.noResults).toBeExisting()
        }
    }
    async searchEachWithKey (query) {
        await this.inputSearch.setValue(`${query}`);
        await browser.keys('Enter');
        await expect(this.showResults).toBeExisting()
        for (let i = 0; i < this.category.length; i++) {
            await this.dropdownSelect.click()
            await this.dynamicCategorySelect(this.category[i]).click()
            await this.inputSearch.setValue(`${query}`)
            await browser.keys('Enter')
            await expect(this.showResults).toBeExisting()
        }
    }
    async searchEachWithKeyInv (query) {
        await this.inputSearch.setValue(`${query}`);
        await browser.keys('Enter');
        await expect(this.noResults).toBeExisting()
        for (let i = 0; i < this.category.length; i++) {
            await this.dropdownSelect.click()
            await this.dynamicCategorySelect(this.category[i]).click()
            await this.inputSearch.setValue(`${query}`)
            await browser.keys('Enter')
            await expect(this.noResults).toBeExisting()
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
