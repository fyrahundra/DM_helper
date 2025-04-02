<script>
	import { error } from "@sveltejs/kit";
	import { onMount } from "svelte";

    let currentPage = 0

    let items = []

    onMount(() => {
        getInfo("spells")
    })

    function page(){
        let filter1 = []
        let result = []
        let filter2 = []
        for(let j = 1; j <= items.length; j++){
            filter1.push(items[j-1])
            filter1 = filter1
            if(j%24 == 0){
                result.push(filter1)
                result = result
                filter1 = []
            }
            else if(j >= 312){
                filter2.push(items[j-1])
            }
        }
        result.push(filter2)
        result = result
        filter2 = []
        items = [...result]
    }

    async function getInfo(target) {
        const respons = await fetch("https://www.dnd5eapi.co/api/" + target)

        if(respons.status != 200){
            throw error(respons.status, {message: respons.statusText})
        }

        const data = await respons.json()

        items = Array.isArray(data.results)? [...data.results] : []

        page()
    }

    function spellInfo(target){
        return null
    }

//temp funktioner
    function add(){
        currentPage += 1

        if (currentPage < 0){
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
    <h1>Monsters and Spells</h1>
    
    <div class="grid">
            {#if items[currentPage]}
                {#each items[currentPage] as item}
                    <button on:mousedown={spellInfo(item)} class="item">{item.name}</button>
                {/each}
            {/if}
            
    </div>
    <button on:click={add}>+</button>
    <button on:click={sub}>-</button>
    
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

    h1{
        display: flex;

        justify-content: center;

        margin-top: 10%;
        
        font-size: 350%;
    }

    div{
        display: flex;

        justify-content: center;
    }

    .item{
        font-weight: 600;
    }

    
    .grid {
        display: grid;
        
        width: 100%;
        min-height: auto;
        height: 75%;

        margin-top: 10%;

        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: minmax(50px, auto);

        row-gap: 10%;
        column-gap: 2.5%;

        text-align: center;
    }

    .grid > * {
        max-height: 100%;
    }

</style>