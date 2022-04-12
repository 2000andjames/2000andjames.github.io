const adviceButton = document.getElementById('advice-btn');
adviceButton.addEventListener("click", getAdvice);

async function getAdvice() {
    let response = await fetch('https://api.adviceslip.com/advice');
    let data = await response.json();
    let adviceID = data.slip.id;
    let advice = data.slip.advice;
    const textPlace = document.getElementById('2aj-advice');
    textPlace.innerHTML = `
        <p class="advice-label">ADVICE #${adviceID}</p>
        <p class="advice-text">"${advice}"</p>
    `;
}