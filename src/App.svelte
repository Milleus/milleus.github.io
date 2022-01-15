<script lang="ts">
  import page from "page";

  import { Paths } from "./paths";
  import About from "./pages/About.svelte";

  const routes = [{ path: Paths.HOME, component: About }];

  let component = null;

  routes.forEach((route) => {
    page(route.path, () => {
      component = route.component;
    });
  });

  page.start();
</script>

<svelte:component this={component} />
