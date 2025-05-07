<script>
	import { onMount } from "svelte";

    let rolls = []
    let highRoll
    let mod = 0

    let abilityScr = []
    let abilityMod = []

    let races = []
    let classes = []

    const ability = ["Str", "Dex", "Con", "Int", "Wis", "Cha"] 

    onMount(()=>{
        const fetchData = async()=> {
            races = await getInfo("races")
            classes = await getInfo("classes")

            console.log("Races:", races, "\nClasses", classes)
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
            console.log("Mod:", abilityMod)
        })
    }

    function randomRace(){
        
    }

    function randomClass(){

    }

    randomScore()
    scoreConvert()
</script>

<main>
    <h1>NPC-generator</h1>

    <section>
        <article>
            {#each abilityScr as score}
                {score.stat}
                {score.score}
            {/each}
            <br>
            <br>
            {#each abilityMod as mod}
                {mod.stat}
                {#if mod.score > 0}
                    + {mod.score}
                    {:else}
                    - {mod.score}
                {/if}
            {/each}
            <br>
            <br>
            {#if races != []}
                {#each races as race}
                    {race.name}
                {/each} 
            {/if}

            {#if classes != []}
                {#each classes as Class} <!--Stort C genom att class är en redan existerande funktion i JavaScript-->
                    {Class.name}
                {/each} 
            {/if}
            
        </article>
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
        font-family: "Lucida Handwriting", cursive;
        color: black;
    }

    article{
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    h1{
        display: flex;

        justify-content: center;

        margin-top: 10%;
        
        font-size: 400%;
    }
</style>