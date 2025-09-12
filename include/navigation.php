<nav class="topNavigation">
    <!--Navigation Buttons-->
    <a id="home" href="/Movie-Ticketing-System/"><button>Home</button></a>
    <a id="movies" href="/Movie-Ticketing-System/movie/"><button>Movies</button></a>
    <a id="myWishlist" href="/Movie-Ticketing-System/myWishlist/"><button>My Wishlist</button></a>
    <a id="myTicket" href="/Movie-Ticketing-System/myTicket/"><button>My Tickets</button></a>
    <a id="user" href="/Movie-Ticketing-System/userAuthentication/">
        <button style="background-image:linear-gradient(to bottom right, #A76BCE, #7F00FF);">SIGN IN</button></a>
</nav>

<script>
    let loggedUser = sessionStorage.getItem("loggedUserID");
    let wishlistBtn = document.getElementById('myWishlist');
    let ticketBtn = document.getElementById('myTicket');

    if (loggedUser !== null) {
        const profileButton = document.getElementById("user");
        // Change SIGN IN to PROFILE
        profileButton.lastElementChild.textContent = "PROFILE";
        profileButton.href = "/Movie-Ticketing-System/profile/";
    }
    else {
        wishlistBtn.parentElement.removeChild(wishlistBtn);
        ticketBtn.parentElement.removeChild(ticketBtn);
    }
</script>