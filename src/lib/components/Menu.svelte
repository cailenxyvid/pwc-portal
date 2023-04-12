<script>
    let open = false;
    let toggle = () => { open = !open }
</script>
<div class="hamburger-container relative md:hidden">
    <button on:click={toggle}><i class="fa fa-bars"></i></button>
    {#if open}
    <div class="absolute bg-white w-48 right-0 p-6 rounded-sm space-y-2">        
        <a class="block" href="/">Upcoming Events</a>
        <a class="block" href="/replay">Past Events</a>
        <a class="block" href="/speakers">Our Speakers</a>
        <!-- <a class="block" href="/about">About Us</a>                 -->
        <a class="block" href="/help">Help</a>
    </div>
    {/if}
</div>