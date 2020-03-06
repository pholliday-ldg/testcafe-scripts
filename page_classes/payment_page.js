import {Selector, t} from 'testcafe';

export default class PaymentPage{

    constructor(){
        this.errorMessage = Selector('div.message.message-error.error');
        this.braintree = Selector('#braintree');
        this.tickbox = Selector('div.checkout-agreement > input');
    }

    async inputCreditCard(cardNumber = '4444333322221111'){
        await   t.switchToIframe('#braintree-hosted-field-number')
                .typeText('#credit-card-number', cardNumber)
                .switchToMainWindow();
    }

    async inputExpiryDate(expiryDate = '1222'){
        await   t.switchToIframe('#braintree-hosted-field-expirationDate')
                .typeText('#expiration', expiryDate)
                .switchToMainWindow();
    }

    async inputCVV(cvv = '123'){
        await   t.switchToIframe('#braintree-hosted-field-cvv')
                .typeText('#cvv', cvv)
                .switchToMainWindow();
    }
    
    async enterCardDetails(cardNumber = '4444333322221111', expiryDate = '1222', cvv = '123'){
        await   t.wait(1500).click(this.braintree).wait(1500);
        await   this.inputCreditCard(cardNumber);
        await   this.inputExpiryDate(expiryDate);
        await   this.inputCVV(cvv);
    }

    async confirmPayment(){
        let box = await this.tickbox.filterVisible().exists;
        if(box){
                await t.click(this.tickbox.filterVisible());
        }
        await   t.click(Selector('.action.primary.checkout').filterVisible());
    }
    
}