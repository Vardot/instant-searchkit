import React, { useState } from 'react';

interface ResultSwitcherProps {
  onSwitch: (view: 'grid' | 'table') => void;
}

/**
 * ResultSwitcher component allows users to switch between grid and table views.
 *
 * @param {ResultSwitcherProps} props - The component props.
 * @param {(view: 'grid' | 'table') => void} props.onSwitch - A callback function to handle view switching.
 *
 * @return {JSX.Element} The JSX element representing the ResultSwitcher component.
 */
const ResultSwitcher: React.FC<ResultSwitcherProps> = ({ onSwitch }) => {
  const [activeView, setActiveView] = useState<'grid' | 'table'>('grid');

  const handleSwitch = (view: 'grid' | 'table') => {
    setActiveView(view);
    onSwitch(view);
  };

  return (
    <div className="result-switcher">
      <span
        className={`grid ${activeView === 'grid' ? 'active' : ''}`}
        onClick={() => handleSwitch('grid')}
      ></span>
      <span
        className={`table ${activeView === 'table' ? 'active' : ''}`}
        onClick={() => handleSwitch('table')}
      ></span>
    </div>
  );
};

export default ResultSwitcher;
