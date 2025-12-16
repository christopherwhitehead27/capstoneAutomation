import { browser } from '@wdio/globals'

export default class Primary {

    get showResults () {
            return $('.result-show')
    }
    get noResults () {
            return $('.no-search-msg.mb-m')
    }
    get accessDenied () {
            return $('//h1[contains(text(), "Access Denied")]')
    }
    
    start () {
        return browser.url(`https://www.barnesandnoble.com/`)
    }
}
