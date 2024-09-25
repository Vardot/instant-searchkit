import './datePickerStyle.css';

/**
 * Initializes and manages the behavior of a custom date picker.
 *
 * This function sets up event listeners for the date input fields and the close button in the
 * date range picker, allowing the user to show and hide date picker elements when interacting
 * with the inputs or clicking outside the picker. It also handles keyboard events such as
 * "Enter" and "Escape" to hide the date picker.
 *
 * The function leverages a `MutationObserver` to observe changes in the DOM and ensure the
 * event listeners are attached to dynamically added date inputs, such as those inside a date
 * range picker.
 *
 * Elements targeted by this function include:
 * - `.rdrMonthAndYearWrapper`: Month and year selection wrapper in the date picker.
 * - `.rdrMonths.rdrMonthsVertical`: Main date picker calendar months display.
 * - `.rdrDefinedRangesWrapper`: Wrapper containing predefined ranges.
 * - `.btn-close-date`: Custom close button for the date picker.
 * - `.date-range-filter`: Main wrapper of the date range picker component.
 *
 * @returns {Function} A cleanup function that removes event listeners and disconnects the
 *                     `MutationObserver` when no longer needed.
 */
export const initializeDatePicker = () => {
  // Function to reset date picker state on initialization
  const resetDatePicker = () => {
    hideDatePicker();
  };

  // Function to show date picker elements.
  const showDatePicker = () => {
    const monthAndYearWrapper = document.querySelector(".rdrMonthAndYearWrapper") as HTMLElement;
    const monthsVertical = document.querySelector(".rdrMonths.rdrMonthsVertical") as HTMLElement;
    const definedRangesWrapper = document.querySelector(".rdrDefinedRangesWrapper") as HTMLElement;
    const closeButton = document.querySelector(".rdrDateRangeWrapper .btn-close-date") as HTMLElement;
    const dateRangeFilter = document.querySelector(".date-range-filter") as HTMLElement;

    if (monthAndYearWrapper) monthAndYearWrapper.style.display = "flex";
    if (monthsVertical) monthsVertical.style.display = "flex";
    if (definedRangesWrapper) definedRangesWrapper.style.display = "block";
    if (closeButton) closeButton.style.display = "block";
    if (dateRangeFilter && !dateRangeFilter.classList.contains("open")) {
      dateRangeFilter.classList.add("open");
    }
  };

  // Function to hide date picker elements
  const hideDatePicker = () => {
    const monthAndYearWrapper = document.querySelector(".rdrMonthAndYearWrapper") as HTMLElement;
    const monthsVertical = document.querySelector(".rdrMonths.rdrMonthsVertical") as HTMLElement;
    const definedRangesWrapper = document.querySelector(".rdrDefinedRangesWrapper") as HTMLElement;
    const closeButton = document.querySelector(".rdrDateRangeWrapper .btn-close-date") as HTMLElement;
    const dateRangeFilter = document.querySelector(".date-range-filter") as HTMLElement;

    if (monthAndYearWrapper) monthAndYearWrapper.style.display = "none";
    if (monthsVertical) monthsVertical.style.display = "none";
    if (definedRangesWrapper) definedRangesWrapper.style.display = "none";
    if (closeButton) closeButton.style.display = "none";
    if (dateRangeFilter && dateRangeFilter.classList.contains("open")) {
      dateRangeFilter.classList.remove("open");
    }
  };

  // Attach event listeners for date input and buttons
  const attachListeners = () => {
    const dateInputs = document.querySelectorAll(".rdrDateInput input");
    const closeButton = document.querySelector(".btn-close-date");

    dateInputs.forEach((input) => {
      const inputElement = input as HTMLInputElement;
      inputElement.addEventListener("focus", showDatePicker);
      inputElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === "Escape") {
          hideDatePicker();
        }
      });
    });

    if (closeButton) {
      (closeButton as HTMLButtonElement).addEventListener("click", hideDatePicker);
    }

    // Close the date picker when clicking outside
    document.addEventListener("mousedown", (event: MouseEvent) => {
      const dateRangeFilter = document.querySelector(".date-range-filter") as HTMLElement;
      if (dateRangeFilter && !dateRangeFilter.contains(event.target as Node)) {
        hideDatePicker();
      }
    });
  };

  // MutationObserver to observe DOM changes and attach events when necessary
  const observer = new MutationObserver(() => {
    attachListeners();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Ensure the date picker is reset when initializing
  resetDatePicker();

  // Initial listener attachment
  attachListeners();

  // Return a cleanup function
  return () => {
    observer.disconnect();
    document.removeEventListener("mousedown", hideDatePicker);
  };
};
