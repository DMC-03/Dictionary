const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpword = document.getElementById("inp-word").value;
    fetch(`${url}${inpword}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let audioUrl = "";
        for (let i = 0; i < data[0].phonetics.length; i++) {
            if (data[0].phonetics[i].audio) {
                audioUrl = data[0].phonetics[i].audio.startsWith("http") ? data[0].phonetics[i].audio : `https:${data[0].phonetics[i].audio}`;
                break;
            }
        }

        result.innerHTML = `
        <div class="word">
                <h3>${inpword}</h3>
                <button id="play-sound-btn"> 
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic || ""}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>
            `;

        if (audioUrl) {
            sound.setAttribute("src", audioUrl);
        } else {
            console.warn("No audio URL available for this word.");
        }

        document.getElementById("play-sound-btn").addEventListener("click", () => {
            playSound();
        });
    })
    .catch((error) => {
        console.error("Error fetching word data:", error);
    });
});

function playSound() {
    if (sound.getAttribute("src")) {
        sound.play();
    } else {
        console.warn("No sound source set.");
    }
}
