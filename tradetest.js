import {Selector, t} from 'testcafe';
import './helpers/add_to_basket';

fixture('Homepage').page('https://www.bestheating.com');

test('Trade login', async t => {
    await t.click('#my-account-link').typeText('#email', 'phil.holliday@limitlessdigital.com').typeText('#pass', 'Testcafe123').switchToIframe(Selector('iframe').withAttribute('role', 'presentation')).click('.recaptcha-checkbox-checkmark').switchToMainWindow().click('button.action.login');
});