import React from 'react';

interface FormattedDateProps {
  timestamp: number;
}

/**
 * Formats a given Unix timestamp into an ISO string and a localized date string.
 *
 * @param {number} timestamp - The Unix timestamp to be formatted.
 * @return {{ isoString: string, formattedDate: string }} An object containing the ISO string and the localized date string.
 */
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  const isoString = date.toISOString(); // Get the ISO string representation
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return { isoString, formattedDate };
};

/**
 * Renders a formatted date component.
 *
 * @param {FormattedDateProps} props - The component props.
 * @param {number} props.timestamp - The timestamp to format.
 * @return {JSX.Element} The formatted date component.
 */
const FormattedDate: React.FC<FormattedDateProps> = ({ timestamp }) => {
  const { isoString, formattedDate } = formatDate(timestamp);

  return (
    <time dateTime={isoString}>
      {formattedDate}
    </time>
  );
};

export default FormattedDate;
