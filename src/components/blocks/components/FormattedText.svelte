<script lang="ts">
  import KatexEquation from "./KatexEquation.svelte";
  export let text;

  function isLink(segment) {
    return (
      segment[1] && Array.isArray(segment[1]) && segment[1].flat().includes("a")
    );
  }

  function getLink(segment) {
    return segment[1].find((link) => link[0] === "a")[1];
  }

  function classForSegment(segment) {
    return segment[1]?.reduce((prev, [curr]) => {
      switch (curr) {
        case "b": {
          prev += "bold ";
          break;
        }
        case "i": {
          prev += "italic ";
          break;
        }
        case "c": {
          prev += "code ";
          break;
        }
        case "_": {
          prev += "underline ";
          break;
        }
        case "s": {
          prev += "strikethrough ";
        }
      }
      return prev;
    }, "");
  }
</script>

{#each text as segment}
  {#if isLink(segment)}
    <a class={classForSegment(segment)} href={getLink(segment)}>{segment[0]}</a>
  {:else if segment[1] && segment[1][0][0] === "e"}
    <KatexEquation displayMode={false} maths={segment[1][0][1]} />
  {:else}
    <span class={classForSegment(segment)}>{segment[0]}</span>
  {/if}
{/each}
{#if !text}
  <br />
{/if}

<style>
  span {
    white-space: pre-line;
  }

  .bold {
    font-weight: bold;
  }

  .italic {
    font-style: italic;
  }

  .underline {
    text-decoration: underline;
  }

  .strikethrough {
    text-decoration: line-through;
  }

  .underline.strikethrough {
    text-decoration: underline line-through;
  }

  .code {
    background-color: rgb(63, 63, 63);
    padding: 5px 8px;
    border-radius: 5px;
    color: white;
  }
</style>
