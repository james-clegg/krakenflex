# Krakenflex

## Purpose

This was written as part of the backend test for Krakenflex to answer the below brief:

* Retrieve list of outages from a given site from the `GET /outages` endpoint.
* Retrieve information about a given site itself from the `GET /site-info/{siteId}` endpoint.
* Filter the outages to remove both those that started before a given timestamp, in this case `2022-01-01T00:00:00.000Z`, and those that had an ID that did not match a device found within the site information.
* For those that were not filtered out, the name of the device should then be appended to the outage.
* These filtered and updated outages were then to be sent to the `POST /site-outages/{siteId}` for the aforementioned given site. 
* Upon a successful POST request, this would return a 200 status code, so I added a small message to indicate this. 
* It was also noted that the API will occasionally return a 500 status code, so it is wrapped in a try catch block to catch and log the error in order to assist with future debugging. 

## How to run the program

* Clone the repository.
* Run `npm i` to install the dependencies.
* Add the API key as an environment variable called `API_KEY`. This can be done by creating a `.env` file, or more simply by running the command `export API_KEY=<api key>` inside the terminal that you intend to run the program within.
* Run the command `npm run program` which will build the typescript code, navigate into the `build` directory, and run the program. 
* If the program ran successfully, you should see a small message suggesting so in the console. If there was an error, it should be logged to the console instead.

## Testing

* There are unit tests set up to test the filtering function.
* These can be run by opening a terminal and running `npm test`.
* The output of these should then be shown in the console. 

## Other considerations

* In future, it could be worth setting up some form of monitoring for the errors. If there were over a given number of errors in a particular timeframe it could alert a support team to look into the bug more urgently.
* If the API is just flaky for a reason that cannot be remedied it may be worth setting up some form of retrying. This could use an idempotency token to ensure that it doesn't save the same data multiple times, but this seemed out of the scope of this project. 
* Currently the timestamp was hardcoded inside the utils file as there was no requirement for it to be a variable. I would imagine in real use this may well be passed in, so it could be worth adding it as an parameter for the `handler` function, similarly to the `siteID`, that can then be passed into `filterOldOrIrrelevantOutages`.