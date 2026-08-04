const stat = {
    int: { value: 1, sin: "Int", name: "Intellect" },
    psy: { value: 1, sin: "Psy", name: "Psyche" },
    phy: { value: 1, sin: "Phy", name: "Physique" },
    mot: { value: 1, sin: "Mot", name: "Motorics" }
};

let spare = 8;
let level = 0;
document.addEventListener('click', (event) => {
    const btnSave = event.target.closest('#next');

    const btnLInt = event.target.closest('#lInt');
    const btnRInt = event.target.closest('#rInt');

    const btnLPsy = event.target.closest('#lPsy');
    const btnRPsy = event.target.closest('#rPsy');

    const btnLPhy = event.target.closest('#lPhy');
    const btnRPhy = event.target.closest('#rPhy');

    const btnLMot = event.target.closest('#lMot');
    const btnRMot = event.target.closest('#rMot');

    if(btnSave){
        next();
    }

    if(btnLInt){
        if(stat.int.value>1){
            stat.int.value--;
            spare++;
            level--;
            reload("int");
        }
    }
    if(btnRInt){
        if(stat.int.value<6 && spare>0){
            stat.int.value++;
            spare--;
            level++;
            reload("int");
        }
    }

    if(btnLPsy){
        if(stat.psy.value>1){
            stat.psy.value--;
            spare++;
            level--;
            reload("psy");
        }
    }
    if(btnRPsy){
        if(stat.psy.value<6 && spare>0){
            stat.psy.value++;
            spare--;
            level++;
            reload("psy");
        }
    }

    if(btnLPhy){
        if(stat.phy.value>1){
            stat.phy.value--;
            spare++;
            level--;
            reload("phy");
        }
    }
    if(btnRPhy){
        if(stat.phy.value<6 && spare>0){
            stat.phy.value++;
            spare--;
            level++;
            reload("phy");
        }
    }

    if(btnLMot){
        if(stat.mot.value>1){
            stat.mot.value--;
            spare++;
            level--;
            reload("mot");
        }
    }
    if(btnRMot){
        if(stat.mot.value<6 && spare>0){
            stat.mot.value++;
            spare--;
            level++;
            reload("mot");
        }
    }
});

//updates skill class and points
function reload(id) {
    const levels = ["TERRIBLE", "WEAK", "AVERAGE", "GOOD", "GREAT", "GENIUS"];

        let points = "◈ ".repeat(stat[id].value);
        document.getElementById(`p${stat[id].sin}`).innerHTML=`<h1>${stat[id].value}</h1>
                                                    <h3>${points}</h3>`;
        points = "◈ ".repeat(spare);
        document.getElementById("spare").innerHTML=`<h2>${points}</h2>`;
        document.getElementById(`lv${stat[id].name}`).innerHTML=`<h1>${levels[stat[id].value-1]}</h1>`;
    }

//saves the sheet on a temporary .json file
function next() {
    const name = document.getElementById("name").value || "John Elysium";
    const age = document.getElementById("age").value || "40";
    const type = document.getElementById("type").value || "Unsettled Detective";
    console.log(name, age, type, stat.int.value, stat.psy.value, stat.phy.value, stat.mot.value, spare)
    const char = 
    {
        level: level,
        name: name,
        type: type,
        age: age,
        nhp: 0,
        nmoral: 0,
        Intellect: stat.int.value,
        Psyche: stat.psy.value,
        Physique: stat.phy.value,
        Motorics: stat.mot.value,
        nosaphed: 0,
        magnesium : 0,
        signature: null,
        skills:{
            Logic:0,
            Encyclopedia:0,
            Rhetoric:0,
            Drama:0,
            Conceptualization:0,
            VisualCalculus:0,
            Volition:0,
            InlandEmpire:0,
            Empathy:0,
            Authority:0,
            EspritdeCorps:0,
            Suggestion:0,
            Endurance:0,
            PainThreshold:0,
            PhysicalInstrument:0,
            Eletrochemistry:0,
            Shivers:0,
            HalfLight:0,
            HandEyeCoordination:0,
            Perception:0,
            ReactionSpeed:0,
            SavoirFaire:0,
            Interfacing:0,
            Composure:0,
        }   
    }
    localStorage.setItem('char', JSON.stringify(char));
    window.location.href = "stats.html";
}