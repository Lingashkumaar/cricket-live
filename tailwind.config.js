module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          cricket: {
            green: '#1B5E20',
            lightGreen: '#4CAF50',
            gold: '#FFD700',
          },
        },
      },
    },
    plugins: [],
  };