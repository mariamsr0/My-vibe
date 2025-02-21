
let currentSongIndex = 0; // Index pour suivre la musique en cours

// Sélection des éléments HTML (Q4 et Q5)
const audioPlayer = document.getElementById("audio-player");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const seekBar = document.getElementById("seek-bar");
const currentTimeEl = document.querySelector(".current-time");
const durationTimeEl = document.querySelector(".song-duration-time");
const description = document.getElementById("description");

// Sélectionne l'image dans ton HTML
const albumImage = document.getElementById("photo");

// Charger une musique dans le lecteur (Q5)
//Cette fonction charge une musique en fonction de son index dans le tableau songs
function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
    audioPlayer.src = song.src;
    description.textContent = song.description;

    // Met à jour l'image de l'album
    albumImage.src = song.background;

    // Met à jour le lien Spotify
    const spotifyLogo = document.getElementById("spotify-logo");
    spotifyLogo.href = song.spotify;

    


    playBtn.textContent = "⏵";
    audioPlayer.pause();
    seekBar.value = 0;
    currentTimeEl.textContent = "00:00";
    durationTimeEl.textContent = "00:00";
}

// Met à jour la barre de progression et les temps (Q6)
audioPlayer.addEventListener("timeupdate", () => {
    seekBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    durationTimeEl.textContent = formatTime(audioPlayer.duration || 0);
});

// Permettre de chercher dans la chanson
seekBar.addEventListener("input", () => {
    audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
});

// Formater les secondes
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Lecture et pause (Q4)
//Ce bloc gère la lecture et la pause de la musique.
playBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.textContent = "⏸";
    } else {
        audioPlayer.pause();
        playBtn.textContent = "⏵";
    }
});

// Navigation entre les musiques (Q5)
nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playBtn.textContent = "⏸";
});

prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playBtn.textContent = "⏸";
});

// Cela permet de charger la première chanson par défaut à chaque que la page se réouvre
loadSong(currentSongIndex);

// Question 11
document.getElementById("champs-formulaire").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire

    // Récupération des valeurs des champs
    const artiste = document.getElementById("artiste").value;
    const titre = document.getElementById("titre-musique").value;
    const description = document.getElementById("description-musique").value;
    const audioUrl = document.getElementById("audio-url").value;

    // Création de l'URL de l'API
    const apiUrl = `https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=sarr&courriel=philippe.gambette@univ-eiffel.fr&message=${description}&title=${titre}&audio-url=${audioUrl}&artiste=${artiste}`;

    // Affichage de l'URL dans la console
    console.log("URL générée :", apiUrl);

    // Appel de l'API
    fetch(apiUrl)
        .then((response) => {
            console.log("Réponse reçue :", response);
            return response.json();
        })
        .then((data) => {
            console.log("Données reçues :", data);

            // Optionnel : Indiquer le succès ou l'échec à l'utilisateur
            if (data.success) {
                alert("Votre musique a bien été enregistrée !");
            } else {
                alert("Une erreur est survenue. Veuillez réessayer.");
            }
        })
        .catch((error) => {
            console.error("Erreur lors de l'appel API :", error);
            alert("Une erreur est survenue. Veuillez vérifier votre connexion internet.");
        });
});

document.getElementById("artiste").addEventListener("input", function () {
    document.querySelector("#titleuser").textContent = this.value || "Titre de la musique";
});

document.getElementById("description-musique").addEventListener("input", function () {
    document.querySelector("#descriptionuser").textContent = this.value || "Description de la musique...";
});

document.getElementById("audio-url").addEventListener("input", function () {
    document.querySelector("#audiouser").innerHTML = `<audio controls>
        <source src="${this.value}" type="audio/mp3">
        Votre navigateur ne supporte pas l'audio.
    </audio>`;
});

/* j'ai voulu faire un bouton pour mes crédit mes crédit mais ça n'a pas marché
document.querySelector('.boutonCredits').addEventListener('click', function(event) {
    event.preventDefault();

    console.log("Le bouton a été cliqué");

    const credits = document.querySelector('.clickcredits');

    if (credits.hasAttribute('hidden')) {
        credits.removeAttribute('hidden');
        console.log("Footer affiché");
    } else {
        credits.setAttribute('hidden', 'true');
        console.log("Footer caché");
    } */

