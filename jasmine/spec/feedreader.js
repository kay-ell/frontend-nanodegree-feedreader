/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all URLs are defined and that they are not empty', function() {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined(); // test whether feed's url is defined
                expect(feed.url.length).not.toBe(0); // test whether feed's url is not empty
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all names in allFeeds are defined and not empty', function() {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined(); // test whether feed name is defined
            expect(feed.name.length).not.toBe(0); // test whether feed name is not empty
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu is hidden by default', function() {
            const body = document.querySelector('body');
            // test whether the body contain a class that hides the menu by default
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility when menu icon is clicked', function() {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');
            menu.click();
            // test whether the menu-hidden class toggles on click
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menu.click();
            // test whether the menu-hidden class toggles on click
            expect(body.classList.contains('menu-hidden')).toBe(true); 
        });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done); // loadFeed done before the tests
        });

        it('at least a single entry when the loadFeed is completed', function() {
            const feed = document.querySelector('.feed');
            expect(feed.children.length > 0).toBe(true); // test whether the feed container has any children elements in it
        });
    });
        

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        const feed = document.querySelector('.feed');
        let newFeed = []; // create an empty array to hold the children elements of the feed container

        beforeEach(function(done) {
            loadFeed(0);
            let feedsArray = feed.children;
            // loop through the feed's children elements and push them into the newFeed array
            Array.from(feed.children).forEach(function(entry) {
                newFeed.push(entry.innerText);
            });
            loadFeed(1, done);
        });

        it('content actually changes', function() {
            // loop through the feed's children elements and check whether the entry matches the one in the newFeed array
            Array.from(feed.children).forEach(function(entry, ind) {
                expect(entry.innerText === newFeed[ind]).toBe(false);
            });
        });
    });

}());
