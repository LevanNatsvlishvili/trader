type MediaQueries = {
  [key: string]: {
    html: {
      'font-size': string;
    };
  };
};

// @ts-expect-error: Unreachable code error
export const ScalingMobile = ({ addComponents }) => {
  const guidelineBaseWidth = 375;
  const baselineFontSize = 62.5; // Base font-size in percentage
  const widthScale = (currentScreenWidth: number): number =>
    (currentScreenWidth / guidelineBaseWidth) * baselineFontSize;

  const mediaQueries: MediaQueries = {};
  for (let screenWidth = 600; screenWidth >= 320; screenWidth -= 25) {
    const scaledFontSize = widthScale(screenWidth);
    mediaQueries[`@media (max-width: ${screenWidth + 1}px)`] = {
      html: { 'font-size': `${scaledFontSize}%` },
    };
  }

  addComponents(mediaQueries);
};
