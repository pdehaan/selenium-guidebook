const ms = require("ms");
const { Builder } = require("selenium-webdriver");

require("dotenv").config();

const { USERNAME, PASSWORD, BROWSER = "firefox" } = process.env;

describe("Login", function () {
  this.timeout(ms("10s"));
  let driver;

  beforeEach(async function beforeEach() {
    console.time("RUN TEST");
    console.info("\nBEFORE EACH");
    console.time("\tlaunch browser");
    driver = await new Builder().forBrowser(BROWSER).build();
    console.timeEnd("\tlaunch browser");
  });

  afterEach(async function () {
    console.info("\nAFTER EACH");
    console.time("\tkill browser");
    await driver.quit();
    console.timeEnd("\tkill browser");
    console.timeEnd("RUN TEST");
    console.info("-".repeat(40));
  });

  it("with valid credentials", async function () {
    console.info("test1...");
    await driver.get("https://the-internet.herokuapp.com/login");
    await driver.findElement({ id: "username" }).sendKeys(USERNAME);
    await driver.findElement({ id: "password" }).sendKeys(PASSWORD);
    await driver.findElement({ css: "button" }).click();
    console.log("SUCCESS");
  });

  it("fails with invalid credentials", async function () {
    console.info("test2...");
    await driver.get("https://the-internet.herokuapp.com/login");
    await driver.findElement({ id: "username" }).sendKeys(USERNAME);
    await driver.findElement({ id: "password" }).sendKeys(PASSWORD + "pants");
    await driver.findElement({ css: "button" }).click();
    console.log("SUCCESS");
  });
});
