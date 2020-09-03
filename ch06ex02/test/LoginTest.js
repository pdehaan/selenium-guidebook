// For usage info, see https://nodejs.org/api/assert.html
const assert = require("assert").strict;

const ms = require("ms");
const { Builder } = require("selenium-webdriver");

// Auto load environment variables from .env file.
require("dotenv").config();

const { USERNAME, PASSWORD, BROWSER = "firefox" } = process.env;

async function Browser(engine = "firefox") {
  return new Builder().forBrowser(engine).build();
}

describe("Login", function () {
  this.timeout(ms("10s"));
  let driver;

  beforeEach(async function () {
    driver = await Browser(BROWSER);
  });

  afterEach(async function () {
    await driver.quit();
  });

  // NOTE: This test won't be run due to the `it.only()` below on L34.
  // This makes the test run marginally faster since it only needs to
  // launch the browser once instead of twice.
  it("with valid credentials", async function () {
    await driver.get("https://the-internet.herokuapp.com/login");
    await driver.findElement({ id: "username" }).sendKeys(USERNAME);
    await driver.findElement({ id: "password" }).sendKeys(PASSWORD);
    await driver.findElement({ css: "button" }).click();
    assert(
      await driver.findElement({ css: ".flash.success" }).isDisplayed(),
      "Success message not displayed"
    );
  });

  it.only("fails with invalid credentials", async function () {
    await driver.get("https://the-internet.herokuapp.com/login");
    await driver.findElement({ id: "username" }).sendKeys(USERNAME);
    // NOTE: We're appending some characters to the password here to give us an invalid password to test the messaging.
    await driver.findElement({ id: "password" }).sendKeys(PASSWORD + Math.random());
    await driver.findElement({ css: "button" }).click();

    // NOTE: Another suboptimal issue might be the fact we're doing the DOM
    // lookup of `driver.findElement({css:".flash.error"})` at least 3x in
    // this test case. Might be worth seeing if we can do it once and cache
    // the potentially expensive lookup or if that has downstream issues.
    const el = await driver.findElement({ css: ".flash.error" });

    assert(await el.isDisplayed(), "Success message not displayed");

    // OPTION 1: Use `assert.equal()` to compare the full error text.
    assert.equal(
      // NOTE: Need to wrap the `.getText()` bit in parens since it returns a
      // promise and we want to resolve said promise before calling the
      // string's `.trim()` method. Perhaps a better way, but I wanted to use
      // `assert.equal()` here for the superior error diffing.
      (await el.getText()).trim(),
      // This is goofy because the `getText()` includes a newline and the `×`
      // icon for dismissing the flash message.
      "Your password is invalid!\n×",
      "Invalid password"
    );

    // OPTION 2: Use vanilla `assert()` and `<string>.includes()` to check partial text.
    assert(
      // Perhaps slightly better string checking method using `.includes()`
      // to only check the substring we care about. We still need to wrap
      // the `await ....getText()` call in parens to resolve the promise
      // before we can call `.includes()`. Error messaging won't be as nice
      // if the test fails but probably a good enough compromise.
      (await el.getText()).includes("Your password is invalid!"),
      "Invalid password"
    );

    // OPTION 3: Use `assert.match()` to use regexp string matching to check the invalid password text.
    // https://nodejs.org/api/assert.html#assert_assert_match_string_regexp_message
    assert.match(
      await el.getText(),
      /^Your password is invalid!/,
      "Invalid password"
    );
  });
});
