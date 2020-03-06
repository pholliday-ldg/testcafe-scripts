import {Selector, t} from 'testcafe';

export default class CategoryPage{

    constructor(){
        this.addToBasketButtons = Selector('.action.tocart.primary').filterVisible();
        this.popUpGoToBasket = Selector('#pop-up > div > div.box-right > div.buttons > a');
        this.continueShoppingButton = Selector('#pop-up > div > div.box-right > div.buttons > button');
        this.simpleProductsLinks = this.addToBasketButtons.parent('div.product-item-details').sibling('a');
        this.configurableProductLinks = Selector('button.tocart').withAttribute('More Details').parent('a');
    }

    async addToBasket(productIndex = 0){
        await t.hover(this.addToBasketButtons.filterVisible().nth(productIndex).parent('div.product-item-details'))
                .wait(1000).click(this.addToBasketButtons.filterVisible().nth(productIndex));
    }

}