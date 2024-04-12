const BASE_URL = 'https://my-json-server.typicode.com/kennedyzzz/code-challenge-3/films';

document.addEventListener('DOMContentLoaded', () => {
  findFilm();
});

function findFilm() {
  fetch(BASE_URL)
    .then((res) => res.json())
    .then((films) => {
      films.forEach((movie) => {
        films(movie);
      });

      const firstFilm = document.querySelector("#id1");
      firstFilm.dispatchEvent(new Event("click"));
    });
}

function films(movie) {
  let doc = document.createElement("li");
  doc.textContent = `${movie.title}`;
  doc.id = "id" + movie.id;

  // delete button on each movie
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    deleteMovie(movie.id);
    doc.remove(); // remove the list item from the DOM after deleting the movie
  });
  doc.appendChild(deleteButton);
  document.getElementById("movieList").appendChild(doc); // assuming you have a ul element with id "movieList"

  doc.classList.add("film");
  doc.classList.add("item");
  doc.addEventListener("click", () => {
    enterMovie(movie);
  });
}

// Delete request
function deleteMovie(movieId) {
  fetch(`${BASE_URL}/${movieId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error deleting movie:', error);
    });
}

function enterMovie(movie) {
  const posterImage = document.querySelector("img#poster");
  posterImage.src = movie.poster;
  posterImage.alt = movie.title;

  const details = document.querySelector("#showing");
  details.querySelector("#title").textContent = movie.title;
  details.querySelector("#runtime").textContent = movie.runtime + " minutes";
  details.querySelector("#film-info").textContent = movie.description;
  details.querySelector("#showtime").textContent = movie.showtime;
  details.querySelector("#ticket-num").textContent = movie.capacity - movie.tickets_sold;
}

// Buying tickets
document.getElementById("buy-ticket").addEventListener('click', function() {
  let ticketNumElement = document.getElementById("ticket-num");
  let currentTicketNum = parseInt(ticketNumElement.textContent);
  if (currentTicketNum > 0) {
    ticketNumElement.textContent = currentTicketNum - 1;
    updatingTickets();
  } else {
    alert('Sold out');
  }
});

// POST request to update number of tickets sold
function updatingTickets() {
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tickets_sold: numberOfTickets })
  });
}
