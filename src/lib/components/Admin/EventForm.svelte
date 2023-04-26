<script lang="ts">
    import type { Event } from "$lib/data/myTypes";

    export let event: Event = {
        id: '',
        title: '',
        content: '',
        content_replay: '',
        xyp_id: '',
        calendar_id: '',
        event_start: new Date(),
        status: '', 
    };

    let dateString: string;
    $: dateString = new Date(event.event_start).toISOString(); console.log(dateString)
</script>

<div class="card p-4">
    <form action="/xyp/event{ event.id ? '/' + event.id : ''}" method="post" class="space-y-8">
        <!-- <input type="hidden" bind:value={event.id} name="id" /> -->
        <div>
            <button type="submit" class="variant-filled-primary p-1 rounded-sm">Save</button>
        </div>
        <div>
            <label class="label">
                <span>Event Title</span>
                <input type="text" class="input" bind:value={event.title} name="title">
            </label>            
        </div>
        <div>
            <label class="label">
                <span>Event Date</span>
                <!-- <input type="date" id="" name="event_start">
                <input type="time" id="" name="event_time"> -->
                <input type="datetime-local" bind:value={dateString} id="event_start" name="event_start" />
            </label>            
        </div>
        <div>
            <label class="label">
                <span>Event Status</span>
                <select name="status" id="" class="select" bind:value={event.status}>
                    <option value="pending">Pending</option>
                    <option value="replay">Replay</option>
                </select>
            </label>            
        </div>
        <div>
            <label class="label">
                <span>Xyvid Event ID</span>
                <input required type="text" name="xyp_id" class="input" bind:value={event.xyp_id}>
            </label>            
        </div>
        <div>
            <label class="label">
                <span>Event Pending Content</span>
                <textarea class="w-full h-48" name="content" bind:value={event.content}></textarea>
            </label>            
        </div>
        <div>
            <label class="label">
                <span>Event Replay Content</span>
                <textarea class="w-full h-48" name="content_replay" bind:value={event.content_replay}></textarea>
            </label>            
        </div>
    </form>
</div>