// Brand colors object with hex values
export const brandColors = {
  blue: "#0078d4",
  indigo: "#6366f1",
  pink: "#ec4899",
  red: "#ef4444",
  orange: "#f97316",
  amber: "#f59e0b",
  emerald: "#10b981",
};

// Helper function to get color name from hex value
export const getColorNameFromValue = (value: string): string => {
  const entry = Object.entries(brandColors).find(([_, hexValue]) => hexValue === value);
  return entry ? entry[0] : "blue"; // Default to blue if not found
};

// Helper to ensure we have a valid hex color
export const getHexColor = (color: string): string => {
  // If the color is a key in brandColors, use its hex value
  if (color in brandColors) {
    return brandColors[color as keyof typeof brandColors];
  }
  
  // If it's already a valid hex color, return it
  if (color.startsWith('#') || color.startsWith('rgb')) {
    return color;
  }
  
  // Default to blue if we can't parse the color
  return brandColors.blue;
}; 