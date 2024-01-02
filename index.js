/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" />
            <h3>${game.name}</h3>
            <p>description: ${game.description}</p>
            <p>Backers: ${game.backers}</p>
        `

        // Append the game card to the gamesContainer element
        gamesContainer.appendChild(gameCard);
    }
}


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// Grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// Count the total number of contributions using reduce()
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// Set the inner HTML with commas using toLocaleString
contributionsCard.innerHTML = `${totalContributions.toLocaleString()} Contributions`;

// Grab the amount raised card element
const raisedCard = document.getElementById("total-raised");

// Calculate the total amount raised using reduce()
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// Set the inner HTML with a dollar sign
raisedCard.innerHTML = `$${totalRaised.toLocaleString()} Raised`;

// Grab the number of games card element
const gamesCard = document.getElementById("num-games");

// Set the inner HTML with the number of games
gamesCard.innerHTML = `${GAMES_JSON.length} Games`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // Filter games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Filter games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Add the funded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // Add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/


// Grab the description container
const descriptionContainer = document.getElementById("description-container");

// Count the number of unfunded games using filter
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Create a string explaining the number of unfunded games using the ternary operator
const comprehensiveString = `We've raised \$${totalRaised.toLocaleString()} for ${GAMES_JSON.length} games, but ${numUnfundedGames} ${numUnfundedGames === 1 ? "game still" : "games still"} need your support!`;

// Create a new DOM element containing the template string
const descriptionInfo = document.createElement("p");
descriptionInfo.textContent = comprehensiveString;

// Append the element to the description container
descriptionContainer.appendChild(descriptionInfo);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Destructuring and spread operator to grab the top 2 games
const [topPledgedGame, secondTopGame] = sortedGames;

// Create elements for the top pledged game
const topGameElement = document.createElement("h2");
topGameElement.textContent = `Top Pledged Game: ${topPledgedGame.name}`;
firstGameContainer.appendChild(topGameElement);

// Create elements for the runner-up game
const secondGameElement = document.createElement("h2");
secondGameElement.textContent = `Runner-Up: ${secondTopGame.name}`;
secondGameContainer.appendChild(secondGameElement);