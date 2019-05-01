import { ClientFunction } from 'testcafe';
import { ReactSelector, waitForReact } from 'testcafe-react-selectors';
import { getPageUrl } from './helpers';

const getPageTitle = ClientFunction(() => document.title);
const assertNoConsoleErrors = async t => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Home Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

test('e2e', async t => {
  await t.expect(getPageTitle()).eql('Dockertron');
});

test('should open window', async t => {
  await t.expect(getPageTitle()).eql('Dockertron');
});

test(
  "should haven't any logs in console of main window",
  assertNoConsoleErrors
);

test('should navgiate to /volume', async t => {
  await waitForReact();
  await t
    .click(
      ReactSelector('Link').withProps({
        to: '/volume'
      })
    )
    .expect(getPageUrl())
    .contains('/volume');
});

// fixture`Counter Tests`
//   .page('../../app/app.html')
//   .beforeEach(clickToCounterLink)
//   .afterEach(assertNoConsoleErrors);

// test('should display updated count after increment button click', async t => {
//   await t
//     .click(incrementButton)
//     .expect(getCounterText())
//     .eql('1');
// });

// test('should display updated count after descrement button click', async t => {
//   await t
//     .click(decrementButton)
//     .expect(getCounterText())
//     .eql('-1');
// });

// test('should not change if even and if odd button clicked', async t => {
//   await t
//     .click(oddButton)
//     .expect(getCounterText())
//     .eql('0');
// });

// test('should change if odd and if odd button clicked', async t => {
//   await t
//     .click(incrementButton)
//     .click(oddButton)
//     .expect(getCounterText())
//     .eql('2');
// });

// test('should change if async button clicked and a second later', async t => {
//   await t
//     .click(asyncButton)
//     .expect(getCounterText())
//     .eql('0')
//     .expect(getCounterText())
//     .eql('1');
// });

// test('should back to home if back button clicked', async t => {
//   await t
//     .click('[data-tid="backButton"] > a')
//     .expect(Selector('[data-tid="container"]').visible)
//     .ok();
// });
