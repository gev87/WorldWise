# React + Vite
In this project, we utilize several hooks and packages to enhance functionality. For displaying the map, we use Leaflet and React-Leaflet. Navigation is handled by React Router DOM hooks, while the useMap and useMapEvents hooks from React-Leaflet change the map center and detect clicked coordinates. Custom hooks like useGeolocation fetch the current position, and useUrlPosition retrieves coordinates from the URL. We integrate React-Datepicker for date selection. Additionally, we use custom functions like delay(ms) to simulate HTTP call delays and convertToEmoji(countryCode) to create flag emojis. CSS modules are used for styling, ensuring easy and modular usage.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
