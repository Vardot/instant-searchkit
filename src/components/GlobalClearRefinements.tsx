import React from 'react';
import {
  useClearRefinements,
  UseClearRefinementsProps,
} from 'react-instantsearch';

interface GlobalClearRefinementsProps extends UseClearRefinementsProps {
  buttonText?: string;
  className?: string;
}

/**
 * Renders a global clear refinements button that clears all refinements when clicked.
 *
 * @param {GlobalClearRefinementsProps} props - The props for the component.
 * @param {string} props.buttonText - The text to display on the button. Defaults to 'Clear Filters'.
 * @param {string} props.className - The CSS class name for the button. Defaults to 'clear btn btn-outline-secondary'.
 * @param {UseClearRefinementsProps} props - The props for the useClearRefinements hook.
 * @return {JSX.Element} The rendered clear refinements button.
 */
const GlobalClearRefinements: React.FC<GlobalClearRefinementsProps> = ({ buttonText, className, ...props }) => {
  const { canRefine, refine } = useClearRefinements(props);

  const dateResetButton = document.querySelector('.reset') as HTMLElement;
  const nameReset = document.querySelectorAll('.ais-SearchBox-reset') as NodeListOf<HTMLElement>;
  const deleteButtons = document.querySelectorAll('.ais-CurrentRefinements-delete') as NodeListOf<HTMLElement>;

  let disabled = false;

  if (!canRefine && !dateResetButton && !deleteButtons && !nameReset) {
    disabled = true;
  }

  const handleClick = () => {
    refine();

    if (dateResetButton) {
      dateResetButton.click();
    }

    if (nameReset) {
      nameReset.forEach((button) => {
        button.click();
      });
    }

    if (deleteButtons) {
      deleteButtons.forEach((button) => {
        button.click();
      });
    }
  }

  return (
    <div className='clear-refinements'>
      <button className={className ?? 'clear btn btn-outline-secondary'} aria-label={'clear filters'} disabled={disabled} onClick={handleClick}>
        {buttonText ?? 'Clear Filters'}
      </button>
    </div>
  );
}

export default GlobalClearRefinements;
