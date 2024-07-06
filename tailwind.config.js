/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{html,js}"],
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
