<script>
	import { base } from "$app/paths";

</script>

<main>
    <div>
        <h1>DM Helper</h1>

        <section>
            <a href="{base}/Search" style="margin-top:20%"><span>Monsters and Spells</span></a>

            <a href="{base}/NPC"><span>NPC-generator</span></a>
    
            <a href="{base}/Notes"> <span>Notes</span></a>

            <a href="{base}/devblog"><span>Devblog</span></a>
        </section>
    </div>
</main>

<style>
    main{
        position: relative;

        z-index:1;

        width:49vw;
        height: 100vh;
        font-family: "Lucida Handwriting", cursive;
        color: black;
    }

    section{
        display: flex;

        flex-direction: column;

        align-items: center;
    }

    h1{
        display: flex;

        justify-content: center;

        margin-top: 10%;
        
        font-size: 500%;
    }
    
    a{
        font-size: xx-large;

        width: fit-content;

        margin-top: 15%;
    }

    span:hover{
        color: white;

        border-bottom: 2px solid black;
    }
</style>