const inputEl = document.querySelector('.form-input');
const textEl = document.querySelector('.info-text');
const meaningContainerEl = document.querySelector('.meaning-container');
const titleEl = document.querySelector('.title');
const meaningEl = document.querySelector('.meaning');
const audioEl=document.querySelector('.audio')
inputEl.addEventListener("keyup", (event) => {
    if (event.target.value && event.key === "Enter") {
    fetchAPI(event.target.value)
 }
})
async function fetchAPI(word) {
    try {
        textEl.style.display = "block";
        meaningContainerEl.style.display="none"
         textEl.innerText=`Searching the meaning of ${word}`
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const result = await fetch(url).then((response) => response.json());
        if (result.title) {
             meaningContainerEl.style.display = "block"
            titleEl.innerText = word;
            meaningEl.innerText = "N/A"
            audioEl.style.display = "none"
        } else {
            textEl.style.display = "none";
            titleEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.style.display="inline-flex"
            audioEl.src = result[0].phonetics[0].audio
        }
    } catch (error) {
         textEl.innerText=`It is a problem with your internet connecting`
}
   
}

