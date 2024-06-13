# React + Vite

"In the project, we use several hooks and packages to enhance functionality. We utilize react-router-dom hooks for navigation and the useMap hook from react-leaflet to change the center of the map. The useMapEvents hook from react-leaflet is used to detect the coordinates of the clicked place on the map. Additionally, we have custom hooks such as useGeolocation to get the current position's coordinates and useUrlPosition to retrieve coordinates from the URL. We integrate the react-datepicker package for date selection. Moreover, we employ custom functions like delay(ms) to artificially delay the response of an HTTP call and convertToEmoji(countryCode) to create a flag emoji from any country code."

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
