<script>
	import { error } from "@sveltejs/kit";
	import { onMount } from "svelte";

    let currentPage = 0

    let items = []

    let selector = "spells"

    onMount(() => {
        items = getInfo(selector)
        console.log("Result:", items)
    })

    function page(array){
        let filter1 = []
        let result = []
        let filter2 = []
        for(let j = 1; j <= array.length; j++){
            filter1.push(array[j-1])
            filter1 = filter1
            if(j%24 == 0){
                result.push(filter1)
                result = result
                filter1 = []
            }
            else if(j >= 312){
                filter2.push(array[j-1])
            }
        }
        result.push(filter2)
        result = result
        filter2 = []
        array = [...result]
    }

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

        //items = Array.isArray(data.results)? [...data.results] : data
    }

    async function spellInfo(target){
        await getInfo(selector + "/" + target.index)
    }

//temp funktioner
    function add(){
        currentPage += 1
        if(currentPage+1 > items.length){
            currentPage = items.length-1
        }
        if(currentPage < 0){
            currentPage = 0
        }
    }
    function sub(){
        currentPage -= 1
        if (currentPage < 0){
            currentPage = 0
        }
    }
</script>



<main>
    <h1 class="header">Monsters and Spells</h1>
    
    <section class="container">
        <button on:mousedown={() => 
        {   
            if(selector == "spells"){
                selector = "monsters"
            }
            else if(selector == "monsters"){
                selector = "spells"
            }
            getInfo(selector)
        }
        }>
            {selector}
        </button>
        <div class="grid">
            {#if items[currentPage]}
                {#each items[currentPage] as item}
                    <button on:mousedown={spellInfo(item)} class="item">{item.name}</button>
                {/each}
            {/if}
        </div>
        <div class="turn">
            <button on:click={sub}>←</button>
            <p>{currentPage+1}/{items.length}</p>
            <button on:click={add}>→</button>
        </div>
    </section>
    
</main>

<style>
    main{
        position: absolute;

        z-index:1;

        width:49vw;
        height: 100vh;
        font-family: "Lucida Handwriting", cursive;
        color: black;
    }

    .header{
        display: flex;

        justify-content: center;

        margin-top: 10%;
        
        font-size: 350%;
    }

    .container{
        display: flex;

        flex-direction: column;

        width: 100%;
        height: 100%;
    }



    .item{
        font-weight: 600;
    }

    
    .grid {
        display: grid;
        
        width: 100%;
        min-height: auto;
        height: 75%;

        margin-top: 5%;

        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: minmax(50px, auto);

        row-gap: 5%;
        column-gap: 2.5%;

        text-align: center;
    }

    .grid > * {
        max-height: 100%;
    }

    .turn{
        display: flex;
        justify-content: space-around;
        font-size: large;
        font-weight: bold;
    }
</style>
