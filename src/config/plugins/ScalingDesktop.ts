// @ts-expect-error: Unreachable code error
export const ScalingDesktop = ({ addComponents }) => {
  const desktopBreakPoints = ['1920px', '1440px', '768px', '599px'];
  const baseFontSize = 62.5; // Base font-size in percentage
  const decrementStep = 2.5; // Decrement step in percentage
  const widthReductionStep = 50; // Screen width reduction step in pixels

  const mediaQueries = [];

  let currentBreakpoint = parseInt(desktopBreakPoints[0]);
  let baseBreakpoint = currentBreakpoint; // Save the base breakpoint for calculations
  let currentFontSize = baseFontSize;
  let currentBreakpointIndex = 0;

  while (currentBreakpoint >= parseInt(desktopBreakPoints[desktopBreakPoints.length - 1])) {
    const activeBreakpoint = parseInt(desktopBreakPoints[currentBreakpointIndex]);

    // Update the current font size and base breakpoint when reaching a new active breakpoint
    if (currentBreakpoint <= activeBreakpoint) {
      currentFontSize = baseFontSize;
      baseBreakpoint = activeBreakpoint;
      currentBreakpointIndex += 1;
    }

    // Calculate the font size based on the screen width relative to the base breakpoint
    const fontSizeRatio = currentBreakpoint / baseBreakpoint;
    const calculatedFontSize = currentFontSize * fontSizeRatio;

    mediaQueries.push({
      [`@media (max-width: ${currentBreakpoint}px)`]: {
        html: { 'font-size': `${calculatedFontSize}%` },
      },
    });

    // Adjust the current breakpoint for the next iteration
    if (
      currentBreakpointIndex < desktopBreakPoints.length &&
      currentBreakpoint - widthReductionStep < parseInt(desktopBreakPoints[currentBreakpointIndex])
    ) {
      currentBreakpoint = parseInt(desktopBreakPoints[currentBreakpointIndex]);
    } else {
      currentBreakpoint -= widthReductionStep;
    }
  }

  addComponents(mediaQueries);
};
