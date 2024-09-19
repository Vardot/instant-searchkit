import React from 'react';
import { useInstantSearch } from "react-instantsearch";

interface NoResultsBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactElement;
}

/**
 * Renders the fallback component if no results are found, otherwise renders the children.
 *
 * @param {React.ReactNode} children - The child components to render.
 * @param {React.ReactElement} fallback - The fallback component to render if no results are found.
 * @return {React.ReactElement} The rendered component.
 */
const NoResultsBoundary: React.FC<NoResultsBoundaryProps> = ({ children, fallback }) => {
  const { results } = useInstantSearch();

  // The `__isArtificial` flag makes sure not to display the No Results message
  // when no hits have been returned.
  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return <>{children}</>;
};

export default NoResultsBoundary;
