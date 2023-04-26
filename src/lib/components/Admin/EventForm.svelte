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
    
    const convertDate = (db_date:Date) => {
        let myDate = new Date(event.event_start);
        myDate.setMinutes(myDate.getMinutes() - myDate.getTimezoneOffset());
        myDate.setSeconds(0,0)
        return myDate.toISOString().slice(0, -1);
    }
    
    let dateString = convertDate(event.event_start)
</script>

<div class="card p-4">
    <form action="/xyp/event{ event.id ? '/' + event.id : ''}" method="post" class="space-y-8">
        <!-- <input type="hidden" bind:value={event.id} name="id" /> -->
        <div>
            <button type="submit" class="variant-filled-primary p-2 rounded-sm">
                <i class="fa fa-save"></i>
                Save
            </button>
        </div>
        <div>
            <label class="label">
                <span>Event Title</span>
                <input type="text" class="input" bind:value={event.title} name="title" required>
            </label>            
        </div>
        <div>
            <label class="label">
                <span>Event Date</span>                
                <input type="datetime-local" class="input" bind:value={dateString} id="event_start" name="event_start" />
            </label>            
        </div>
        <div>
            <label class="label">
                <span>Event Status</span>
                <select name="status" id="" class="select" bind:value={event.status} required>
                    <option value="pending">Pending</option>
                    <option value="replay">Replay</option>
                </select>
            </label>            
        </div>
        <div>
            <label class="label">
                <span>Xyvid Event ID</span>
                <input type="text" name="xyp_id" class="input" bind:value={event.xyp_id} required>
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