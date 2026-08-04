
const outstats = document.querySelector('.stats');
const outstatsp = document.querySelector('.statsp');
const outinfo = document.querySelector('.info');
const outhp = document.querySelector('#h');
const outmoral = document.querySelector('#m');
const outnosaphed = document.querySelector('#pv');
const outmagnesium = document.querySelector('#mrl');
const outbar1 = document.querySelector('#bar1');
const outbar2 = document.querySelector('#bar2');
const outselectedStat= document.querySelector('.selectedStat');
const outroll= document.querySelector('.die_result');


const skillsUrl = '../json/skills.json'; 

let level, name, type, age, signature,
    nhp, nmoral,
    intellect, psyche, physique, motorics,
    nosaphed, magnesium, endurance, volition;
let skillsData = null;
let sheetData = null;
let skill_id = 0;
let skill_learn = [];
let abilityCap = [0, 0, 0, 0];


document.addEventListener('DOMContentLoaded', () => {
    getdata();
});

document.addEventListener('click', (event) => {
    const btnSkill = event.target.closest('.btn-skill');
    const btnDice = event.target.closest('.btn-dice');
    const btnHp = event.target.closest('#barHp');
    const btnMoral = event.target.closest('#barMoral');
    const btnLv = event.target.closest('.btn-lv');
    const btnNosaphed = event.target.closest('#barNhp');
    const btnMagnesium = event.target.closest('#barNmoral');

    const btnNosaphedSub = event.target.closest('#nosaphedSub');
    const btnNosaphedAdd = event.target.closest('#nosaphedAdd');
    const btnMagnesiumSub = event.target.closest('#magnesiumSub');
    const btnMagnesiumAdd = event.target.closest('#magnesiumAdd');

    const btnSave = event.target.closest('#save');

    if (btnSkill) {
        const index = btnSkill.getAttribute('data-index');

        skill_id = description(index, abilityCap);
    }
    if (btnDice){
        rollDice(skill_id)
    }
    if (btnHp){
        if(nhp<endurance+physique){
            nhp++;
            console.log(nhp);
            reloadBar("nhp",nhp);}
    }
    if (btnMoral){
        if (nmoral<volition+psyche){
            nmoral++;
            console.log(nmoral);
            reloadBar("nmoral", nmoral);}
    }
    if (btnLv){
        if (signature===null){
            signature = Number(skill_id);
            signatureAbility = Math.floor(skill_id/6);
            abilityCap[signatureAbility]++;
            console.log(signature, signatureAbility);
            skill_learn[signature]++;
            sign(skill_id, abilityCap);
            document.getElementsByClassName("roll_upBtn")[1].innerHTML = `<button class = "btn-lv">LEVEL UP</button>
                                                                        <h2>⬦</h2>`
        }
        else {
        levelup(skill_id, abilityCap);
     }
        if (skill_id == 6){
            reloadBar("nmoral", nmoral);
        }
        if (skill_id == 12){
            reloadBar("nhp", nhp);
        }
    }
    if(btnNosaphed && nosaphed>0){
        nosaphed--;
        nhp--;
        reloadBar("nhp", nhp);
        heal("nosaphed", nosaphed);
    }
     if(btnMagnesium && magnesium>0){
        magnesium--;
        nmoral--;
        reloadBar("nmoral", nmoral);
        heal("magnesium", magnesium);
    }
    if(btnNosaphedSub && nosaphed>0){
        nosaphed--;
    }
    if(btnNosaphedAdd && nosaphed<100){
        nosaphed++;
    }
    if(btnMagnesiumSub && magnesium>0){
        magnesium--;
    }
    if(btnMagnesiumAdd && magnesium<100){
        magnesium++;
    }
    if(btnSave){
        save()
    }


});

document.addEventListener('mouseover', (event) => {
    const hovNosaphed = event.target.closest('#pv');
    const hovMagnesium = event.target.closest('#mrl');    
    
    if(hovNosaphed){
        document.getElementById("pv").innerHTML=`<button id="nosaphedSub">-</button><button id="nosaphedAdd">+</button>` 
        
    }
    if(hovMagnesium){
        document.getElementById("mrl").innerHTML=`<button id="magnesiumSub">-</button><button id="magnesiumAdd">+</button>` 
    }

    });

document.addEventListener('mouseout', (mouseevent) => {
const hovOutNosaphed = event.target.closest('#pv');
const hovOutMagnesium = event.target.closest('#mrl');    

if(hovOutNosaphed){
    document.getElementById("pv").innerHTML=`<p id="nosaphed">${nosaphed}</p>` 
}
if(hovOutMagnesium){
    document.getElementById("mrl").innerHTML=`<p id="magnesium">${magnesium}</p>`
}
});

//fetch the data from the .json file ("yourname.json" and "skills.json")
function getdata() {
    Promise.all([
        fetch(skillsUrl).then(res => res.json())
    ])
    .then(([skillsRes]) => {
        const skillName = ["Logic","Encyclopedia","Rhetoric","Drama","Conceptualization","VisualCalculus","Volition","InlandEmpire","Empathy","Authority",
                            "EspritdeCorps","Suggestion","Endurance","PainThreshold","PhysicalInstrument","Eletrochemistry","Shivers","HalfLight",
                            "HandEyeCoordination","Perception","ReactionSpeed","SavoirFaire","Interfacing","Composure"];
        sheetData = JSON.parse(localStorage.getItem('char'));
        skillsData = skillsRes;
        level = sheetData.level
        name = sheetData.name;
        type = sheetData.type;
        age = sheetData.age;
        nhp = sheetData.nhp;
        nmoral = sheetData.nmoral;
        signature = sheetData.signature;
        intellect = sheetData.Intellect;
        psyche = sheetData.Psyche;
        physique = sheetData.Physique;
        motorics = sheetData.Motorics;

        nosaphed = sheetData.nosaphed;
        magnesium = sheetData.magnesium;

        endurance = sheetData.skills.Endurance
        volition = sheetData.skills.Volition

        for(let i = 0;i<24; i++){
            skill_learn[i]= sheetData.skills[skillName[i]];
        }

        outdata(skillsRes, abilityCap); 
    })
    .catch(err => console.error("Couldn't open .json", err));
}


//write down all html text which operates with variables
function outdata(val, abilityCap) {
    const skillName = ["Logic","Encyclopedia","Rhetoric","Drama","Conceptualization","VisualCalculus","Volition","InlandEmpire","Empathy","Authority",
                        "EspritdeCorps","Suggestion","Endurance","PainThreshold","PhysicalInstrument","Eletrochemistry","Shivers","HalfLight",
                        "HandEyeCoordination","Perception","ReactionSpeed","SavoirFaire","Interfacing","Composure"];
    //abilities
    let html = '';
    const atributtes = [intellect, psyche, physique, motorics];
    const atributtes_name = ["intellect", "psyche", "physique", "motorics"];
    let i = 0
    for(let n of atributtes){
        let points = "◈ ".repeat(n);
        html += `
        <div class="statp">
            <div>
                <h1>${n}</h1>
                <p>${points}</p>
                <h2>${atributtes_name[i].toUpperCase()}</h2>
            </div>
        </div>
        `;
        i++;
    }
    outstatsp.innerHTML = html;

    //profile
    html = '';
    html += `<div id="personal">
                ${name} > ${type} > ${age}y/o > lv.${level}
            </div>
            <div id="save">save</div>`;
    outinfo.innerHTML = html;
    
    //nosaphed counter
    html = '';
    html += `<p id="nosaphed">${nosaphed}</p>`;
    outnosaphed.innerHTML = html;

    //hp counter
    html = '';
    html += `<div>
                ${endurance+physique-nhp}/${endurance+physique}
            </div>`;
    outhp.innerHTML = html;

    //magnesium counter
    html = '';
    html += `<p id="magnesium">${magnesium}</p>`;
    outmagnesium.innerHTML = html;

    //morale counter
    html = '';
    html += `<div>
                ${volition+psyche-nmoral}/${volition+psyche}
            </div>`;
    outmoral.innerHTML = html;

    //hp bar
    html = '';
    i = nhp
    for(i; i<(endurance+physique); i++){
        html += `<div style="background-color: #eb6408"  id="barHp">
                
            </div>`;
    }
    for(i=0; (i<nhp); i++){
        html += `<div style="background-color: #0a101a" id="barNhp">
                
            </div>`;
    }

    outbar1.innerHTML = html;
    
    //morale bar
    html = '';
    for(i = nmoral; i<(volition+psyche); i++){
        html += `<div style="background-color: #19648b" id="barMoral">
                
            </div>`;
    }
    for(i=0; (i<nmoral); i++){
        html += `<div style="background-color: #0a101a" id="barNmoral">
                
            </div>`;
    }
    outbar2.innerHTML = html;
    
        if(signature!==null){
        abilityCap[Math.floor(signature/6)]++;
        console.log(signature, Math.floor(signature/6));
        document.getElementsByClassName("roll_upBtn")[1].innerHTML = `<button class = "btn-lv">LEVEL UP</button>
                                                                        <h2>⬦</h2>`
    }

    //selected skill description
    html = '';
    points = "◈ ".repeat(skill_learn[0]);
    points += "◇ ".repeat(intellect - skill_learn[0] + abilityCap[0]);
    let leart = "";
    if(skill_learn[0]>0){leart="+"};
    html += `<div class= "icon" style = "background-image:url(), url(${val[0].iconURL})">
                <h1 id="descriptionPoints">${points}</h1>
                <h1 class="iconTxt">${val[0].name}</h1>
            </div>
            <div class="description">
            <div>
                <p style="font-size:1.3rem">${val[0].description}</p><hr>
                <div class="attnumbers">
                    <div style="flex:0.7">
                    <p>intellect base: +${intellect}</p>
                    <p id="descriptionLearned">learned skill: ${leart+skill_learn[0]}</p>
                    </div>
                    <div class="total">
                        <h3>TOTAL:</h3>
                        <p id="descriptionTotal">${skill_learn[0]+intellect}</p>
                    </div>
                </div>
            </div>
            </div>`;

    
    outselectedStat.innerHTML = html;

    
    console.log(val[0].name)
    


    html = '';

    i=0;

    //skill cards
    val.forEach((ele, id) => {
        let lerningpoints = sheetData.skills[skillName[id]];
        points = "◈ ".repeat(lerningpoints);
        if((ele.id)<6){
         points += "◇ ".repeat(intellect + abilityCap[0] - lerningpoints);   
        }
        if((ele.id)>=6 && (ele.id)<12){
         points += "◇ ".repeat(psyche + abilityCap[1] - lerningpoints);   
        }
        if((ele.id)>=12 && (ele.id)<18){
         points += "◇ ".repeat(physique + abilityCap[2] - lerningpoints);   
        }
        if((ele.id)>=18){
         points += "◇ ".repeat(motorics + abilityCap[3] - lerningpoints);   
        }
        signed = ""
        let gray = 0;
        if (id === signature){signed="../content/signature.png"}
        if (skill_learn[id] == 0) gray=1;
        html+=`<button class = "btn-skill" data-index="${i}">
                        <div style ="background-image: url(${signed}),url('${ele.iconURL}'); filter: grayscale(${gray});" class="skill">
                        <div id="${i}"><h3>${points}</h3></div>
                        <div><h2>${ele.name}</h2></div>
                    </div>
                </button>`;

        i++;
    });
    outstats.innerHTML = html;
} 

//update selected skill description
function description(id, abilityCap) {
    console.log(id);
    const atributtes = [intellect, psyche, physique, motorics];
    const atributtes_name = ["intellect", "psyche", "physique", "motorics"];
    const stat_id = Math.floor(id / 6); 
    
    points = "◈ ".repeat(skill_learn[id]);
    points += "◇ ".repeat(atributtes[stat_id] - skill_learn[id] + abilityCap[Math.floor(id/6)]);
    let leart = "";
    if(skillsData[id].learned>0){leart="+"}

    let html ='';
    html += `<div class= "icon" style = "background-image:url(), url(${skillsData[id].iconURL})">
                <h1 id="descriptionPoints">${points}</h1>
                <h1 class="iconTxt">${skillsData[id].name}</h1>
            </div>
            <div class="description">
            <div>
                <p style="font-size:1.3rem">${skillsData[id].description}</p><hr>
                <div class="attnumbers">
                    <div style="flex:0.7">
                    <p>${atributtes_name[stat_id]} base: +${atributtes[stat_id]}</p>
                    <p id="descriptionLearned">learned skill: ${leart+skill_learn[id]}</p>
                    </div>
                    <div class="total">
                        <h3>TOTAL:</h3>
                        <p id="descriptionTotal">${skill_learn[id]+atributtes[stat_id]}</p>
                    </div>
                </div>
            </div>
            </div>`;
        outselectedStat.innerHTML = html;
        console.log(id);
        return id;
}

//roll 2 dice using the sum selected skill, skill ability
async function rollDice (skill_id){
    console.log(skill_id)
    let stat_id;
    stat_id = Math.floor(skill_id / 6);
    
    const atributtes = [intellect, psyche, physique, motorics];
    let dice1 = Math.floor(Math.random() * (7 - 1) + 1);
    let dice2 = Math.floor(Math.random() * (7 - 1) + 1);
    let modifier = atributtes[stat_id] + skill_learn[skill_id];
    let result = dice1 + dice2 + modifier;
    let resultType;
    let color = "#ffffff00";
    var audio = new Audio('../content/success.mp3')
        color = "#FFF"
        if (result<=5) resultType = "FAILURE";
        else if (result == 6 || result == 7) resultType = "TRIVIAL";
        else if (result == 8 || result == 9) resultType = "EASY";
        else if (result == 10 || result == 11) resultType = "MEDIUM";
        else if (result == 12) resultType = "CHALLENGING";
        else if (result == 13) resultType = "FORMIDABLE";
        else if (result == 14) resultType = "LEGENDARY";
        else if (result == 15) resultType = "HEROIC";
        else if (result == 16 || result == 17) resultType = "GODLY";
        else if (result>=18) resultType = "IMPOSSIBLE";
        if(dice1 == dice2 && dice2 == 6) {resultType = "CRITICAL SUCCESS"; color = "#38ff49";};
        if(dice1 == dice2 && dice2 == 1) {resultType = "CRITICAL FAILURE"; color = "#ff3838";};
        

    console.log(skillsData[skill_id].name, dice1, "+", dice2, "+", modifier, "=", result);
    audio.play();
    
    
    sliding()


    setTimeout(() => {
    let html ='';
    html += `
                    <img src= "../content/${dice1}.svg"></img>
                    <img src= "../content/${dice2}.svg"></img>
                    <div>
                        <p style="color:${color}">${resultType}</p>
                    </div>
            `;
        outroll.innerHTML = html;  
        }, 1000);
}   

//set a timeout
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//dice roll animation
async function sliding() {
  for (let u = 0; u <= 6; u++) {
    await sleep(100); 

    let html = `
      <img src="../content/${Math.floor(Math.random() * 6 + 1)}.svg">
      <img src="../content/${Math.floor(Math.random() * 6 + 1)}.svg">
    `;
    
    outroll.innerHTML = html;
  }
}

//updates the hp and morale bar and respective counters
function reloadBar(stat, nStat){
    let i = nStat
    let html = '';
    if(stat=="nhp"){
    for(i; i<(skill_learn[12]+physique); i++){
    html += `<div style="background-color: #eb6408" id="barHp">
                
            </div>`;
    }
    for(i=0; (i<nhp); i++){
        html += `<div style="background-color: #0a101a" id="barNhp">
                
            </div>`;
    }

    outbar1.innerHTML = html;

    html = '';
    html += `<div>
                ${skill_learn[12]+physique-nStat}/${skill_learn[12]+physique}
            </div>`;
    outhp.innerHTML = html;
    }
    if (stat=="nmoral"){
    for(i = nStat; i<(skill_learn[6]+psyche); i++){
        html += `<div style="background-color: #19648b" id="barMoral">
                
            </div>`;
    }
    for(i=0; (i<nmoral); i++){
        html += `<div style="background-color: #0a101a" id="barNmoral">
                
            </div>`;
    }
    outbar2.innerHTML = html;

    html = '';
    html += `<div>
                ${skill_learn[6]+psyche-nStat}/${skill_learn[6]+psyche}
            </div>`;
    outmoral.innerHTML = html;

    }
}

//updates skill when leveled up
function levelup(id, abilityCap){

    console.log(skill_learn[id]);
    const stat_id = Math.floor(id / 6);
    const attributes = [intellect, psyche, physique, motorics];
    const selectedStat = attributes[stat_id];
    let points ='';
            if(skill_learn[id]>=selectedStat + abilityCap[stat_id])return;
            skill_learn[id]++;
            const learningpoints = skill_learn[id];
            points = "◈ ".repeat(learningpoints);
            points += "◇ ".repeat(selectedStat+ abilityCap[stat_id] - learningpoints);  

        level++;
        document.getElementById("personal").innerHTML=`<div>
                                                            ${name} > ${type} > ${age}y/o > lv.${level}
                                                     </div>`
        document.getElementById(`${id}`).innerHTML=`<h3>${points}</h3>`;
        document.querySelector(`.btn-skill[data-index="${id}"]`)
        .querySelector('.skill')
        .style.filter = `grayscale(0)`;
        document.getElementById("descriptionPoints").innerHTML=`${points}`;
        document.getElementById("descriptionLearned").innerHTML=`<p>learned skill: +${skill_learn[id]}</p>`;
        document.getElementById("descriptionTotal").innerHTML=`<p>${skill_learn[id]+selectedStat}</p>`;
    }


//updates nosaphed and magnesium counters when used/added
function heal(item, itemInv){
    if(item == "nosaphed"){document.getElementById("nosaphed").innerHTML=`${itemInv}`;}
    if(item == "magnesium"){document.getElementById("magnesium").innerHTML=`${itemInv}`;}
}

//uploads signature skill
function sign(id){
    const atributes = [intellect, psyche, physique, motorics];
    const attId = Math.floor(id/6);
    for(let i = Math.floor(attId)*6; i<Math.floor(attId)*6+6;i++){
        let points = "◈ ".repeat(skill_learn[i]) + "◇ ".repeat(atributes[Math.floor(attId)] + 1 - skill_learn[i]);
        document.getElementById(`${i}`).innerHTML=`<h3>${points}</h3>`
    }
        let points = "◈ ".repeat(skill_learn[id]) + "◇ ".repeat(atributes[Math.floor(attId)] + 1 - skill_learn[id]);

        document.querySelector(`.btn-skill[data-index="${id}"]`)
        .querySelector('.skill')
        .style.backgroundImage = `url('../content/signature.png'), url('${skillsData[id].iconURL}')`;

        document.getElementById("descriptionPoints").innerHTML=`${points}`;
        document.getElementById("descriptionLearned").innerHTML=`<p>learned skill: +${skill_learn[id]}</p>`;
        document.getElementById("descriptionTotal").innerHTML=`<p>${skill_learn[id]+atributes[attId]}</p>`;
}

//saves all sheet data on a .json file
function save(){
    const char = 
    {
        level: level,
        name: name,
        type: type,
        age: age,
        nhp: nhp,
        nmoral: nmoral,
        Intellect: intellect,
        Psyche: psyche,
        Physique: physique,
        Motorics: motorics,
        nosaphed: nosaphed,
        magnesium : magnesium,
        signature: signature,
        skills:{
            Logic:skill_learn[0],
            Encyclopedia:skill_learn[1],
            Rhetoric:skill_learn[2],
            Drama:skill_learn[3],
            Conceptualization:skill_learn[4],
            VisualCalculus:skill_learn[5],
            Volition:skill_learn[6],
            InlandEmpire:skill_learn[7],
            Empathy:skill_learn[8],
            Authority:skill_learn[9],
            EspritdeCorps:skill_learn[10],
            Suggestion:skill_learn[11],
            Endurance:skill_learn[12],
            PainThreshold:skill_learn[13],
            PhysicalInstrument:skill_learn[14],
            Eletrochemistry:skill_learn[15],
            Shivers:skill_learn[16],
            HalfLight:skill_learn[17],
            HandEyeCoordination:skill_learn[18],
            Perception:skill_learn[19],
            ReactionSpeed:skill_learn[20],
            SavoirFaire:skill_learn[21],
            Interfacing:skill_learn[22],
            Composure:skill_learn[23],
        }   
    }
const saveFile = JSON.stringify(char);
console.log(saveFile);
const blob = new Blob([saveFile], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.split(' ')[0].replace(/[^a-zA-Z0-9\s]/g, "")}`;
  
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  URL.revokeObjectURL(url);
}