<script lang="ts">
    import type { Event } from "$lib/data/myTypes";

    export let event: Event;
    
    let targetStatus = event.status === 'pending' ? 'replay' : 'pending';
</script>

<form method="post" action="?/eventStatus" class="inline-block">
    <input type="hidden" name="id" value={event.id} />
    <input type="hidden" name="targetStatus" value={targetStatus} />
    <div class="btn-group variant-filled-secondary">
        <button title="Mark as pending event" disabled={event.status === 'pending'}>
            <i class="fa-solid fa-video-plus"></i>
        </button>
        <button title="Mark as replay event"  disabled={event.status === 'replay'}>
            <i class="fa-solid fa-file-video"></i>
        </button>            
    </div>
</form>