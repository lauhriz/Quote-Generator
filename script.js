"use strict";
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// API
let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  // through API
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field is blank and replace it with Quote unknown
  // if (!quote.author) {
  //   authorText.textContent = "Uknown";
  // } else {
  //   authorText.textContent = quote.author;
  // }

  !quote.author
    ? (authorText.textContent = "Author unknown")
    : (authorText.textContent = quote.author);

  // Check Quote length to determine styling
  // if (quote.text.length > 120) {
  //   quoteText.classList.add("long-quote");
  // } else {
  //   quoteText.classList.remove("long-quote");
  // }

  quote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Local Quotes
// const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
// console.log(quote);
// }

// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
// API
getQuotes();

// Local
// newQuote();
