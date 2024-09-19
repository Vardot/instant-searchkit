import React from 'react';
import { useStats } from 'react-instantsearch';

/**
 * CustomStats component displays the number of search results and the current page.
 *
 * @return {JSX.Element} The JSX element representing the CustomStats component.
 */
function CustomStats() {
  const { nbHits, page, hitsPerPage = 12 } = useStats();

  const start = page * hitsPerPage + 1;
  const end = Math.min((page + 1) * hitsPerPage, nbHits);

  return (
    <span className='current-stats'>
      {nbHits > 0 ?
        (
          <>
            <b>{end}</b> out of <span className="stats-total-hits">{nbHits.toLocaleString()}</span> results found
          </>
        ) : (
          <>
          <b>0</b> out of <span className="stats-total-hits">{nbHits.toLocaleString()}</span> results found
          </>
        )}
    </span>
  );
}

export default CustomStats;
