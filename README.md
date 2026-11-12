# Jan & Coffee - Coffee Shop Website (Endterm Project)

## Topic
A multi-page responsive website for a coffee shop called **Jan & Coffee**, made by students of Astanait University.
The endterm project continues the midterm website: same topic, same group, same five pages, same Bootstrap layout.
New JavaScript and jQuery features were added to the existing pages.

## Group Members and Work Split
Every member owns their own pages, with their own HTML, CSS, JavaScript and jQuery files.

| Member | Pages | Files |
|---|---|---|
| Sultanali | Home, About + shared theme | `index.html`, `about.html`, `js/storage.js`, `js/theme.js`, `css/theme.css`, `js/home-data.js`, `js/home.js`, `js/home-jquery.js`, `css/home.css`, `js/about-jquery.js`, `css/about.css` |
| Alihan | Menu | `menu.html`, `js/menu-data.js`, `js/menu.js`, `js/menu-jquery.js`, `css/menu.css` |
| Rizon | Gallery, Contact | `gallery.html`, `js/gallery-data.js`, `js/gallery.js`, `js/gallery-jquery.js`, `css/gallery.css`, `contact.html`, `js/contact.js`, `js/contact-jquery.js`, `css/contact.css` |

Commit order: Sultanali first pushes the shared files (`storage.js`, `theme.js`, `theme.css`), then Alihan and Rizon run `git pull` and push their own pages.

## Pages
- `index.html` - Home (popular drinks are created from an array)
- `about.html` - About (team cards with "Read more" effect)
- `menu.html` - Menu (table created from an array, search, filter, cart, favorites)
- `gallery.html` - Gallery (photos created from an array, lightbox)
- `contact.html` - Contact (feedback form with validation)

## Project Structure
```
jan-coffee/
  index.html, about.html, menu.html, gallery.html, contact.html
  css/style.css        midterm styles
  css/theme.css        dark theme (all pages)
  css/home.css         home page styles
  css/about.css        about page styles
  css/menu.css         menu page styles (cart, favorites, toast, back-to-top)
  css/gallery.css      gallery page styles (lightbox)
  css/contact.css      contact page styles (form errors, success message)
  js/storage.js        saving and loading data in localStorage (shared)
  js/theme.js          theme switcher (all pages)
  js/home-data.js      array popularDrinks
  js/home.js           popular drinks on the home page
  js/home-jquery.js    jQuery: fade-in cards, hover effect
  js/about-jquery.js   jQuery: team cards "Read more"
  js/menu-data.js      array drinks
  js/menu.js           menu table, search, filter, cart, favorites
  js/menu-jquery.js    jQuery: toast message, back-to-top button
  js/gallery-data.js   array galleryPhotos
  js/gallery.js        gallery and lightbox
  js/gallery-jquery.js jQuery: photo and lightbox fade-in
  js/contact.js        contact form validation
  js/contact-jquery.js jQuery: success message, shake, textarea animation
```

## New Endterm Features
1. **Theme switcher (all pages)** - the "Dark mode" button in the navbar changes the theme. The choice is saved.
2. **Home** - popular drinks are created from an array; jQuery fades the cards in one by one, and hovering a card dims the other cards.
3. **About** - jQuery "Read more" button slides the team member bio down and up.
4. **Menu search** - the table is filtered while the user types.
5. **Menu type filter** - the select "All types / Hot / Cold" filters the table.
6. **Cart** - the "Add" button adds a drink. The cart shows the items, the total price and a "Remove" button for each item. "Place Order" clears the cart. The cart is saved.
7. **Favorites** - the heart button adds or removes a favorite drink. The list is updated at once and is saved.
8. **Menu jQuery** - a toast message fades in and out after cart actions; a back-to-top button fades in after scrolling and scrolls the page up smoothly.
9. **Gallery** - photos are created from an array and fade in one by one; a click opens a lightbox that fades in (close with the button, a click, or Escape).
10. **Contact form** - every field is validated with messages under the fields; the form shakes when there are errors; the message field grows on focus; the success message fades in.

## How the Requirements Are Covered
- **Arrays** - `drinks` (`menu-data.js`), `popularDrinks` (`home-data.js`), `galleryPhotos` (`gallery-data.js`); also `cartIds`, `favoriteIds`, `fieldRules`.
- **Loops** - `for...of` and `forEach` in `home.js`, `menu.js`, `gallery.js`, `contact.js`.
- **Functions with parameters and return values** - for example `filterDrinks(searchText, type)`, `calculateTotal(ids)`, `findDrinkById(id)`, `createDrinkRow(drink)`, `validateEmail(value)`, `createSuccessText(name, wantsReply)`.
- **DOM manipulation** - content is created from arrays with `createElement`; text, classes and attributes are changed; elements are added and removed (cart items, lightbox).
- **Events** - `addEventListener` with `click`, `input`, `change`, `submit`, `keydown`, `blur`, `DOMContentLoaded`; the event object (`event.target`, `event.key`) and `event.preventDefault()` are used.
- **Form validation** - name, email, topic, message length (10-300), messages near fields, success message.
- **jQuery** - selectors: ID (`#toast`), class (`.team-toggle`), element (`body`), descendant (`#gallery figure`, `html, body`); traversal: `siblings()`, `closest()`, `each()`; events: `click`, `scroll`, `mouseenter`, `mouseleave`, `focus`, `blur`; effects: `slideToggle()`, `fadeIn()`, `fadeOut()`, `fadeTo()`, `delay()`, `animate()`.

## How to Test
1. Open any page and press **Dark mode**. Open another page: the theme stays. Press **Light mode** to go back.
2. Open `menu.html`.
   - Type `latte` in the search field: only two drinks stay. Type `zzz`: the message "No drinks found" appears.
   - Choose **Cold** in the select: only cold drinks stay.
   - Press **Add** on several drinks: the toast appears, the cart and the total are updated. Press **Remove** to delete an item. Press **Place Order** to finish the order.
   - Press the heart button: the drink appears in **Favorites**. Reload the page: the cart and favorites are still there.
3. Open `gallery.html`. Click any photo to open the lightbox. Press `Esc` or click outside to close it.
4. Open `about.html`. Press **Read more** under a team member: the text slides down. Press **Show less** to hide it.
5. On `menu.html` scroll down: the round arrow button appears. Press it to scroll to the top.
6. Open `contact.html`.
   - Press **Send** with an empty form: error messages appear under every field and the form is not sent.
   - Enter the name `A1`, the email `bad@mail`, a short message: specific errors are shown.
   - Write a message longer than 300 characters: the counter and the error show the problem.
   - Fill the form correctly: the green success message appears and the form is cleared.
7. Check the site on a phone-size screen: the navbar collapses and the layout stays responsive.

## Live Link


## Sultanali - Final-stage update

The Home and About pages now include font-size controls (12-22 px), with the selected size saved in localStorage. Shared storage helpers recover from invalid JSON and unavailable browser storage.

The Home page loads current weather in Astana and a five-day forecast from Open-Meteo without an API key. The DayForecast class provides the forecast labels and temperature ranges. Loading, empty, error and retry states are included. Drink advice changes with the temperature, and the See drinks link opens the existing Menu page. Automatic selection of the Menu filter depends on the Menu update.

Files: index.html, about.html, js/storage.js, js/accessibility.js, css/theme.css, js/weather-api.js, js/weather.js, js/home-jquery.js, css/home.css.

Alihan's Menu and Rizon's Gallery and Contact remain at their current repository versions. Their Final-stage changes and the Reviews page have not been published in this update.

Validation: browser checks cover five forecast cards with controlled API responses, API failure/retry and empty responses, font-size persistence and reset after invalid data, theme persistence, About biographies, adding a drink to the cart, all existing pages, a 390 px viewport, and blocked localStorage. No JavaScript page errors were observed. API checks use controlled responses and do not establish live service availability.
