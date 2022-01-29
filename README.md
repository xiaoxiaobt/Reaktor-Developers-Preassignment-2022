# Reaktor pre-assignment

## **I am still working on it, most likely this will still take a few days... Maybe come back later if you have time**

<https://www.reaktor.com/assignment-2022-developers/>

### Done

- [x] Scheduled trigger for loading history to the database
- [x] MongoDB
- [x] Websocket

### TODO

- [ ] Backend
  - [x] History data API
  - [x] User data API
  - [x] Bridge for Reaktor API to prevent CORS issues
  - [ ] User aggregated data API

- [ ] Frontend
  - [x] Basic components
  - [x] Nav bar
  - [x] Infinite scroll
  - [x] Players in alphabetical list
  - [ ] Aggregated data layout
- [ ] Deployment
- [ ] Stylesheet and UI improvements
- [ ] Comments, README, and documentation
- [ ] Performance improvements
- [ ] Better linting rules

### Known issues

- In rare cases, if user keeps scrolling, data cannot be loaded properly due to memeory usage issue caused by `skip()`. This can be prevented by using checking timestamp instead, however, extra efforts need to be taken into account for instance if there are two records with the same timestamp.
- A bug may exist when loading the differnece between the database and the current history data. Sometimes only a few get loaded, and it is not clear why.
- Data need to be displayed with the newest data on top.
- Duplicate entries are possible but reason not clear.
