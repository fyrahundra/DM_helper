<script>
	import { onMount } from "svelte";

    let input = ""
    let title = ""

    let noteList = []

    let visible = false
    let saveing = false

    onMount(() => {
        noteList = JSON.parse(localStorage.getItem("note"))
    })

    function toggleDropdown(){
        visible = !visible
    }

    function save(){
        if(input.trim() != ""){
                if(noteList == null){
                    noteList = [{data: input, name: title}]
                }
                else{
                    noteList.push({data: input, name: title})
                    noteList.forEach(note => {
                        console.log(note.name)
                    });
                }
                
                console.log(noteList)

                noteList = noteList

                localStorage.setItem("note", JSON.stringify(noteList))

                title = ""

                saveing = !saveing
            }         
    }

    function load(place){
        const noteListRaw = localStorage.getItem("note")
        console.log(noteListRaw)
        let b = JSON.parse(noteListRaw)[place]
        input = b.data
    }

</script>

<main>
    <h1 class="header">Notes</h1>

    <div class="titleSelect" style="display: {saveing?"flex":"none"};">
        Select a title
        <form on:submit={()=>{save()}}>
            <input style="color: black;" type="text" name="Title" id="Title" bind:value={title}>
        </form>
    </div>

    <section>
        <button on:click={()=>{if(input.trim()!=""){saveing = !saveing}}} class="save">Save</button>

        <button class="loadbox" on:click={()=>{toggleDropdown()}}>Dropdown
            {#if noteList}
                <div class="dropdownContenet" style="display:{visible ? "flex":"none"};">
                        {#each noteList as note, i}
                            <button on:click={() => {load(i)}} class="note">{note.name}</button>
                        {/each}
                </div>
            {/if}
            
        </button>

        <button on:click={()=>{
            noteList = null 
            localStorage.setItem("note", JSON.stringify(noteList))
            input = ""
            title = ""
        }} class="clear">Clear Everything</button>
    </section>
    

    <textarea name="input" id="input" bind:value={input} placeholder="Write your notes here"></textarea>
</main>

<style>
    main{
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;

        z-index:1;

        width:49vw;
        height: 100vh;
        font-family: "Lucida Handwriting", cursive;
        color: black;

        row-gap: 5%;
    }   
    
    .header{
        margin-top: 10%;
        
        font-size: 350%;
    }

    section{
        display: flex;
        flex-direction: row;

        width: 80%;

        justify-content: space-evenly;
    }

    .save, .loadbox{
        border: solid 2px black;
        width: 50%;
    }

    .clear{
        border: solid 2px black;
        width: 25%;
    }

    .clear:active{
        background-color: red;
    }

    .save:active, .dropdownContenet *:active{
        background-color: white;
    }

    textarea{
        width: 80%;
        height: 60%;
    }

    .loadbox{
        position: relative;
        display: inline-block;
    }

    .dropdownContenet{
        flex-direction: column;
        position: absolute;

        border: solid 2px black;
        background-color: white;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

        width: 100%;
        max-height: 200%;

        overflow-y: scroll;

        z-index: 1;
    }

    .titleSelect{
        position: absolute;

        flex-direction: column;

        left:50%;
        top:40%;

        width: 100%;
        height: 10%;

        padding: 10%;

        background-color: black;
        color: white;
    }

    .note{
        overflow: hidden;
    }

    .note:hover{
        background-color: rgb(217, 217, 217);
    }
</style>

