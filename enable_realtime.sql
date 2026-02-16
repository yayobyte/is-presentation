-- Add the table to the supabase_realtime publication to enable WebSocket updates
alter publication supabase_realtime add table public.presentation_state;
