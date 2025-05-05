// src/routes/devblog/[slug]/+page.js

export const prerender = false;

  /*@type {import('./$types').PageLoad}   
  export async function load({ params }) {
  const post = await import("../"+params.slug+ ".svx");

  const { title, date } = post.metadata;
  const content = post.default;

  return {
    content,
    title,
    date,
  };
};*/

// Load all .svx files in the directory
const posts = import.meta.glob('../*.svx');

export async function load({ params }) {
  const path = `../${params.slug}.svx`;
  
  const loader = posts[path];
  if (!loader) {
    throw new Error(`Post not found: ${params.slug}`);
  }

  const post = await loader();

  const { title, date } = post.metadata;
  const content = post.default;

  return {
    content,
    title,
    date,
  };
}
