# Reaktor pre-assignment

<https://www.reaktor.com/assignment-2022-developers/>

The app can be accessed from:

<https://reaktor-preassignment-dev-2022.herokuapp.com/>

(**Note:** The app is deployed on a free dyno, so it may take some time to start)

## Tasks

- [x] Scheduled trigger for loading history to the database
- [x] MongoDB
- [x] Websocket
- [x] Backend
  - [x] History data API
  - [x] User data API
  - [x] Bridge for Reaktor API to prevent CORS issues
  - [x] User aggregated data API
- [x] Frontend
  - [x] Basic components
  - [x] Nav bar
  - [x] Infinite scroll
  - [x] Players in alphabetical list
  - [x] Aggregated data layout
- [x] Stylesheet and UI improvements
- [x] Deployment
- [ ] Comments and README

## Known issues

- In rare cases, if the user keeps scrolling, data cannot be loaded properly due to memory usage issues caused by `skip()`. This can be prevented by using checking timestamp instead, however, extra efforts need to be taken into account, for instance, if there are two records with the same timestamp.
- A bug may exist when loading the difference between the database and the current historical data. Sometimes only a few get loaded, and it is not clear why.
- Data need to be displayed with the newest data on top.
- Duplicate entries are possible but the reason is not clear.
