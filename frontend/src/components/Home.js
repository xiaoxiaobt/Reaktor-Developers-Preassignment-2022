import React from 'react'
import resultService from '../services/results'
import ResultEntry from './ResultEntry'
import InfiniteScroll from 'react-infinite-scroll-component'
import List from '@mui/material/List'

const Home = ({ resultsCombined, ongoing, hasMore, setResultsInDatabases,
  setHasMore, resultCursor, setResultCursor }) => {
  return (
    <div>
      <h1 id="ongoing">On-going</h1>
      <center>
        <List className="entryList">
          {ongoing
            .map((message, idx) => <ResultEntry key={idx} props={message} />)}
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
            {resultsCombined.map((result, idx) => <ResultEntry key={idx} props={result} />)}
          </List>
        </center>
      </InfiniteScroll>
    </div>
  )
}

export default Home