import {Selector, t} from 'testcafe';
import {checkoutFromProductPage , checkoutFromCategoryPage , checkoutDropDownConfigurable , checkoutSwatchConfigurable , navigateToCategoryPage , navigateToSimpleProduct , searchForProduct} from '../helpers/add_to_basket';
import PaymentPage from '../page_classes/payment_page';

//website-specific variables:
const homepageURL = 'https://www.bigbathroomshop.co.uk';
const dropDownProductURL = 'https://www.bigbathroomshop.co.uk/milano-aruba-dark-blue-vertical-designer-radiator-double-panel-all-sizes-83246';
const swatchProductURL = 'https://www.bigbathroomshop.co.uk/milano-aruba-anthracite-vertical-designer-radiator-choice-of-size-and-valve-options-88291';
const expectedError = 'Your payment could not be taken. Please try again or use a different payment method. Processor Declined';

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
