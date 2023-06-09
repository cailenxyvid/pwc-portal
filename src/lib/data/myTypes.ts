export type Event = {
    id: string,
    title: string,
    content: string,
    content_replay: string,
    content_speakers: string,
    content_cpe: string,
    content_meta: string,
    xyp_id: string,
    calendar_id: string,
    event_start: Date,
    status: string,
    image_url: string,  
    hidden: boolean,
    featured: boolean,
    action_guide: string,
    pwc_calendar_link: string,
}

export type MyEvent = {
    attendee: string,
    event: Event
}

export type Profile = {
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    company: string,
    job_title: string,
    job_level: string,
    country: string,
    xyp_attnum: string,
    updated_at: Date,    
}

export interface AssociativeArray {
    [key: string]: any;
 }
// usage:
//  var associative_array: AssociativeArray[] = []
//  associative_array['key'] = 'value'