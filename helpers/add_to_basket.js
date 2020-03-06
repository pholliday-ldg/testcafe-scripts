import {Selector, t} from 'testcafe';
import ProductPage from '../page_classes/product_page';
import AddressPage from '../page_classes/address_page';
import PaymentPage from '../page_classes/payment_page';
import BasketPage from '../page_classes/basket_page';
import CategoryPage from '../page_classes/category_page';
import Header from '../page_classes/header';

const productPage = new ProductPage();
const paymentPage = new PaymentPage();
const addressPage = new AddressPage();
const basketPage = new BasketPage();
const categoryPage = new CategoryPage();
const header = new Header();

async function checkoutStandard(){
    //starts on basket page
    await t.wait(4000).click(basketPage.goToCheckoutButton);
    await addressPage.completeForm();
    await paymentPage.enterCardDetails();
    await paymentPage.confirmPayment();
}

export async function checkoutFromProductPage(){
    await t.expect(productPage.inStockIcon.filterVisible().exists).ok()
    await t.wait(3000).click(productPage.addToBasketButton).wait(500)
            .click(productPage.popUpGoToBasket);
    await checkoutStandard();
}

export async function checkoutFromCategoryPage(numberOfProducts = 1){
    for (let i = 0; i < (numberOfProducts - 1); i++){
        await categoryPage.addToBasket(i);
        await t.wait(1000).click(categoryPage.continueShoppingButton);
    }
    await categoryPage.addToBasket(numberOfProducts);
    await t.wait(1000).click(categoryPage.popUpGoToBasket);
    await checkoutStandard();
}

export async function checkoutDropDownConfigurable(){
    await t.expect(productPage.inStockIcon.filterVisible().exists).ok()
    await productPage.chooseDropdownOptions();
    await checkoutFromProductPage();
}

export async function checkoutSwatchConfigurable(){
    await t.expect(productPage.inStockIcon.filterVisible().exists).ok();
    await t.wait(5000).expect(productPage.swatches.filterVisible().exists).ok();
    await productPage.chooseSwatchOptions();
    await checkoutFromProductPage();
}

export async function navigateToSimpleProduct(){
    await t.click(header.topCategories).click(categoryPage.simpleProductsLinks);
}

export async function navigateToCategoryPage(){
    await t.click(header.topCategories);
}

export async function searchForProduct(){
    await t.typeText(header.searchBar, 'STOP-AOP').pressKey('enter').click(categoryPage.simpleProductsLinks);
}