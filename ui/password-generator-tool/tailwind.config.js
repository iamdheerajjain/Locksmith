/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode with enhanced pastel purple and light steel blue palette
        light: {
          primary: '#C5ADC5',     // Pastel purple for primary actions
          primaryHover: '#B39DB3', // Darker shade for hover states
          secondary: '#B2B5E0',   // Light steel blue for secondary actions
          secondaryHover: '#9FA2CC', // Darker shade for hover states
          background: '#F8F7FC',  // Light background with purple tint
          surface: '#FFFFFF',     // White surfaces
          surfaceHover: '#F0EEF5', // Slightly purple-tinted surface for hover
          text: '#4A4A6A',        // Dark gray text with purple undertone
          textSecondary: '#7D7DA0', // Medium gray text
          accent: '#B2B5E0',      // Light steel blue for accents
          border: '#E2DFF2',      // Light border with purple tint
          borderHover: '#D6D4EE', // Slightly darker border for hover
          success: '#8AC9A7',     // Softer green for success
          successHover: '#7AB597', // Darker success for hover
          warning: '#E8C589',     // Softer amber for warnings
          warningHover: '#D6B379', // Darker warning for hover
          error: '#E59CAD',       // Soft pink-red for errors
          errorHover: '#D38A9B',  // Darker error for hover
        },
        // Dark mode with enhanced pastel purple and light steel blue palette
        dark: {
          primary: '#C5ADC5',     // Pastel purple for primary actions
          primaryHover: '#D7C5D7', // Lighter shade for hover states
          secondary: '#B2B5E0',   // Light steel blue for secondary actions
          secondaryHover: '#C4C7EE', // Lighter shade for hover states
          background: '#2A2A40',  // Dark background with purple undertone
          surface: '#363650',     // Darker surface
          surfaceHover: '#42425C', // Lighter surface for hover
          text: '#EAEAF0',        // Light text
          textSecondary: '#BFC0D4', // Medium light text
          accent: '#B2B5E0',      // Light steel blue for accents
          border: '#5A5A7A',      // Dark border with purple tint
          borderHover: '#6A6A8A', // Lighter border for hover
          success: '#8AC9A7',     // Softer green for success
          successHover: '#9CDBB9', // Lighter success for hover
          warning: '#E8C589',     // Softer amber for warnings
          warningHover: '#FAD79B', // Lighter warning for hover
          error: '#E59CAD',       // Soft pink-red for errors
          errorHover: '#F7AEC1',  // Lighter error for hover
        },
        // Direct color references
        pastelPurple: '#C5ADC5',
        pastelPurpleLight: '#D7C5D7',
        pastelPurpleDark: '#B39DB3',
        lightSteelBlue: '#B2B5E0',
        lightSteelBlueLight: '#C4C7EE',
        lightSteelBlueDark: '#9FA2CC'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}