import {Selector, t} from 'testcafe';

export default class ProductPage{

    constructor(){
        this.addToBasketButton = Selector('#product-addtocart-button');
        this.popUpGoToBasket = Selector('#pop-up > div > div.box-right > div.buttons > a');
        this.dropDowns = Selector('.super-attribute-select');
        this.swatches = Selector('.swatch-attribute');
        this.inStockIcon = Selector('.stock.available');
    }

    async chooseDropdownOptions(){
        const options = await this.dropDowns.count;
        await t.wait(1000);
        for(let i = 0; i < options; i++){
            let box = this.dropDowns.nth(i);
            await t.click(box).wait(200).click(box.child().nth(1)).wait(1000);
        }
    }

    async chooseSwatchOptions(){
        await t.wait(2000);
        const swatchTotal = await this.swatches.count;

        //refactor to account for OOS swatch options when Chrome issue is resolved - probably use nextSibling() or something
        for(let i = 0; i < swatchTotal; i++){
            let option = this.swatches.nth(i);
            await t.click(option.child('.swatch-attribute-options').child('.swatch-option')).wait(1000);
        }
    }

}