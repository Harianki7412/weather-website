
## Setup Instructions

1. **Clone the Repository:**

    ```bash
    git clone (https://github.com/Harianki7412/weather-website)
    cd weather-app
    ```

3. **Install Dependencies:**

    ```bash
    npm install
    ```

4. **Install Tailwind CSS and PostCSS:**

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

5. **Configure Tailwind CSS:**

    - Update `tailwind.config.js` to include the content paths.
    - Add Tailwind directives to `style.css`.
    - Add build script to `package.json`, and run `npm run build:css`.

6. **Obtain OpenWeatherMap API Key:**

    - Sign up for an API key at [OpenWeatherMap](https://openweathermap.org/api).
    - Replace `'API_KEY'` in `script.js` with your API key.

7. **Run the Application:**

    - Open `index.html` in your web browser.

8. **GITHUB LINK**
   
    - https://github.com/Harianki7412/weather-website.git

## Usage

1. **Search by City:**
    - Enter a city name in the input field and click "Search".

2. **Use Current Location:**
    - Click the "My Location" button and grant location access.

3. **View Weather Data:**
    - The current weather and 5-day forecast will be displayed.

4. **Recently Searched Cities:**
    - Select a city from the dropdown to view its weather.

## API Usage

- OpenWeatherMap API is used for fetching weather data.

## Technologies Used

- HTML
- CSS (Tailwind CSS)
- JavaScript
- OpenWeatherMap API
- Git

## Error Handling

- The application handles API errors (e.g., invalid city, network issues) and displays user-friendly error messages.

## Author

Hariom Verma
