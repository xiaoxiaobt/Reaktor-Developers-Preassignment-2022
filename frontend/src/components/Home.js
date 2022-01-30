import React, { useState, useEffect } from 'react'
// import Result from '../models/result'
import resultService from '../services/results'
import ResultEntry from './ResultEntry'
import InfiniteScroll from 'react-infinite-scroll-component'
import List from '@mui/material/List'

const Home = ({ results, ongoing, hasMore, setResults,
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
        dataLength={results.length}
        next={_ => resultService
          .fetchMoreData(setResults, setHasMore, resultCursor, setResultCursor)}
        hasMore={hasMore}
        loader={<center><h4>Loading...</h4></center>}
        endMessage={
          <p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>
        }
      >
        <center>
          <List className="entryList">
            {results.map((result, idx) => <ResultEntry key={idx} props={result} />)}
          </List>
        </center>
      </InfiniteScroll>
    </div>
  )
}

export default Home