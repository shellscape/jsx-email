<script>
  import { onMount } from 'svelte';

  let changelogItems = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch('/api/contributions.json');
      if (!response.ok) throw new Error('Failed to fetch data');
      changelogItems = await response.json();
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  });
</script>

<div class="bg-base-200 p-6 rounded-lg">
  <h2 class="text-2xl font-bold mb-4">Changelog</h2>
  <p class="mb-4">Explore the latest contributions to jsx-email</p>
  <a
    href="https://github.com/shellscape/jsx-email/pulls?q=is%3Apr+is%3Aclosed"
    class="btn btn-primary mb-6">View on Github</a
  >

  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p class="text-error">Error: {error}</p>
  {:else}
    <ul class="timeline timeline-vertical">
      {#each changelogItems as item, index}
        <li>
          <div class="timeline-start">{new Date(item.date).toLocaleDateString()}</div>
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-5 h-5"
              ><path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              /></svg
            >
          </div>
          <div class="timeline-end timeline-box">
            <div class="flex items-center mb-2">
              <img src={item.avatar} alt={item.author} class="w-6 h-6 rounded-full mr-2" />
              <span class="font-semibold">{item.author}</span>
            </div>
            <p class="text-sm">{item.description}</p>
            <a href={item.url} class="text-xs text-primary">#{item.number}</a>
          </div>
          {#if index !== changelogItems.length - 1}
            <hr />
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>
