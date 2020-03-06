import {Selector, t} from 'testcafe';

export default class BasketPage{

    constructor(){
        this.goToCheckoutButton = Selector('button').withAttribute('data-role','proceed-to-checkout');
    }
}