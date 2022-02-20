# Reaktor pre-assignment

<https://www.reaktor.com/assignment-2022-developers/>

The app can be accessed from:

<https://reaktor-preassignment-dev-2022.herokuapp.com/>

## Screenshots

![homepage](/screenshots/homepage.png)
![players](/screenshots/players.png)

## Design choices

Because using the API directly is not feasible due to the data amount, a MongoDB database is used to store the history data. A Python script is used to synchronize the data every 10 minutes. The script is also used to keep the website from hibernating, as the website is hosted on a free Heroku Dyno.

When launching the application, the application first fetches 50 records from databases as well as those records that are already available on `rps/history` endpoint but not yet synchronized to the database. The application also listens to a WebSocket connection to receive new data. When the user scrolls to the end of the page, the application fetches more data from the database, so the user is able to scroll infinitely.

## Tasks

- [x] Scheduled trigger for loading history to the database
- [x] MongoDB
- [x] Websocket
- [x] Backend
  - [x] History data API
  - [x] User data API
  - [x] Bridge for Reaktor API to prevent CORS issues
  - [x] User aggregated data API
  - [x] OpenAPI specification
- [x] Frontend
  - [x] Basic components
  - [x] Nav bar
  - [x] Infinite scroll
  - [x] Players in alphabetical list
  - [x] Aggregated data layout
- [x] Stylesheet and UI improvements
- [x] Deployment
- [x] Comments and README

## Known issues

- In rare cases, if the user keeps scrolling, data cannot be loaded properly due to memory usage issues caused by `skip()`. This can be prevented by using checking timestamp instead, however, extra efforts need to be taken into account, for instance, if there are two records with the same timestamp.
- A bug may exist when loading the difference between the database and the current historical data. Sometimes only a few get loaded, and it is not clear why.

## About

Images (excluding `pending.png`) used in this repository were purchased from Adobe Stock. These images cannot be reused without permission.
