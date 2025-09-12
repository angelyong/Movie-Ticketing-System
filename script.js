<<<<<<< HEAD
const bannerImages = [
    'images/banner1.png',
    'images/banner_img_.jpg',
    'images/banner_img_1.jpg',
    'images/banner_img_2.jpg',
    'images/banner_img_3.jpg',
    'images/banner_img_3.webp',
    'images/banner_img_4.jpg',
    'images/banner_image_4.webp',
    'images/banner_image_5.avif',
    'images/banner_img_6.jpg',
    'images/banner_image_7.webp'
];

// Initialize banner function
async function initBanner() {
    
    // Then initialize the banner functionality
    class Banner {
        constructor(containerId, images, interval = 5000) {
            this.container = document.getElementById(containerId);
            this.images = images;
            this.currentIndex = 0;
            this.interval = interval;
            this.timer = null;
            this.isPaused = false;
            
            this.init();
        }

        init(){
            this.images.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.className = `banner-slide ${index === 0 ? 'active' : ''}`;
                slide.style.backgroundImage = `url(${image.url})`;
                this.container.appendChild(slide);
            });
            // Create indicators if container exists
            const indicatorsContainer = document.getElementById('indicators');
            if (indicatorsContainer) {
                this.images.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.className = `dot ${index === 0 ? 'active' : ''}`;
                    dot.addEventListener('click', () => {
                        this.setCurrentSlide(index);
                    });
                    indicatorsContainer.appendChild(dot);
                });
            }
            // Set up event listeners for buttons if they exist
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const pauseBtn = document.getElementById('pauseBtn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    this.prevSlide();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    this.nextSlide();
                });
            }
            
            if (pauseBtn) {
                pauseBtn.addEventListener('click', () => {
                    this.togglePause();
                });
            }
            
            // Start the auto rotation
            this.startAutoRotation();
        }

        setCurrentSlide(index) {
            // Update current index
            this.currentIndex = index;
            
            // Update slides
            const slides = document.querySelectorAll('.banner-slide');
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            // Update indicators if they exist
            const dots = document.querySelectorAll('.dot');
            if (dots.length > 0) {
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }
        }
        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.setCurrentSlide(this.currentIndex);
        }
        
        prevSlide() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.setCurrentSlide(this.currentIndex);
        }
        
        startAutoRotation() {
            if (this.timer) {
                clearInterval(this.timer);
            }
            
            this.timer = setInterval(() => {
                if (!this.isPaused) {
                    this.nextSlide();
                }
            }, this.interval);
        }
        
        togglePause() {
            this.isPaused = !this.isPaused;
            const pauseBtn = document.getElementById('pauseBtn');
            if (pauseBtn) {
                pauseBtn.innerHTML = this.isPaused ? 
                    '<i class="fas fa-play"></i> Play' : 
                    '<i class="fas fa-pause"></i> Pause';
            }
            
            if (!this.isPaused) {
                this.startAutoRotation();
            }
        }
    }
    // Initialize the banner
    const banner = new Banner('banner', bannerImages, 5000);
}
// Initialize banner when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBanner);
} else {
    initBanner();
}

=======
>>>>>>> 6cc68afdc8e958eda11a343046783e0feab5c537
//For HomePage Move Shotimes fetch dt
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

// fetch Array of Movie json from IMDB ID
async function fetchMovieArray(url) {
  try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data.titles;

    } 
    catch (error) {
        console.error("Error fetching movie:", error);
        return null;
    }
}

function displayBanner() {
    const container = document.getElementById("banners");
    container.innerHTML = "";

    let rowDiv = document.createElement("div");
    rowDiv.className = "home-movie-row";
    rowDiv.id = "banner-row";

    const bannerFiles = ["banner1.png", "banner2.png", "banner3.png", "banner4.png"];

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < bannerFiles.length; j++) {
        let banner = document.createElement("img");
        banner.src = `images/banners/${bannerFiles[j]}`;
        banner.alt = bannerFiles[i];
        banner.style = "max-height: 20em; object-fit: cover";
        rowDiv.appendChild(banner);
      }
    }

    container.appendChild(rowDiv);
}

async function displayCurrentMovie() {
    const container = document.getElementById("currentMovieContainer");
    container.innerHTML = '';
    
    let counter = 0;
    let rowDiv = document.createElement("div");
    rowDiv.className = "movie-card-row";
    rowDiv.id = "current-movie-card-row";
    rowDiv.classList.add("hidden");

    let url = `https://api.imdbapi.dev/titles?types=MOVIE&genres=Animation&languageCodes=ja&endYear=`
      + (new Date().getFullYear() - 3) + `&sortBy=SORT_BY_RELEASE_DATE&sortOrder=DESC`;
    const NEWEST_SHOWS = await fetchMovieArray(url);

    for (const movieData of NEWEST_SHOWS) {
        if (movieData.primaryImage === undefined || !movieData) {
          continue;
        }
        const movie = await fetchMovieDetail(movieData.id);

        const movieDiv = document.createElement("div");
        movieDiv.className = "movie-card";
        movieDiv.style = "margin: 0 5px";
        movieDiv.innerHTML = `<img src="${movie.primaryImage.url}" alt="${movie.originalTitle}">`;
        const movieOverlay = document.createElement("div");
        movieOverlay.className = "movie-overlay";

        movieOverlay.innerHTML = `
        <div style="height: 365px">
          <h3>${movie.primaryTitle}</h3>
          <h5><i class="fa-solid fa-tag" style="color: #A76BCE; padding-right: 1%"></i> ${movie.genres?.slice(0,3).join(', ') || 'N/A'}</h5>
          <h5><i class="fa-solid fa-clock" style="color: #A76BCE; padding-right: 1%"></i> ${movie.runtimeSeconds ? movie.runtimeSeconds / 60 : 'N/A'} mins</h5>
          <h5><i class="fa-solid fa-language" style="color: #A76BCE; padding-right: 1%"></i> ${movie.spokenLanguages && movie.spokenLanguages.length > 0 ? movie.spokenLanguages[0].name : 'N/A'}</h5>
        </div>
        <div style="display: flex; justify-content: center;">
          <a href="movie/movie-detail.php?movieID=${movie.id}"><button>BUY TICKET</button><a>
        </div>
        `;
        movieDiv.appendChild(movieOverlay);

        rowDiv.appendChild(movieDiv);
        
        counter++;

        if (counter === 20) {
          container.appendChild(rowDiv);

          rowDiv.classList.remove("hidden");
          rowDiv.classList.add("fade-in");
          break;
        }
    }
}

async function displayUpcomingMovie() {
    const container = document.getElementById("upcomingMovieContainer");
    container.innerHTML = '';
    
    let counter = 0;
    let rowDiv = document.createElement("div");
    rowDiv.className = "movie-card-row";
    rowDiv.id = "upcoming-movie-card-row";
    rowDiv.classList.add("hidden");

    let url = `https://api.imdbapi.dev/titles?types=MOVIE&genres=Animation&languageCodes=ja&endYear=`
      + (new Date().getFullYear()) + `&sortBy=SORT_BY_RELEASE_DATE&sortOrder=DESC`;
    const NEWEST_SHOWS = await fetchMovieArray(url);

    for (const movieData of NEWEST_SHOWS) {
        if (movieData.primaryImage === undefined || !movieData) {
          continue;
        }
        const movie = await fetchMovieDetail(movieData.id);

        const movieDiv = document.createElement("div");
        movieDiv.className = "movie-card";
        movieDiv.style = "margin: 0 5px";
        movieDiv.innerHTML = `<img src="${movie.primaryImage.url}" alt="${movie.originalTitle}">`;
        const movieOverlay = document.createElement("div");
        movieOverlay.className = "movie-overlay";

        movieOverlay.innerHTML = `
        <div style="height: 365px">
          <h3>${movie.primaryTitle}</h3>
          <h5><i class="fa-solid fa-tag" style="color: #A76BCE; padding-right: 1%"></i> ${movie.genres?.slice(0,3).join(', ') || 'N/A'}</h5>
          <h5><i class="fa-solid fa-clock" style="color: #A76BCE; padding-right: 1%"></i> ${movie.runtimeSeconds ? movie.runtimeSeconds / 60 : 'N/A'} mins</h5>
          <h5><i class="fa-solid fa-language" style="color: #A76BCE; padding-right: 1%"></i> ${movie.spokenLanguages && movie.spokenLanguages.length > 0 ? movie.spokenLanguages[0].name : 'N/A'}</h5>
        </div>
        <div style="display: flex; justify-content: center;">
          <a href="myWishlist/wish-detail.php?movieID=${movie.id}"><button>VIEW INFO</button><a>
        </div>
        `;
        movieDiv.appendChild(movieOverlay);

        rowDiv.appendChild(movieDiv);
        
        counter++;

        if (counter === 20) {
          container.appendChild(rowDiv);

          rowDiv.classList.remove("hidden");
          rowDiv.classList.add("fade-in");
          break;
        }
    }

    // Append any remaining movies in the last row
    if (counter > 0) {

        void rowDiv.offsetWidth;
        rowDiv.classList.remove("hidden");
        rowDiv.classList.add("fade-in");
    }
}

function scrollCurrentMovies(direction) {
    const row = document.querySelector("#current-movie-card-row");
    if (!row) return;
    row.scrollBy({ left: 300 * direction * 2, behavior: "smooth" });
}

function scrollUpcomingMovies(direction) {
    const row = document.querySelector("#upcoming-movie-card-row");
    if (!row) return;
    row.scrollBy({ left: 300 * direction * 2, behavior: "smooth" });
}

let bannerInterval;

function startBannerInterval() {
    bannerInterval = setInterval(scrollBanner, 1);
}

function scrollBanner() {
    const row = document.querySelector("#banner-row");
    if (!row) return;

    const scrollAmount = 2;

    if (row.scrollLeft + row.clientWidth + scrollAmount >= row.scrollWidth) {
        row.scrollTo({ left: 0, behavior: "smooth" });

        clearInterval(bannerInterval);
        setTimeout(startBannerInterval, 1000);
    } else {
        row.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
}