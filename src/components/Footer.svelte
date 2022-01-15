<script lang="ts">
  import Link from "../base-components/Link.svelte";

  const socialLinks = [
    { label: "CodePen", href: "https://codepen.io/Milleus" },
    {
      label: "Frontend Mentor",
      href: "https://www.frontendmentor.io/profile/Milleus",
    },
    { label: "GitHub", href: "https://github.com/Milleus" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/milleus/" },
    { label: "Twitter", href: "https://twitter.com/milleus" },
  ];
</script>

<footer class="bg-neutral-200 fs-300">
  <p>You can also find me at:</p>
  <ul class="flex">
    {#each socialLinks as link}
      <li>
        <Link href={link.href} target="_blank">{link.label}</Link>
      </li>
    {/each}
  </ul>
  <p>&copy; {new Date().getFullYear()} Dave Quah</p>
</footer>

<style>
  footer {
    padding: 3rem;
    text-align: center;
  }

  footer p {
    margin-inline: auto;
  }

  footer > ul {
    list-style: none;
    --flex-gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0;
    margin-block: 0.5rem 2rem;
  }

  /* https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type#accessibility_concerns */
  footer > ul li::before {
    content: "\200B";
  }
</style>
