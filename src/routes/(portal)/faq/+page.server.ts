import { supabase } from "$lib/data/supabase"

export async function load() {
  const { data } = await supabase.from("faq").select().order('display_order');  
  return {
    faqs: data ?? [],
  };
}