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

function changeAmount(amount) {
        const input = document.getElementById('ticketAmount');
        let current = parseInt(input.value);
        if (isNaN(current)) current = 1;
        const newValue = Math.max(1, current + amount);
        input.value = newValue;
        
        const ticketSelected = document.getElementById("ticketSelected");
        ticketSelected.textContent = `${newValue}`

        const totalPrice = document.getElementById("totalPrice");
        totalPrice.textContent = `RM ${(newValue * 16.5).toFixed(2)}`
    }

async function displayInfo(imdbId) {
    const container = document.getElementById("paymentInfo");
    const amount = parseInt(document.getElementById('ticketAmount').value);

    const movie = await fetchMovieDetail(imdbId);

    container.innerHTML =  `
        <img src="${movie.primaryImage.url}" alt="${movie.originalTitle}">
        <div style="flex: 1; padding-left: 4%">
            <h3 style="text-align: center;">${movie.primaryTitle}</h3>
            <br>

            <div style="display: flex; justify-content: space-between;">
                <h5>Ticket Price:</h5>
                <h5>RM 15.00</h5>
            </div>

            <div style="display: flex; justify-content: space-between;">
                <h5>Service Tax (10%):</h5>
                <h5>RM 1.50</h5>
            </div>

            <hr>

            <div style="display: flex; justify-content: space-between;">
                <h5>Ticket Price (After Tax):</h5>
                <h5>RM 16.50</h5>
            </div>

            <div style="display: flex; justify-content: space-between;">
                <h5>Selected Amount:</h5>
                <h5 id="ticketSelected">${amount}</h5>
            </div>

            <hr>

            <div style="display: flex; justify-content: space-between;">
                <h5>Total Price:</h5>
                <h5 id="totalPrice">RM ${(amount * 16.5).toFixed(2)}</h5>
            </div>
        </div>
    `;
}

function validatePaymentOption() {
    const selected = document.querySelector('input[name="gateway"]:checked');
    const errorDiv = document.getElementById("optionError");
    if (!selected) {
        errorDiv.textContent = "PLEASE SELECT A PAYMENT METHOD!!!";
        return false;
    }
    errorDiv.textContent = "";
    return true;
}