import { browser } from '@wdio/globals'

export default class Page {
    
    start () {
        return browser.url(`https://www.barnesandnoble.com/`)
    }
}
