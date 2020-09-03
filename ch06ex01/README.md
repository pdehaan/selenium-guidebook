# Selenium Guidebook

To buy the excellent book, go to <https://seleniumguidebook.com/>.

## USAGE

To run the tests using [**mocha**](http://npm.im/mocha), run <kbd>npm test</kbd>.

> **NOTE:** The tests will **pass** by default since we aren't using any assertion libraries yet. So even if you specify the incorrect username/password combination, everything is green. We'll fix this in a future exercise.

> **NOTE:** By default, the tests will launch Firefox (via **geckodriver**). If you want to run the tests in Chrome, run <kbd>npm run test:chrome</kbd>. If you want to explicitly run the tests in Firefox (because you changed the default browser to be Chrome), run <kbd>npm run test:firefox</kbd>.

I opted to install **geckodriver** and **chromedriver** via <kbd>npm install geckodriver -D</kbd> and <kbd>npm install chromedriver -D</kbd> respectively, so the **geckodriver** and **chromedriver** binaries should be in the ./node_modules/.bin/* directory and be added to the path automatically if you run the scripts via <kbd>npm run</kbd>. This saves the goofy "./vendor/" directory and path setting hacks (at the expense of needing to redownload the binary each time you run <kbd>npm install</kbd>). A fair trade, and possibly easier to keep the binary up to date using npm. Although perhaps a single top level vendor directory or something might be a good compromise since now I'd need to update the package.json file at potentially dozens of locations for each example folder. But not really a legit concern considering you'd never structure actual tests this way (with their own separate package.json file and sub-dependencies).
