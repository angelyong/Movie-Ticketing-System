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

async function displayTransactions() {
    const container = document.getElementById("movieContainer");
    const userID = sessionStorage.getItem("loggedUserID");

    const response = await fetch(`getTransactions.php?userID=${userID}`);
    const data = await response.json();

    if (data.length === 0) {
        container.innerHTML = "<h3>No Ticket(s) Found.</h3>";
        return;
    }

    const movieDetails = await Promise.all(
        data.map(ticket => fetchMovieDetail(ticket.movieID))
    );

    data.map((transaction, i) => {
        const movie = movieDetails[i];

        const card = document.createElement('div');
        card.className = "ticket-card";

        const movieDiv = document.createElement("div");
        movieDiv.className = "movie-card";
        movieDiv.innerHTML = `<img src="${movie.primaryImage.url}" alt="${movie.originalTitle}">`;
        
        const movieOverlay = document.createElement("div");
        movieOverlay.className = "movie-overlay"
        movieOverlay.innerHTML = `
        <div style="height: 365px">
            <h3>${movie.primaryTitle}</h3>
            <h5><i class="fa-solid fa-tag" style="color: #A76BCE; padding-right: 1%"></i> ${movie.genres?.slice(0,3).join(', ') || 'N/A'}</h5>
            <h5><i class="fa-solid fa-clock" style="color: #A76BCE; padding-right: 1%"></i> ${movie.runtimeSeconds ? movie.runtimeSeconds / 60 : 'N/A'} mins</h5>
            <h5><i class="fa-solid fa-language" style="color: #A76BCE; padding-right: 1%"></i> ${movie.spokenLanguages && movie.spokenLanguages.length > 0 ? movie.spokenLanguages[0].name : 'N/A'}</h5>
        </div>
        <div style="display: flex; justify-content: center;">
            <a href="ticketInfo?movieID=${transaction.movieID}&transactionID=${transaction.transactionID}"><button class="viewTicket">View Details</button></a>
        </div>
        `;
        movieDiv.appendChild(movieOverlay);
        card.appendChild(movieDiv);

        const ticketTransaction = document.createElement("div");
        ticketTransaction.className = "ticketTransaction";
        ticketTransaction.innerHTML = `
        <h5 class="ticketH5">Transaction ID : ${transaction.transactionID}</h5>
        `;
        ticketTransaction.appendChild(card);

        container.appendChild(ticketTransaction);
    });
}

async function displayTickets() {
    const container = document.getElementById("ticketContainer");
    const params = new URLSearchParams(window.location.search);
    const transactionID = params.get("transactionID");

    const response = await fetch(`getTickets.php?transactionID=${transactionID}`);
    const data = await response.json();

    const movie = await fetchMovieDetail(params.get("movieID"))

    data.map(ticketData => {
        const ticket = document.createElement("div");
        ticket.className = "ticketInfo";
        ticket.innerHTML = `
            <div style="flex: 1">
                <img src="ticketQR.png" alt="QR code" style="width: 90%; height: auto;">
            </div>
            <div style="flex: 4;">
                <h3>${movie.primaryTitle}</h3>
                <h4>Ticket ID: ${ticketData.ticketID}</h4>
            </div>
        `;

        container.appendChild(ticket);
    });
}