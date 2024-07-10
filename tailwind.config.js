/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./**/*.{html,js}"],
   theme: {
      extend: {
         screens: {
            xx: "330px",
            xs: "480px"
         }
      },
   },
   plugins: [],
};
