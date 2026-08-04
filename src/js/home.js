const phrases = [
    " You pick over what's left of your frontal cortex, but no compelling explanations emerge..."," Damn.","Everything is political.","He thinks you're stupid, sire.", " Aggressive. Monotonous... but also somehow sacral. Primitive, yet futuristic, like a machine man. Nothing exists, but the here and now. All are one, one purpose... All you've managed is a list. The parts don't form a whole.", "A long time has passed since the moment of this fusillading. Rain and brine have since washed all the blood away. Not a trace remains.",
    "No. This is somewhere to be. This is all you have, but it's still something. Streets and sodium lights. The sky, the world. You're still alive.", " Only banal things strike you. At the core, you're a very banal person, with a very small soul.", "A sudden gush of wind turns the pages of the books on the counters. She covers her face, smiling, but she's cold. ", " Make her meet your eyes.", "It's the only home you have now. But you can't go back. Not like this.","Something changes between you two. She looks at you differently now -- as an equal. A fellow human being.",
    " It's time. Time to see yourself as you truly are. It's going to be absolutely *devastating*, but there's no way to avoid it. ", "Almost snapped your neck... but I fucking got this. No pain... no pain...", "You hear that, Sally? They're *laughing* at you. Are you gonna let it stand? Are you, Sally? Or are you gonna CRY LIKE A BEAST?! Like a BEAAAST!", " Lets say 13:00 -- a good time to start drinking.", "Heavy drops of rain fall on the colliding eyebrows and run down the worn faces. The world outside this stand-off almost doesn't exist.", "FUCK SORRY. FUCK HIM. HE TREATED YOU LIKE GODDAMN HUMAN WASTE.",
    "Ask for another shot. You'll get it with the next one, the god damn light reflected off some window, surely...","Cop habit. You look at everything.", "Don't let her answer it herself.", " An acrobatic manoeuvre would solve this situation. Nothing can go wrong with a good manoeuvre","Yes, but containers *contain*. Things. Shiny things. They're interesting", "Do you need to have a cry?"  
]
const by = [
    "-Logic","-Encyclopedia","-Rhetoric", "-Drama", "-Conceptualization", "Visual Calculus",
    "-Volition", "-Inland Empire", "-Empathy", "-Authority", "-Esprit de Corps", "-Suggestion",
    "-Endurance","-Pain Threshold","-Physical Instrument","-Eletrochemistry","-Shivers","-Half Light",
    "-Hand/Eye Coordination","-Perception","-Reaction Speed","-Savoir Faire","-Interfacing","-Composure",
]

const fileInput = document.getElementById('file');

document.addEventListener('click', (event) => {
    const btnNew = event.target.closest('#plus');
    const btnLoad = event.target.closest('#load');

    if (btnNew){
        window.location.href = "src/html/newChar.html";
    }
    if (btnLoad){
        fileInput.click()
        load();
    }
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//shows a random phrase
function randomPhrase(){
    var id = getRandomInt(0, phrases.length); 
    document.getElementById("pI").textContent = phrases[id];
    document.getElementById("pII").textContent = by[id];
    var autor = document.getElementById("pII");
    if(id<6){
    autor.style.color = '#4db1dd'}
    if(id>=6 && id<12){
    autor.style.color = '#6449b2'}
    if(id>=12 && id<18){
    autor.style.color = '#af3c5a'}
    if(id>=18){
    autor.style.color = '#daa41f'}
}

randomPhrase();

//load a local .json in the localstorage 
function load(){

//re
    fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file===0) return;

    const reader = new FileReader();

    reader.onload = () => {
    try {
        const data = JSON.parse(reader.result);
        console.log("Data successfully uploaded", data);
        localStorage.setItem('char', JSON.stringify(data));
        window.location.href = "src/html/stats.html";
    } catch (error) {
        alert("Invalid .json upload. Please try again");
    }
  };
    reader.readAsText(file);
});
}