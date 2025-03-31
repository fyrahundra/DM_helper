<script>
    let test = []
    let currentPage = 0

    for(let i = 0; i <= 100; i++){
        test.push(i)
        test = test
    }

    function page(){
        let filter = []
        let result = []
        for(let j = 1; j <= test.length; j++){
            filter.push(test[j])
            filter = filter
            if(j%5 == 0){
                result.push(filter)
                result = result
                filter = []
            }
        }
        test = result
        console.log(test)
    }
    function changePage(){
        if(currentPage > 20){
            currentPage = 20
        }
        if(currentPage < 0){
            currentPage = 0
        }
    }
    
    page()

</script>



<main>
    <h1>Monsters and Spells</h1>
    <input type="number" on:click={changePage} bind:value={currentPage}>
    <div class="grid">
            {#each test[currentPage] as item}
                <p>{item}</p>
            {/each}
    </div>
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

    .grid{
        display: grid;

        justify-content: center;

        overflow: hidden;

        margin-top: 10%;

        width: 100%;

        grid-template-columns: repeat(3,1fr);
        grid-template-rows: repeat(5,1fr);

        grid-auto-rows: 0;

        row-gap: 0.5%;
        column-gap: 2.5%;

        text-align: center;
    }
</style>