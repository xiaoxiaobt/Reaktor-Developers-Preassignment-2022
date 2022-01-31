import React from 'react'
import resultService from '../services/results'
import ResultEntry from './ResultEntry'
import InfiniteScroll from 'react-infinite-scroll-component'
import List from '@mui/material/List'

/**
 * `Home` component displays all on-going and past matches
 * @param {object} props - props
 * @param {object[]} props.resultsCombined - Results from both databases and those that are not in databases.
 * @param {object[]} props.ongoing - Matches that are on-going.
 * @param {boolean} props.hasMore - Whether there are more matches to load. Used in infinite scroll.
 * @param {Function} props.setResultsInDatabases - Function for modifying visible results.
 * @param {Function} props.setHasMore - Function for modifying `hasMore`.
 * @param {int} props.resultCursor - Cursor of the results in databases.
 * When calling `fetchMoreData` function, the next 50 results will be fetched from the database, starting from `resultCursor`.
 * @param {function} props.setResultCursor - Function for modifying `resultCursor`.
 * The function is always used to increase the cursor by 50.
 */
const Home = ({ resultsCombined, ongoing, hasMore, setResultsInDatabases,
  setHasMore, resultCursor, setResultCursor }) => {
  return (
    <div>
      <h1 id="ongoing">On-going</h1>
      <center>
        <List className="entryList">
          {ongoing
            .map((message, idx) => <ResultEntry key={idx} result={message} />)}
        </List>
      </center>
      <h1 id="history">Game history</h1>
      <InfiniteScroll
        dataLength={resultsCombined.length}
        next={() => resultService
          .fetchMoreData(setResultsInDatabases, setHasMore, resultCursor, setResultCursor)}
        hasMore={hasMore}
        loader={<center><h2>Loading...</h2></center>}
        endMessage={<center><b>Yay! You have seen it all</b></center>}
      >
        <center>
          <List className="entryList">
            {resultsCombined.map((result, idx) => <ResultEntry key={idx} result={result} />)}
          </List>
        </center>
      </InfiniteScroll>
    </div>
  )
}

export default Home