// fetch movie detail json using IMDB ID
async function fetchMovieDetail(imdbId) {
    try {
        const url = `https://api.imdbapi.dev/titles/${imdbId}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error fetching movie:", error);
        return null;
    }
}

// fetch movie preview video json using IMDB ID
async function fetchMoviePreview(imdbId) {
     try {
        const url = `https://api.imdbapi.dev/titles/${imdbId}/videos`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error("Error fetching movie:", error);
        return null;
    }
}

// display movie preview
async function displayPreview(imdbId) {
  const container = document.getElementById("vid");

  const video = await fetchMoviePreview(imdbId);

  if (!video || !video.videos || video.videos.length === 0) {
    container.innerHTML = "Video Preview Not Available";
  } else {
    container.innerHTML = `
      <iframe 
        id="moviePreview"
        src="https://www.imdb.com/video/imdb/${video.videos[0].id}/imdb/embed"
        frameborder="0" 
        allowfullscreen>
      </iframe>
    `;
  }
}

// display movie detail
async function displayDetails(imdbId) {
  const containerLeft = document.getElementById("movieInfo");
  const containerTitle = document.getElementById("title");

  const movie = await fetchMovieDetail(imdbId); 

  containerTitle.innerHTML = `
    <h2>${movie.primaryTitle}</h2>
  `;

  containerLeft.innerHTML = `
    <img src="${movie.primaryImage.url}" alt="${movie.originalTitle}">
    <div id="movieDetail">
      <h5><i class="fa-solid fa-tag"></i> ${movie.genres?.join(', ') || 'N/A'}</h5>
      <h5><i class="fa-solid fa-language"></i> ${movie.spokenLanguages?.[0]?.name || 'N/A'}</h5>
    </div>
    <button id="wishButton" class="detailButton"></button>
  `;
  
  const wishButton = document.getElementById("wishButton");
  if (loggedUser == null) {
    wishButton.textContent = "LOG IN TO WISHLIST";
    wishButton.onclick = () => {
      window.location.href = `/Movie-Ticketing-System/userAuthentication/index.php?movieID=${imdbId}`;
    };
  } 
  else {
    const wishlisted = await isWishlisted(imdbId);
    if (wishlisted) {
      wishButton.textContent = "REMOVE FROM WISHLIST";
      wishButton.onclick = async () => {
        wishButton.textContent = "ADD TO WISHLIST";
        const success = await removeWishlist(imdbId);
        if(success) {
          location.reload();
        }
      };
    } else {
      wishButton.textContent = "ADD TO WISHLIST";
      wishButton.onclick = async () => {
        const success = await addWishlist(imdbId);
        if(success) {
          location.reload();
        }
      };
    }
  }
  const synopsis = document.getElementById("syn");
  synopsis.textContent = movie.plot || "No synopsis available.";

  createWikiLinks(document.getElementById("cas"), movie.stars);
  createWikiLinks(document.getElementById("dir"), movie.directors);
  createWikiLinks(document.getElementById("wri"), movie.writers);
}

function createWikiLinks(container, items) {
  container.innerHTML = "";

  if (!items || items.length === 0) {
    container.textContent = "N/A";
    return;
  }

  items.forEach((item, index) => {
    const a = document.createElement("a");
    a.textContent = item.displayName;
    a.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(item.displayName)}`;
    a.target = "_blank";

    container.appendChild(a);

    if (index < items.length - 1) {
      container.appendChild(document.createTextNode(", "));
    }
  });
}

async function displayUpcomingWishlist() {
  const container = document.getElementById("movieContainer");
  container.innerHTML = '';
  const userID = sessionStorage.getItem("loggedUserID");
  

  const response = await fetch(`getUpcomingWishlist.php?userID=${userID}`);
  const data = await response.json();
  
  if (data.length === 0) {
      container.innerHTML = "<h3>No Item(s) Found.</h3>";
      return;
  }
  
  const movieDetails = await Promise.all(
      data.map(wishlist => fetchMovieDetail(wishlist.movieID))
  );
  
  data.map((wishlist, i) => {
    const movie = movieDetails[i];

    const card = document.createElement('div');
    card.className = "wishlist-card";

    const movieDiv = document.createElement("div");
    movieDiv.className = "movie-card";
    movieDiv.innerHTML = `<img src="${movie.primaryImage.url}" alt="${movie.originalTitle}">`;
  
    const movieOverlay = document.createElement("div");
    movieOverlay.className = "movie-overlay"
    movieOverlay.innerHTML = `
    <div style="height: 365px">
      <h3>${movie.primaryTitle}</h3>
      <h5><i class="fa-solid fa-tag" style="color: #A76BCE; padding-right: 1%"></i> ${movie.genres?.slice(0,3).join(', ') || 'N/A'}</h5>
      <h5><i class="fa-solid fa-language" style="color: #A76BCE; padding-right: 1%"></i> ${movie.spokenLanguages && movie.spokenLanguages.length > 0 ? movie.spokenLanguages[0].name : 'N/A'}</h5>
    </div>
    <div style="display: flex; justify-content: center;">
      <a href="wish-detail.php?movieID=${movie.id}"><button>VIEW INFO</button><a>
    </div>
    `;
    movieDiv.appendChild(movieOverlay);
    card.appendChild(movieDiv);
    container.appendChild(card);
  });
}

async function displayCurrentWishlist() {
  const container = document.getElementById("movieContainer");
  container.innerHTML = '';
  const userID = sessionStorage.getItem("loggedUserID");
  

  const response = await fetch(`getCurrentWishlist.php?userID=${userID}`);
  const data = await response.json();
  
  if (data.length === 0) {
      container.innerHTML = "<h3>No Item(s) Found.</h3>";
      return;
  }
  
  const movieDetails = await Promise.all(
      data.map(wishlist => fetchMovieDetail(wishlist.movieID))
  );
  
  data.map((wishlist, i) => {
    const movie = movieDetails[i];

    const card = document.createElement('div');
    card.className = "wishlist-card";

    const movieDiv = document.createElement("div");
    movieDiv.className = "movie-card";
    movieDiv.innerHTML = `<img src="${movie.primaryImage.url}" alt="${movie.originalTitle}">`;
  
    const movieOverlay = document.createElement("div");
    movieOverlay.className = "movie-overlay"
    movieOverlay.innerHTML = `
    <div style="height: 365px">
      <h3>${movie.primaryTitle}</h3>
      <h5><i class="fa-solid fa-tag" style="color: #A76BCE; padding-right: 1%"></i> ${movie.genres?.slice(0,3).join(', ') || 'N/A'}</h5>
      <h5><i class="fa-solid fa-language" style="color: #A76BCE; padding-right: 1%"></i> ${movie.spokenLanguages && movie.spokenLanguages.length > 0 ? movie.spokenLanguages[0].name : 'N/A'}</h5>
    </div>
    <div style="display: flex; justify-content: center;">
      <a href="../movie/movie-detail.php?movieID=${movie.id}"><button>VIEW INFO</button><a>
    </div>
    `;
    movieDiv.appendChild(movieOverlay);
    card.appendChild(movieDiv);
    container.appendChild(card);
  });
}

async function isWishlisted(imdbId) {
  const userID = sessionStorage.getItem("loggedUserID");

  const response = await fetch(`isWishlisted.php?userID=${userID}&movieID=${imdbId}`);
  const data = await response.json();

  return data.length > 0;
}

async function addWishlist(imdbId) {
  const userID = sessionStorage.getItem("loggedUserID");
  const response = await fetch('addWishlist.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `userID=${encodeURIComponent(userID)}&movieID=${encodeURIComponent(imdbId)}`
  });
  const result = await response.json();
  return result.success;
}

async function removeWishlist(imdbId) {
  const userID = sessionStorage.getItem("loggedUserID");
  const response = await fetch('removeWishlist.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `userID=${encodeURIComponent(userID)}&movieID=${encodeURIComponent(imdbId)}`
  });
  const result = await response.json();
  return result.success;
}

// Button Toggle
let currentBtn = document.getElementById("currentBtn");
let upcomingBtn = document.getElementById("upcomingBtn");

async function handleButtonClick(asyncMethod) {
  if (asyncMethod == displayUpcomingWishlist) {
    upcomingBtn.classList.add("active");
    currentBtn.classList.remove("active");
  } 
  else {
    currentBtn.classList.add("active");
    upcomingBtn.classList.remove("active");
  }

  // Disable both buttons
  const buttons = document.querySelectorAll('.selectButton');
  buttons.forEach(b => b.disabled = true);
  try {
      await asyncMethod();
  } 
  finally {
      buttons.forEach(b => b.disabled = false);
  }
}