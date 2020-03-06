import {Selector, t} from 'testcafe';

export default class AddressPage{

    constructor(){
        this.inputEmail = Selector('#customer-email');
        this.inputFirstName = Selector('input').withAttribute('name', 'firstname');
        this.inputLastName = Selector('input').withAttribute('name', 'lastname');
        this.inputPostcode = Selector('input').withAttribute('name', 'postcode');
        this.inputCity = Selector('input').withAttribute('name', 'city');
        this.inputAddressOne = Selector('input').withAttribute('name', 'street[0]');
        this.inputTelephone = Selector('input').withAttribute('name', 'telephone');
        //check with someone what opc-continue is
        this.submitDetails = Selector('button').withAttribute('data-role', 'opc-continue');
        this.requiredRegion = Selector('select.select').withAttribute('name', 'region_id').withAttribute('aria-required', 'true')
        this.selectShipping = Selector('#shipping-method-buttons-container').child('div.primary').child('button');
    }

    async completeForm( username = 'phil.holliday@limitlessdigital.com',
                        firstName = 'Phil',
                        lastName = 'Test',
                        addressOne = 'Dawson Court',
                        city = 'Burnley',
                        postcode = 'BB11 5UB',
                        phoneNumber = '01282 471385')
                        {
                            await   t.wait(10000)
                                    .typeText(this.inputEmail, username)
                                    .typeText(this.inputFirstName, firstName)
                                    .typeText(this.inputLastName, lastName)
                                    .typeText(this.inputPostcode, postcode)
                                    //deselect address field to avoid PCA getting in the way
                                    .click(this.inputEmail).wait(2000)
                                    .typeText(this.inputCity, city)
                                    //deselect address field to avoid PCA getting in the way
                                    .click(this.inputEmail).wait(2000)
                                    .typeText(this.inputAddressOne, addressOne)
                                    .typeText(this.inputTelephone, phoneNumber)
                            
                            const region = await this.requiredRegion.filterVisible().exists;
                            if (region){
                                await t.click(this.requiredRegion).click(this.requiredRegion.child('option').nth(1));
                            }

                            await   t.click(this.submitDetails).wait(1500)
                                    .click(this.selectShipping);
                        }

}