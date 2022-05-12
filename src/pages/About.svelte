<script lang="ts">
  import Link from "../base-components/Link.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<svelte:head>
  <title>Dave Quah | About</title>
</svelte:head>

<div class="about-me grid">
  <main class="container space-y">
    <h1 class="text-neutral-600 fs-700 fw-800 ls-tight">About Me</h1>
    <p>
      Hi there! 👋 My name is Dave and I'm a software Dave-loper (pun intended)
      from Singapore 🇸🇬.
    </p>
    <p>
      I enjoy front-end development. I love coding with CSS, experimenting with
      CSS animations and exploring upcoming web technologies such as new CSS
      properties and browser APIs.
    </p>
    <p>
      I'm currently working at
      <Link href="https://www.hive.tech.gov.sg/">GDS Hive</Link> which is part of
      <Link href="https://www.tech.gov.sg/">GovTech</Link> where we're engineering
      digital government and making lives better. Some of the projects that I've
      been involved in are:
    </p>
    <ul>
      <li>Immigrations and Checkpoints Authority (ICA) e-Services</li>
      <li>COVID-19 GoWhere websites</li>
      <li>HDB Resale Portal</li>
      <li>Moments of Life (MOL) mobile application</li>
      <li>Whole of Government Analytics Application (WOGAA)</li>
    </ul>
    <p>
      I'm currently learning more about
      <Link href="https://cube.fyi/">CUBE CSS</Link>,
      <Link href="https://svelte.dev/">Svelte</Link> and
      <Link href="https://www.a11yproject.com/">web accessibility</Link>.
    </p>
  </main>

  <Footer />
</div>

<style>
  .about-me {
    --grid-gap: 6rem;
    grid-template-rows: 1fr auto;
    min-height: 100vh;
  }

  .about-me > main {
    margin-top: 6rem;
  }
</style>
