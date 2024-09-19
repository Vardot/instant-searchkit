import React from 'react';
import { useStats } from 'react-instantsearch';
import GlobalClearRefinements from './GlobalClearRefinements';

interface NoResultsProps {
  type: string;
}

/**
 * Renders the NoResults component.
 *
 * @param {NoResultsProps} props - The props object containing the type property.
 * @return {React.ReactNode | null} The rendered NoResults component or null if nbHits is not equal to 0.
 */
const NoResults: React.FC<NoResultsProps> = ({ type }) => {
  const { nbHits } = useStats();

  if (nbHits === 0) {
    return (
      <div className="no-results">
        <div className='no-results-img'></div>
        <h3>No {type} Found</h3>
        <p>No {type} have been found that match your search. Try searching with a different keyword.</p>
        <GlobalClearRefinements buttonText='Clear All Search Criteria' className='no-results-btn btn btn-primary' />
      </div>
    );
  }

  return null;
};

export default NoResults;
