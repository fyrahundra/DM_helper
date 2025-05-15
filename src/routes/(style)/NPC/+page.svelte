<script>
	import { onMount } from "svelte";

    import { dndNames } from '$lib/data/dndNames.js';    //Alla namn är framtagna med hjälp av ChatGPT
	import { characterDescriptions } from "$lib/data/dnd_character_descriptions.js";


    let fullName = ""
    let Disc = ""

    let visible = "none"

    let rolls = []
    let highRoll
    let mod = 0

    let abilityScr = []
    let abilityMod = []

    let races = []
    let classes = []

    let chosenRaces = []
    let chosenClasses = []

    let rRace //The randomized race
    let rClass //The randomized class

    let raceFetch = []
    let classFetch = []

    const ability = ["Str", "Dex", "Con", "Int", "Wis", "Cha"] 

    const pictures = {
        "Dragonborn" : "https://www.dndbeyond.com/avatars/thumbnails/6/340/420/618/636272677995471928.png",
        "Gnome": "https://www.dndbeyond.com/avatars/thumbnails/6/334/420/618/636272671553055253.png",
        'Dwarf': "https://www.dndbeyond.com/avatars/thumbnails/6/254/420/618/636271781394265550.png", 
        "Elf" : "https://www.dndbeyond.com/avatars/thumbnails/7/639/420/618/636287075350739045.png",
        "Half-Elf": "https://www.dndbeyond.com/avatars/thumbnails/6/481/420/618/636274618102950794.png", 
        "Half-Orc": "https://www.dndbeyond.com/avatars/thumbnails/6/466/420/618/636274570630462055.png",
        "Halfling": "https://www.dndbeyond.com/avatars/thumbnails/6/256/420/618/636271789409776659.png",
        "Human": "https://www.dndbeyond.com/avatars/thumbnails/6/258/420/618/636271801914013762.png",
        "Tiefling": "https://www.dndbeyond.com/avatars/thumbnails/7/641/420/618/636287076637981942.png",
    }

    onMount(()=>{
        const fetchData = async()=> {
            races = await getInfo("races")
            classes = await getInfo("classes")

            randomRace()
            randomClass()
            randomName()
            randomDisc()
            
            raceFetch = await getInfo("races/"+rRace.index)
            console.log("Info for race:", raceFetch)
            console.log("Speed =", raceFetch[0].speed)

            classFetch = await getInfo("classes/"+rClass.index)
            console.log("Info for class:", classFetch)
            console.log("Hit die =", classFetch[0].hit_die)

            console.log("Races:", races, "\nClasses", classes)

            // This code is taken from https://stackoverflow.com/questions/30430540/button-change-color-when-clicked-in-html
            let elems = document.getElementsByClassName("colorChange");
            for (var i = 0; i < elems.length; i++) {
            elems[i].onclick = function() {
                let color = window.getComputedStyle(this, null)
                            .getPropertyValue("background-color");
                this.style.backgroundColor = color === "rgb(0, 255, 0)"?"rgb(0,0,0)":"rgb(0, 255, 0)"
            };
            };
        }
        fetchData()
        
    })

    async function getInfo(target) {
        const respons = await fetch("https://www.dnd5eapi.co/api/2014/" + target)

        if(respons.status != 200){
            throw error(respons.status, {message: respons.statusText})
        }

        const data = await respons.json()
        console.log("Fetched data:", data)
        console.log("Fetched .result:", data.results)

        if(Array.isArray(data.results)){
            return[...data.results]
        } else if(data){
            return[data]
        } else{
            return[]
        }
    }

    function randomScore(){
        let sum = 0
        for(let l = 0; l < 6; l++){
            for(let i = 0; i < 6; i++){
                let roll = Math.floor(Math.random()*6) +1
                rolls.push(roll)
                console.log(rolls)
            }
        
            for(let j = 0; j<3; j++){
                highRoll = Math.max(...rolls)
                console.log(highRoll)
                const index = rolls.findIndex(roll => roll === highRoll);
                rolls.splice(index,1)

                sum += highRoll

                console.log(index)
                console.log(rolls)
            }
            abilityScr.push({stat: ability[l], score: sum})
            abilityScr = abilityScr
            sum = 0
            rolls = []
        }
        
    }

    function scoreConvert(){
        console.log("start mod", mod)
        abilityScr.forEach(score => {
            if(score.score == 3){
                mod = -4
            }
            else if(score.score == 4 || score.score == 5){
                mod = -3
            }
            else if(score.score == 6 || score.score == 7){
                mod = -2
            }
            else if(score.score == 8 || score.score == 9){
                mod = -1
            }
            else if(score.score == 10 || score.score == 11){
                mod = 0
            }
            else if(score.score == 12 || score.score == 13){
                mod = 1
            }
            else if(score.score == 14 || score.score == 15){
                mod = 2
            }
            else if(score.score == 16 || score.score == 17){
                mod = 3
            }
            else if(score.score == 18 || score.score == 19){
                mod = 4
            }
            else if(score.score == 20){
                mod = 5
            }
            console.log(mod)
            abilityMod.push({stat: score.stat, score: mod})
            abilityMod = abilityMod
            console.log("Mod:", abilityMod)
        })
    }

    function randomRace(){
        if(!chosenRaces[0]){
            rRace = races[Math.floor(Math.random()*races.length)]
        }
        else{
            rRace = chosenRaces[Math.floor(Math.random()*chosenRaces.length)]
        }
        console.log("Random race:", rRace)
    }

    function randomClass(){
        if(!chosenClasses[0]){
            rClass = classes[Math.floor(Math.random()*classes.length)]
        }
        else{
            rClass = chosenClasses[Math.floor(Math.random()*chosenClasses.length)]
        }
        console.log("Random class:", rClass)
    }

    function randomName(){
        let currentRace = rRace.name
        fullName = dndNames.firstNames[currentRace][Math.floor(Math.random()*dndNames.firstNames[currentRace].length)] + " " + dndNames.lastNames[currentRace][Math.floor(Math.random()*dndNames.lastNames[currentRace].length)]
    }

    function randomDisc(){
        let currentRace = rRace.name
        let currentClass = rClass.name
        let filtered = characterDescriptions.filter(discription => discription.race === currentRace)
        console.log("Discs part 1",filtered)
        filtered = filtered.filter(discription => discription.class === currentClass)
        console.log("Discs part 2",filtered)
        Disc = filtered[Math.floor(Math.random()*filtered.length)].description
        console.log("Discs part 3",Disc)
    }


    randomScore()
    scoreConvert()



</script>

<main>
    <h1>NPC-generator</h1>
            <section class="container">
                <div class="stats">
                    <div style="display: flex; flex-direction:column;">
                        {#each abilityScr as score}
                            <div>
                                {score.stat} {score.score}
                            </div>
                        {/each}
                    </div>
                    <div style="display: flex; flex-direction:column;">
                        {#each abilityMod as mod}
                            <div>
                                {#if mod.score >= 0}
                                    + {mod.score}
                                    {:else}
                                    - {Math.abs(mod.score)}
                                {/if}
                            </div>
                        {/each}
                    </div>
                </div>
                <article class="discription">
                    <p>{Disc}</p>
                </article>
            </section>
            <section class="info">
                <p>Health: {classFetch[0]?classFetch[0].hit_die + abilityMod[2].score:"..."}</p>
                <p>Race: {rRace?rRace.name:"..."}</p>
                <p>Class: {rClass?rClass.name:"..."}</p>    
            </section>

            <p class="AC">AC: {10 + abilityMod[1].score}</p>
            <p class="speed">Speed: {raceFetch[0]?raceFetch[0].speed+"ft":"..."}</p>
            

            <img class="img" src={rRace?pictures[rRace.name]:""} alt="NPC img">
            <h2 class="name">Name: {fullName}</h2>
        
        <button on:click={()=>{
            classFetch = []
            raceFetch = []
            
            abilityMod = []
            abilityScr = []

            randomScore()
            scoreConvert()
            randomRace()
            randomClass()
            randomName()
            randomDisc()

            const fetchData = async()=> {
                raceFetch = await getInfo("races/"+rRace.index)
                console.log("Info for race:", raceFetch)
                console.log("Speed =", raceFetch[0].speed)

                classFetch = await getInfo("classes/"+rClass.index)
                console.log("Info for class:", classFetch)
                console.log("Hit die =", classFetch[0].hit_die)

            }; fetchData()

        }} class="random">
            Randomize
        </button>

        <button class="options" on:click={()=>{visible = "flex"}}>Randomizer Options</button>


        <svg width="100vw" height="100%" style="position: absolute; opacity:0.5; z-index:1; top:0; left:0; display:{visible};">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <rect width="100%" height="100%" style="fill:#000000;" on:click={()=>{visible = "none"}}/>
        </svg>

        <section class="optionWindow" style="display: {visible};">  
            <h2>Possible Classes</h2>
                <div class="choose snap-x">
                    {#each classes as Class}
                        <button class="colorChange snap-end" on:click={(j)=>{
                            if(chosenClasses.filter(classes => {
                                return classes == Class
                            }).length == 0){
                                chosenClasses.push(Class)
                            }
                            else{
                                chosenClasses.splice(j,1)
                            }
                            chosenClasses = chosenClasses
                            console.log(chosenClasses.filter(classes => {
                                return classes == Class
                            }).length)
                            console.log(chosenClasses)
                        }}>
                            {Class.name}
                        </button>
                    {/each}
                </div>

            <h2>Possible Races</h2>
                <div class="choose snap-x">
                    {#each races as race}
                        <button class="colorChange snap-end" on:click={(i)=>{
                            if(chosenRaces.filter(races => {
                                return races == race
                            }).length == 0){
                                chosenRaces.push(race)
                            }
                            else{
                                chosenRaces.splice(i,1)
                            }
                            chosenRaces = chosenRaces
                            console.log(chosenRaces.filter(races => {
                                return races == race
                            }).length)
                            console.log(chosenRaces)
                        }}>
                            {race.name}
                        </button>
                    {/each}
                </div>

            <button on:click={()=>{
                visible = "none"
            }}>Done</button>

            <button on:click={()=>{
                chosenClasses = []
                chosenRaces = []

                let b = document.getElementsByClassName("colorChange");
                for(var i = 0; i < b.length; i++){
                    b[i].style.backgroundColor = "rgb(0,0,0)"
                }
            }}>Reset</button>

        </section>
</main>

<style>
    main{
        display: flex;

        flex-direction: column;

        justify-content: space-around;
        align-items: center;

        text-align: center;

        position: relative;

        z-index:1;

        width:49vw;
        height: 100vh;
        /*font-family: "Lucida Handwriting", cursive;*/

        position: relative;
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

        color: black;
    }

    .stats{
        display: flex; 
        flex-direction:row; 
        width: 25%;
        justify-content: space-evenly;

        border-right: solid black 2px;

        background-color:rgb(255,255,255,0.7)
    }

    .container{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        width: 99%;

        border: solid black 2px;

        position: absolute;
        top: 55%;
        left: 0.5%;

    }

    .info{
        position: absolute;

        top: 25%;
        left: 80%;
    }

    .info *{
        margin-bottom: 20%;
    }

    .discription{
        display: flex; 
        flex-direction:row; 
        width: 75%;
        justify-content: space-evenly;

        align-items: center;

        background-color: rgb(255,255,255,0.7);

        text-align: center;
        text-wrap: wrap;
    }

    .discription *{
        width: 90%;
    }

    .AC{
        position: absolute;

        top: 25%;
        left: 8%;

        font-size: xx-large;
    }

    .speed{
        position: absolute;

        top: 45%;
        left: 8%;

        font-size: larger;
    }

    .name{
        position: absolute;

        top: 50%;

        font-size: large;
    }

    .img{
        position: absolute;

        top: 15%;

        height: 35%;
        width: 35%;
    }

    .random{
        position: absolute;
        top: 85%;
        left: 35%;
    }

    .options{
        position: absolute;
        top: 85%;
        left: 65%;
    }

    .optionWindow{
        flex-direction: column;
        align-items: center;
        
        z-index:3; 

        row-gap: 5%;

        height:75%; 
        width: 75%; 

        left:62.5%; 
        top:12.5%; 

        padding: 5%;
        
        position:absolute; 
        
        color:white;
        background-color: black; 
        border: solid 1px white;
    }

    .choose{
        display: flex; 
        flex-direction: row; 
        column-gap:5%; 
        text-align:center; 
        overflow-x: scroll; 
        overflow-y: hidden;
        width:100%;
    }

    .choose *:hover{
        border: 1px solid white;
    }

    h1{
        display: flex;

        justify-content: center;

        position: absolute;
        top: 10%;
        
        font-size: 400%;
    }


    @media only screen and (max-width: 600px){
        main{
            display: flex;

            flex-direction: column;

            justify-content: space-around;
            align-items: center;

            text-align: center;

            position: relative;

            z-index:1;

            width:100vw;
            height: 100vh;
            /*font-family: "Lucida Handwriting", cursive;*/

            position: relative;
            font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

            color: black;
        }

        h1{
            display: flex;

            justify-content: center;

            position: absolute;
            top: 5%;
            
            font-size: 300%;
        }

        .img{
            position: absolute;

            top: 15%;
            left: 40%;

            height: 35%;
            width: 35%;
        }

        .random{
            position: absolute;
            top: 85%;
            left: 15%;
        }

        .options{
            position: absolute;
            top: 85%;
            left: 45%;
        }
        .optionWindow{
            flex-direction: column;
            align-items: center;
            
            z-index:3; 

            row-gap: 5%;

            height:75%; 
            width: 75%; 

            left:15.25%; 
            top:12.5%; 

            padding: 5%;
            
            position:absolute; 
            
            color:white;
            background-color: black; 
            border: solid 1px white;
        }
    }
</style>