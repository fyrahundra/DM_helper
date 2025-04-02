<script>
	import { base } from '$app/paths';
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let w
	let h

	//https://www.w3schools.com/HOWTO/howto_js_get_current_window.asp för funktionen som tar ut måtten
	if(typeof window !== "undefined"){
		w = window.innerWidth
		h = window.innerHeight
	}
	else{
		w = 0
		h = 0
	}

</script>

<slot />

<img class="table" src="https://media.istockphoto.com/id/491606503/sv/foto/overhead-view-of-light-brown-wooden-table.jpg?s=612x612&w=0&k=20&c=s0h3vZr1NNLx8JGJ579qeSQ5x2T5YqfXAo6M6LTGEfA=" alt="">

<svg width="100%" height="100vh" class="bookback">
	<!--https://stackoverflow.com/questions/10177985/svg-rounded-corner pathen är en modifierad version av ett av svaren-->
	<path d="M0,0 h{w/1.99} a10,10 0 0 1 10,10 v{h} a10,10 0 0 1 -10,10 h-{w/1.99} v-{h} z" fill="#000000" stroke="black" stroke-width="3" />
</svg>

<img class="book" style="left: 1.6%;" src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHgxMDU3NDA0LWltYWdlLWpvYjYzMC1mLWwwZzA3N2l6LmpwZw.jpg" alt="">
<img class="book" style="left:1.2%;" src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHgxMDU3NDA0LWltYWdlLWpvYjYzMC1mLWwwZzA3N2l6LmpwZw.jpg" alt="">
<img class="book" style="left:0.8%" src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHgxMDU3NDA0LWltYWdlLWpvYjYzMC1mLWwwZzA3N2l6LmpwZw.jpg" alt="">
<img class="book" style="left: 0.4%;" src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHgxMDU3NDA0LWltYWdlLWpvYjYzMC1mLWwwZzA3N2l6LmpwZw.jpg" alt="">
<img class="book" src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvcHgxMDU3NDA0LWltYWdlLWpvYjYzMC1mLWwwZzA3N2l6LmpwZw.jpg" alt="">

<style>
	/*:global(body), :global(html){
		overflow: hidden;
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
	}*/

	.book{
		height: 100vh;
		width: 49vw;

		top: 0;
		left: 0;

		position: absolute;

		border-radius: 0px 10px 10px;
		border: solid black 1px;
	}

	.table{
		height: 100vh;
		width: 100vw;

		position: absolute;

		top: 0;
		left: 0;
		z-index: -1;
		border-radius: 0px;
	}

	.bookback{
		position: absolute; 
		top:0%;
	}

</style>
