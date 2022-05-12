<script lang="ts">
  export let href: string;
  export let target: "_self" | "_blank" = "_blank";
</script>

<a class="link" data-type="primary" {href} {target}>
  <slot />
</a>

<style>
  .link[data-type="primary"] {
    color: var(--clr-red-600);
    text-decoration: underline;
  }

  .link[data-type="primary"]:hover,
  .link[data-type="primary"]:focus {
    text-decoration: none;
  }
</style>
