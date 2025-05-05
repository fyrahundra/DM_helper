<!--Keys: 
    "fullItem" - data with all information
-->

<script>
	import { error } from "@sveltejs/kit";
	import { onMount } from "svelte";

    let currentPage = 0

    let items = []

    let orgItems = []
    
    let fullList = []

    let orgFull = []

    let selector = "monsters"

    let info

    let descReveal = false

    let visible = "none"
    
    let check = ""

    let rotation = "-"

    let loading = true

    

    // a är en temporär variabel för kort animationen
    let a = false
    

    onMount(() => {
        const fetchData = async () => {
            items = await getInfo(selector)

            if(selector == "spells"){
                const fullSpellsRaw = localStorage.getItem("fullSpellItems");
                if(fullSpellsRaw == "[]" || !fullSpellsRaw){
                    fullList = await getFullDetails(items)
                } else{
                    fullList = JSON.parse(fullSpellsRaw)
                    console.log("Local full list", fullList)
                }

                orgFull = fullList
                localStorage.setItem("fullSpellItems", JSON.stringify(orgFull))
                orgItems = items

                console.log("is it a list", Array.isArray(fullList))
                console.log("Full list result:", fullList)
                console.log("Result:", items)
                page(items)
                loading = false
            }

            if(selector == "monsters"){
                const fullMonstersRaw = localStorage.getItem("fullMonsterItems");
                if(!fullMonstersRaw || fullMonstersRaw == "[]"){
                    fullList = await getFullDetails(items)
                } else{
                    fullList = JSON.parse(fullMonstersRaw)
                    console.log("Local full list", fullList)
                }

                orgFull = fullList
                localStorage.setItem("fullMonsterItems", JSON.stringify(orgFull))
                orgItems = items

                console.log("is it a list", Array.isArray(fullList))
                console.log("Full list result:", fullList)
                console.log("Result:", items)
                page(items)
                loading = false
            }
            
        }        
        fetchData()
    })

    function page(array){
        let pageSize = 24
        let result = []

        for(let j = 0; j < array.length; j += pageSize){
            result.push(array.slice(j, j + pageSize))
        }

        items = [...result]
        console.log(items)
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
    }

    async function getFullDetails(array) {
        const baseURL = "https://www.dnd5eapi.co"; // the base API URL

        // Create an array of promises to fetch each detail
        const detailPromises = array.map(item => {
            console.log("Fetching details for:", item.url);
            return fetch(baseURL + item.url)
                .then(res => {
                    if (!res.ok) throw new Error(`Failed to fetch ${item.url}`);
                    return res.json();
                });
        });

        // Wait for all fetches to complete
        const fullDetails = await Promise.all(detailPromises);

        return fullDetails;
    }


    async function spellInfo(target){
        info = await getInfo(selector + "/" + target.index)
        console.log("Info gotten",info)
        descReveal = false

        if(Math.random() > 0.5){
            rotation = ""
        } else{
            rotation = "-"
        }
        
        if(target.name != check || check == ""){
            a = false
            setTimeout(function(){
                a = true
            }, 10)
        }
        
        
        check = target.name
    }

    async function filterSearch(specifikParam,param){
        items = orgItems
        console.log("filtering...")
        console.log("unfiltered lsit", items)

        const allItems = items.flat()
        
        if(param == "level"){
            const outPut1 = allItems.filter(item => {
                return item.level === specifikParam;
            });

            console.log("filtered list:", items)
            page(outPut1)
        }
        if(param == "components"){
            const outPut2 = fullList.filter(item => {
                return item.components.includes(specifikParam)
            })

            console.log("filtered list:", outPut2)
            page(outPut2)
        }

        if(param == "sizes"){
            const outPut2 = fullList.filter(item => {
                return item.size === specifikParam
            })

            console.log("filtered list:", outPut2)
            page(outPut2)
        }
        
    }

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
        <div class="toggle">
            <button on:click={()=>{visible = "flex"}}>
                Filter
            </button>

            <svg width="100vw" height="100%" style="position: absolute; opacity:0.5; z-index:1; top:0; left:0; display:{visible};">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <rect width="100%" height="100%" style="fill:#000000;" on:click={()=>{visible = "none"}}/>
            </svg>

            <section class="options" style=" display:{visible};">
                {#if (selector=="spells")}
                    <h1>Filter for spells</h1>

                    <section style="text-align: center; width:100%;">
                        <h2 >Level:</h2>
                        <div style="width:100%; display: flex; flex-direction:row; justify-content:space-evenly;">
                            {#each Array(10) as option, i}
                                <button on:click={()=>{filterSearch(i,"level")}}>{i}</button>
                            {/each}
                        </div>
                    </section>

                    <section style="text-align: center; width:100%;">
                        <h2 >Component:</h2>
                        <div style="width:100%; display: flex; flex-direction:row; justify-content:space-evenly;">
                            {#each ["V","S","M"] as component}
                                <button on:click={()=>{filterSearch(component, "components")}}>{component}</button>
                            {/each}
                        </div>
                    </section>
                {/if}

                {#if (selector=="monsters")}
                    <h1>Filter for monsters</h1>

                    <section style="text-align: center; width:100%;">
                        <h2 >Size:</h2>
                            <div style="width:100%; display: flex; flex-direction:row; justify-content:space-evenly;">
                                {#each ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"] as size}
                                    <button on:click={()=>{filterSearch(size,"sizes")}}>{size}</button>
                                {/each}
                            </div>
                    </section>
                {/if}
                    

                    <button on:click={()=>{page(orgItems)}}>Reset</button>

                    <button on:click={()=>{visible="none"}}>Done</button>
            </section>

            <button style="display:flex; border: solid 2px black; width:50%; justify-content:center;" on:click={() => 
                {   
                    a = false
                    if(selector == "spells"){
                        selector = "monsters"
                    }
                    else if(selector == "monsters"){
                        selector = "spells"
                    }

                    console.log("Current selector", selector)

                    const fetchData = async () => {
                        items = await getInfo(selector)

                        if(selector == "spells"){
                            const fullSpellsRaw = localStorage.getItem("fullSpellItems");
                            if(fullSpellsRaw == "[]" || !fullSpellsRaw){
                                fullList = await getFullDetails(items)
                            } else{
                                fullList = JSON.parse(fullSpellsRaw)
                                console.log("Local full list", fullList)
                            }

                            orgFull = fullList
                            localStorage.setItem("fullSpellItems", JSON.stringify(orgFull))
                            orgItems = items

                            console.log("is it a list", Array.isArray(fullList))
                            console.log("Full list result:", fullList)
                            console.log("Result:", items)
                            page(items)
                            loading = false
                        }

                        if(selector == "monsters"){
                            const fullMonstersRaw = localStorage.getItem("fullMonsterItems");
                            if(!fullMonstersRaw || fullMonstersRaw == "[]"){
                                fullList = await getFullDetails(items)
                            } else{
                                fullList = JSON.parse(fullMonstersRaw)
                                console.log("Local full list", fullList)
                            }

                            orgFull = fullList
                            localStorage.setItem("fullMonsterItems", JSON.stringify(orgFull))
                            orgItems = items

                            console.log("is it a list", Array.isArray(fullList))
                            console.log("Full list result:", fullList)
                            console.log("Result:", items)
                            page(items)
                            loading = false
                        }
                        
                    }        
                    fetchData()
                    }
                }>
                    <span style="background-color: {selector == "monsters"?"black":""}; color: {selector == "monsters"?"white":"black"}">Monsters</span> 
                    <span style="background-color: {selector == "spells"?"black":""}; color: {selector == "spells"?"white":"black"}">Spells</span>
                </button>
                
                
        </div>
        
        <div class="grid">
                {#if loading}
                    <p>Loading info...</p>
                {:else if items.length > 0 && Array.isArray(items[currentPage])}
                    {#each items[currentPage] as item}
                        <button on:mousedown={() => spellInfo(item)} class="item">{item.name}</button>
                    {/each}
                {:else}
                    <p>Failed to load</p>
                {/if} 

        </div>
        <div class="turn">
            <button on:click={sub}>←</button>
            <p>{currentPage+1}/{items.length}</p>
            <button on:click={add}>→</button>
        </div>
    </section>
    
    <section class={a?"page":""} style="rotate: {rotation}{Math.random()*5}deg;">
        <article class={a?"info":""}>
            {#if (info)}
                {#each info as target}
                <!--Lägg in informationen för monstret/spellen-->
                    <h2>{target.name}</h2>
                    <br>
                    {#if (selector == "spells")}
                        <h3>Duration: {target.duration}</h3>
                        <br>
                        <h3>Cast time: {target.casting_time}</h3>
                        <br>
                        <h3>Description:</h3>
                        <p><button on:click={() => {
                            descReveal = !descReveal
                        }}>{descReveal?target.desc:"..."}</button></p>
                        <br>
                        <h3>Level: {target.level}</h3>
                        <br>
                        <h3>Components: {target.components}</h3>
                    {/if}
                    {#if (selector == "monsters")}
                        <h3>Type: {target.type}</h3>
                        {#if (target.subtype)}
                            <h2>Subtype: {target.subtype}</h2>
                        {/if}
                        <br>
                        <h3>Size: {target.size}</h3>
                        <br>
                        {#if target.armor_class && target.armor_class.length > 0}
                            <h3>AC({target.armor_class[0].type}): {target.armor_class[0].value}</h3>
                        {:else}
                            <h3>Unknown</h3>
                        {/if}
                        
                        
                        <br>
                        <section style="display: flex; flex-direction:column; flex-wrap:wrap;">
                            <h3>Strength: {target.strength}</h3>
                            <h3>Dexterity: {target.dexterity}</h3>
                            <h3>Constitution: {target.constitution}</h3>
                            <h3>Intelligence: {target.intelligence}</h3>
                            <h3>Wisdom: {target.wisdom}</h3>
                            <h3>Charisma: {target.charisma}</h3>
                        </section>
                    {/if}
                {/each}
            {/if}
        </article>
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

    .page{
        max-height: 75%;
		height: 65%;
		width: 50%;

		top: 15%;
		left: 125%;

		position: absolute;

		border-radius: 10px;
		border: solid black 1px;
        background-color: whitesmoke;

        animation-name: dropCard;
        animation-duration: 250ms;
        animation-timing-function:linear;
	}

    .info{
        text-align: center; 
        position:absolute; 
        top:0; 
        width:100%; 
        height:100%;
        overflow-y: scroll;
    }

    .container{
        display: flex;

        flex-direction: column;

        align-items: center;

        width: 100%;
        height: 100%;
    }

    .toggle{
        display:flex;
        flex-direction:row;
        justify-content: center;
        justify-content: space-evenly;

        margin-top: 5%;

        width: 100%;

    }
    span{
        width: 50%;
    }

    .item{
        font-weight: 600;
    }

    
    .grid {
        display: grid;
        
        width: 100%;
        min-height: auto;
        height: 75%;

        margin-top: 0%;

        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: minmax(50px, auto);

        row-gap: 5%;
        column-gap: 2.5%;

        text-align: center;
    }

    .grid > * {
        max-height: 100%;
    }

    .info > *{
        width: 100%;
    }

    .turn{
        display: flex;
        flex-direction: row;

        width: 100%;

        justify-content: space-around;
        font-size: large;
        font-weight: bold;
    }

    .options{
        flex-direction: column;
        align-items: center;
        
        z-index:2; 

        row-gap: 10%;

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

    /*Animationer*/

    @keyframes dropCard{
        0%{transform: scale(5.0);}
        100%{transform: scale(1.0)}
    }

</style>