/**
 * Applies the given color to the stroke attribute in the provided SVG string.
 * 
 * @param svgString - The SVG string to modify.
 * @param color - The color to apply to the stroke.
 * @returns The modified SVG string with the stroke color applied.
 */
export const applyStrokeColorToSVG = (svgString: string, color: string): string => {
  if (!svgString) {
    return ''; // Return an empty string if no SVG is provided
  }
  try {
    return svgString.replace(/stroke=".*?"/g, `stroke="${color}"`);
  } catch (error) {
    console.error('Error applying stroke color to SVG:', error);
    return svgString; // Return the original string if something goes wrong
  }
};

export const applyColorToSVG = (svgString: string, color: string): string => {
  if (!svgString) {
    return ''; // Return an empty string if no SVG is provided
  }
  try {
    // Ensure you're only replacing the main fill attribute and not unintended parts of the SVG
    return svgString.replace(/fill="[^"]*"/g, `fill="${color}"`);
  } catch (error) {
    console.error('Error applying color to SVG:', error);
    return svgString; // Return the original string if something goes wrong
  }
};
