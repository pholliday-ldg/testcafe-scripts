import {Selector, t} from 'testcafe';
import {checkoutFromProductPage , checkoutFromCategoryPage , checkoutDropDownConfigurable , checkoutSwatchConfigurable , navigateToCategoryPage , navigateToSimpleProduct , searchForProduct} from '../helpers/add_to_basket';
import PaymentPage from '../page_classes/payment_page';

//website-specific variables:
const homepageURL = 'https://fr.hudsonreed.com';
const dropDownProductURL = 'https://fr.hudsonreed.com/radiateur-design-horizontal-violet-choix-de-tailles-vitality-83257';
const swatchProductURL = 'https://fr.hudsonreed.com/radiateur-design-vertical-blanc-choix-de-tailles-vitality-78656';
const expectedError = 'Votre banque a refusé cette opération - merci de bien vouloir la contacter pour plus de détails ou essayer une autre méthode de paiement.';

const paymentPage = new PaymentPage();

async function messageCheck(){
    await t.expect(paymentPage.errorMessage.innerText).eql(expectedError);
}

fixture('Homepage tests')
.page(homepageURL)

test('Checkout simple product from homepage', async t => {
    await navigateToSimpleProduct();
    await checkoutFromProductPage();
    await messageCheck();
})

test('Checkout with one product from category page', async t => {
    await navigateToCategoryPage();
    await checkoutFromCategoryPage();
    await messageCheck();
})

test('Checkout with two products from category page', async t => {
    await navigateToCategoryPage();
    await checkoutFromCategoryPage(2);
    await messageCheck();
})

test('Search for Product & Check Out', async t => {
    await searchForProduct();
    await checkoutFromProductPage();
    await messageCheck();
})

fixture('Checkout with drop-down configurable')
.page(dropDownProductURL)

test('Buy one drop-down', async t => {
    await checkoutDropDownConfigurable();
    await messageCheck();
})

fixture('Checkout with swatch configurable')
.page(swatchProductURL).skip

test('Buy one swatch product', async t => {
    await checkoutSwatchConfigurable();
    await messageCheck();
})
