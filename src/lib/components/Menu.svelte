<script>
    let open = false;
    let toggle = () => { open = !open }
</script>
<div class="hamburger-container relative">
    <button on:click={toggle}><i class="fa fa-bars"></i></button>
    {#if open}
    <div class="absolute bg-white w-auto right-0 p-6 rounded-sm space-y-2">        
        <a href="/">Upcoming Events</a>
        <a href="/">Past Events</a>
        <a href="/">Our Speakers</a>
        <a href="/">About Us</a>        
        <a href="/">Past Events</a>
        <a href="/">Help</a>
    </div>
    {/if}
</div>