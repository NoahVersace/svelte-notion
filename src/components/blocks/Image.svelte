<script lang="ts">
  import type BlockImage from "../../models/blocks/image";
  import { blockToImageUrl } from "../../utils";
  import FormattedText from "./components/FormattedText.svelte";

  export let block: BlockImage;

  const imageUrl = blockToImageUrl(block);
  const caption = block?.properties?.caption;

  // To adjust fullWidth cases where the image/figure is given the whole width (100vw)
  let fullWidthImageHeight: number;
</script>

<slot />
{#if caption}
  <figure
    class="sotion-figure"
    class:full-width={block.format.block_full_width}
    class:page-width={block.format.block_page_width}
    bind:clientHeight={fullWidthImageHeight}
  >
    <img
      src={imageUrl.toString()}
      class="sotion-image"
      alt="sotion"
      width="{block.format.block_width}px"
    />
    <figcaption class="sotion-figure-caption">
      <FormattedText text={caption} />
    </figcaption>
  </figure>
  {#if block.format.block_full_width}
    <div
      class="sotion-figure-placeholder"
      style="height: {fullWidthImageHeight}px"
    />
  {/if}
{:else}
  <div
    bind:clientHeight={fullWidthImageHeight}
    class:full-width={block.format.block_full_width}
  >
    <img
      src={imageUrl.toString()}
      class="sotion-image"
      width="{block.format.block_width}px"
      class:page-width={block.format.block_page_width}
      alt="sotion"
    />
  </div>
  {#if block.format.block_full_width}
    <div
      class="sotion-image-placeholder"
      style="height: {fullWidthImageHeight}px"
    />
  {/if}
{/if}

<style>
  img {
    max-width: 100%;
  }
  .sotion-figure {
    margin: 0;
    margin-bottom: 20px;
  }

  .full-width img {
    width: 100%;
  }

  .page-width {
    width: 100%;
  }

  .sotion-figure-caption {
    font-style: italic;
  }

  :not(.sotion-figure) .sotion-image {
    margin-bottom: 20px;
  }

  .full-width {
    max-width: 100%;
    width: 100vw !important;
    position: absolute;
    left: 0;
  }
</style>
