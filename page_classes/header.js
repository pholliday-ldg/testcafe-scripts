import {Selector, t} from 'testcafe';

export default class Header{

    constructor(){
        this.topCategories = Selector('#ui-id-2').child('li').child('a');
        this.cartButton = Selector('a.showcart');
        this.searchBar = Selector('#search');
    }
}