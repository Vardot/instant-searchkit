import React from 'react';
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch';

interface FacetRefinementListProps extends UseRefinementListProps {
  transformItems?: (items: any[]) => any[];
}

/**
* FacetRefinementList component displays a list of refinement options for a facet.
*
* @param {FacetRefinementListProps} props - The component props.
* @param {UseRefinementListProps} props - The props from `react-instantsearch`.
* @param {(items: any[]) => any[]} [props.transformItems] - An optional function to transform the refinement list items.
*
* @return {JSX.Element} The JSX element representing the FacetRefinementList component.
*/
function FacetRefinementList(props: FacetRefinementListProps) {
  const {
    items,
    refine,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
    searchForItems,
  } = useRefinementList(props);

  // Apply the `transformItems` function if provided
  const transformedItems = props.transformItems ? props.transformItems(items) : items;

  return (
    <>
      <div className={'ais-RefinementList'}>
        {transformedItems.length === 0 ? (
          <div className="no-results-message">
            No filters available
          </div>
        ) : (
          <ul className="ais-RefinementList-list">
            {transformedItems.map((item: any) => (
              <li key={item.label} className="ais-RefinementList-item">
                <label className="ais-RefinementList-label">
                  <input
                    className="ais-RefinementList-checkbox"
                    type="checkbox"
                    value={item.label}
                    checked={item.isRefined}
                    onChange={() => refine(item.value)}
                  />
                  <span
                    className="ais-RefinementList-labelText">{item.label}</span>
                  <span className="ais-RefinementList-count">{item.count}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default FacetRefinementList;
