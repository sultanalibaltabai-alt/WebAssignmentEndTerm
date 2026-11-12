# Jan & Coffee

A responsive coffee shop website with an interactive menu, shopping cart, favorites, weather recommendations, customer reviews, a photo gallery and a contact form.

The project combines HTML, CSS, Bootstrap, JavaScript and jQuery in a client-side application. Dynamic content is rendered in the browser, and preferences and visitor data are stored locally using localStorage.

- **Live website:** [Jan & Coffee](https://sultanalibaltabai-alt.github.io/WebAssignmentEndTerm/)
- **Repository:** [WebAssignmentEndTerm](https://github.com/sultanalibaltabai-alt/WebAssignmentEndTerm)

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Introduction, popular drinks, current weather and a five-day forecast for Astana |
| About | `about.html` | Coffee shop story and expandable information cards |
| Menu | `menu.html` | Drink search, filtering, sorting, shopping cart and favorites |
| Gallery | `gallery.html` | Photo gallery with a lightbox preview |
| Reviews | `reviews.html` | Review management, average rating and rating distribution |
| Contact | `contact.html` | Contact information and a validated feedback form |

## Features

### Weather and drink recommendations

- Current temperature and weather description for Astana.
- Five-day forecast displayed as dynamic cards.
- Hot drink recommendations below 15°C and cold drink recommendations at 15°C or above, based on the rounded temperature.
- A See drinks link that opens the Menu with the corresponding Hot or Cold filter.
- Loading, empty and error states, plus a Try again button after a failed request.

### Interactive menu

- Case-insensitive search by drink name.
- Filtering by drink type: All, Hot or Cold.
- Maximum price filter with a range slider.
- Sorting by name, ascending price or descending price.
- Search, type and price filters work together.
- Reset filters button and a message when no drinks match.
- Best seller highlighting.
- Prices displayed in Kazakhstani tenge.

### Cart and favorites

- Add drinks to the cart, including multiple entries for the same drink.
- Remove individual cart entries and calculate the total price.
- Clear the cart or use Place Order to display a confirmation and empty it.
- Add or remove favorite drinks and clear the favorites list.
- Restore cart and favorites after a page reload.
- Ignore stored drink IDs that are no longer present in the menu.
- Animated notifications and a back-to-top button on the Menu page.

### Reviews and statistics

- Create reviews with a name, rating from 1 to 5 and review text.
- Display reviews with stars and dates, newest first.
- Edit an existing review or cancel editing.
- Delete an individual review or delete all reviews with confirmation.
- Validate names and review text before saving.
- Review text must contain 10-200 characters after trimming.
- Show the total number of reviews, average rating and distribution of ratings from 5 to 1.
- Save reviews locally and restore them when the page opens.
- Use jQuery animations for new reviews, deletion and feedback messages.

### Gallery and contact form

- Build the gallery from a JavaScript data array.
- Open a larger photo with its caption in a lightbox.
- Close the lightbox with its close button, a click on the overlay or the Escape key.
- Validate the contact name, email address, topic and message.
- Require contact messages to contain 10-300 characters after trimming.
- Display field-specific errors, a character counter and a success message.
- Reuse shared validation helpers across Contact and Reviews.

### Theme, text size and responsive layout

- Switch between light and dark themes.
- Adjust the root font size with A-, A and A+ controls, from 12 to 22 px in 2 px steps.
- Reset the root font size to 16 px.
- Preserve the selected theme and font size between pages and reloads on the same origin.
- Use Bootstrap navigation and responsive CSS layouts.
- Provide descriptive image alternatives, labeled controls and ARIA attributes for selected status messages and buttons.

## Technologies

| Technology | Usage |
|---|---|
| HTML5 | Page structure, forms and semantic elements |
| CSS3 | Layouts, responsive styles, themes and components |
| Bootstrap 5.3.3 | Navigation, grid, utilities and buttons |
| JavaScript | DOM rendering, events, classes, filtering, validation and localStorage |
| jQuery 3.7.1 | Animations, effects and event handling |
| Fetch API | Asynchronous weather requests |
| Open-Meteo | Current weather and forecast data |
| Google Fonts | Poppins and Playfair Display |
| Unsplash | Remotely hosted photography |
| GitHub Pages | Static website hosting |

## Run locally

Clone the repository and open its directory:

```bash
git clone https://github.com/sultanalibaltabai-alt/WebAssignmentEndTerm.git
cd WebAssignmentEndTerm
```

Start a local HTTP server using Python 3:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a modern browser. Stop the server with Ctrl+C in the terminal.

Alternatively, open the project in VS Code and use the Live Server extension to serve `index.html`.

There is no build step or package installation. An internet connection is needed for the weather service and externally hosted libraries, fonts and images. Use a consistent HTTP origin when checking storage across pages.

## Weather API

The Home page requests data from [Open-Meteo](https://open-meteo.com/) using `fetch` with `async` and `await`. No API key is configured in this project.

| Parameter | Value |
|---|---|
| Endpoint | `https://api.open-meteo.com/v1/forecast` |
| Latitude | `51.18` |
| Longitude | `71.45` |
| Current fields | `temperature_2m,weather_code` |
| Daily fields | `weather_code,temperature_2m_max,temperature_2m_min` |
| Forecast duration | `5` days |
| Time zone | `auto` |

`js/weather-api.js` handles requests, weather code descriptions and conversion of daily data into `DayForecast` objects. `js/weather.js` renders the result, chooses drink recommendations and manages loading, empty, error and retry states.

The recommendation link uses `menu.html?type=Hot` or `menu.html?type=Cold`. The Menu reads this query parameter when it initializes.

## Object-oriented JavaScript

| Class | Responsibility |
|---|---|
| `DayForecast` | Store a forecast day and format its date, weather description and temperature range |
| `Drink` | Represent a drink and provide search, type, price and display methods |
| `StoredList` | Manage a stored list of IDs, saving, clearing and validation against available IDs |
| `Cart` | Extend `StoredList` with adding drinks and removing entries |
| `FavoriteList` | Extend `StoredList` with membership checks and favorite toggling |
| `Review` | Represent a review and format stars and dates |
| `ReviewList` | Load, create, update, delete and save reviews, and calculate rating statistics |

Objects are created from menu data, weather responses and stored reviews. `Cart` and `FavoriteList` use inheritance to share storage behavior.

## Local storage

| Key | Stored value |
|---|---|
| `theme` | `"light"` or `"dark"` |
| `fontSize` | Selected root font size |
| `cartIds` | Array of drink IDs in the cart |
| `favoriteIds` | Array of favorite drink IDs |
| `reviews` | Array of review objects |

`js/storage.js` provides shared JSON loading and saving helpers. Invalid JSON falls back to a default value, list loaders check for arrays, and storage access failures are caught. Reviews and saved font sizes have additional checks when loaded.

Data belongs to the current browser profile and website origin. It is not synchronized between devices or shared with other visitors. Clearing site data removes saved preferences, reviews, cart entries and favorites. If browser storage is unavailable, interactions can continue without persistence.

## Project structure

```text
WebAssignmentEndTerm/
├── README.md
├── index.html
├── about.html
├── menu.html
├── gallery.html
├── reviews.html
├── contact.html
├── css/
│   ├── style.css
│   ├── theme.css
│   ├── validation.css
│   ├── home.css
│   ├── about.css
│   ├── menu.css
│   ├── gallery.css
│   ├── reviews.css
│   └── contact.css
└── js/
    ├── storage.js
    ├── theme.js
    ├── accessibility.js
    ├── validation.js
    ├── weather-api.js
    ├── weather.js
    ├── home-data.js
    ├── home.js
    ├── home-jquery.js
    ├── about-jquery.js
    ├── menu-data.js
    ├── menu-classes.js
    ├── menu.js
    ├── menu-jquery.js
    ├── gallery-data.js
    ├── gallery.js
    ├── gallery-jquery.js
    ├── reviews-classes.js
    ├── reviews.js
    ├── reviews-jquery.js
    ├── contact.js
    └── contact-jquery.js
```

Data arrays are kept in `*-data.js` files. Domain classes are defined in `*-classes.js` and `weather-api.js`. Page scripts render content and connect events; `*-jquery.js` files contain the associated effects. Shared storage, theme, text-size and validation functions are reused where required.

## Manual testing

| Area | Steps and expected behavior |
|---|---|
| Home | Open `index.html`; popular drinks render and weather cards appear after a successful request |
| Weather recommendation | Press See drinks; Menu opens with the recommended Hot or Cold filter |
| Weather failure | Block the weather request in browser developer tools and reload; an error and Try again appear; unblock and retry |
| Theme | Toggle the theme, navigate to another page and reload; the selection remains |
| Text size | Use A- and A+, navigate and reload; the size remains; A resets it |
| About | Expand and collapse an information card using Read more and Show less |
| Menu | Combine search, type, price and sorting; verify matching results and Reset filters |
| Empty results | Search for an unavailable drink; the no-results message appears |
| Cart | Add multiple drinks, remove one and reload; verify the total and saved entries; test Clear Cart and Place Order |
| Favorites | Toggle favorite drinks and reload; verify restoration and Clear Favorites |
| Gallery | Open a photo and close the lightbox using its button, overlay click and Escape |
| Reviews | Submit an invalid form, then add valid reviews with different ratings; check errors, dates, stars and statistics |
| Review changes | Edit, cancel editing, save, delete and reload; verify persistence and updated statistics |
| Delete all reviews | Confirm deletion; the empty state returns and statistics reset |
| Contact | Test empty fields, an invalid email and a short message; then submit valid data and check the confirmation |
| Responsive layout | Check narrow and wide viewports, collapsed navigation, cards, forms and tables |

## Application scope

The project runs in the browser without an application backend. Place Order displays a local confirmation and clears the cart; it does not process payments or send an order. The contact form validates input and shows a local success message; it does not deliver email. Reviews are stored in the current browser rather than a shared database.
