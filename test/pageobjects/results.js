import { $ } from '@wdio/globals'
import Page from './page.js';


class ResultsPage extends Page {
    /**
     * Selectors
     */
    get showResults () {
        return $('.result-show')
    }
    get noResults () {
        return $('.no-search-msg.mb-m')
    }
    get accessDenied () {
        return $('//h1[contains(text(), "Access Denied")]')
    }
}

export default new ResultsPage();