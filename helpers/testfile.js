import {Selector, t} from 'testcafe';
import {checkoutFromProductPage , checkoutFromCategoryPage , checkoutDropDownConfigurable , checkoutSwatchConfigurable} from './add_to_basket';
import PaymentPage from '../page_classes/payment_page';

//website-specific variables:
const simpleProductURL = 'https://www.bestheating.com/milano-minimalist-chrome-angled-radiator-valves-pair-21059';
const categoryPageURL = 'https://www.bestheating.com/radiators/designer-radiators/vertical-designer-radiators.html';
const dropDownProductURL = 'https://www.bestheating.com/milano-windsor-metallic-copper-vertical-traditional-column-radiator-triple-column-various-sizes-83262';
const swatchProductURL = 'https://www.bestheating.com/milano-aruba-white-vertical-designer-radiator-various-sizes-78656';
const expectedError = 'Your payment could not be taken. Please try again or use a different payment method. Processor Declined';

const paymentPage = new PaymentPage();

async function messageCheck(){
    await t.expect(paymentPage.errorMessage.innerText).eql(expectedError);
}

fixture('Checkout from a product page')
.page(simpleProductURL)

test('Checkout test', async t => {
    await checkoutFromProductPage();
    await messageCheck();
})

fixture('Checkout from category page').only
.page(categoryPageURL)

test('Checkout with one product', async t => {
    await checkoutFromCategoryPage();
    await messageCheck();
})

test('Checkout with two products', async t => {
    await checkoutFromCategoryPage(2);
    await messageCheck();
})

fixture('Checkout with drop-down configurable')
.page(dropDownProductURL)

test('Buy one drop-down', async t => {
    await checkoutDropDownConfigurable();
    await messageCheck();
})

fixture('Checkout with swatch configurable')
.page(swatchProductURL)

test('Buy one swatch product', async t => {
    await checkoutSwatchConfigurable();
    await messageCheck();
})