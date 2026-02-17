-- Create a table to hold the presentation state
create table public.presentation_state (
  id bigint primary key generated always as identity,
  current_slide integer default 0,
  is_exam_started boolean default false,
  exam_start_time bigint,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Insert the initial state (ID=1)
insert into public.presentation_state (id, current_slide, is_exam_started)
overriding system value
values (1, 0, false);

-- Create a table for student exam submissions
create table public.exam_submissions (
  id uuid primary key default gen_random_uuid(),
  student_id text not null,
  student_name text not null,
  answers jsonb not null,
  category_scores jsonb,
  total_score integer,
  submitted_at timestamp with time zone default timezone('utc'::text, now())
);

-- Turn on Row Level Security
alter table public.presentation_state enable row level security;
alter table public.exam_submissions enable row level security;

-- Policies
create policy "Allow generic read access to presentation state"
on public.presentation_state for select
to public
using (true);

create policy "Allow presenter update access"
on public.presentation_state for update
to public
using (true); 

create policy "Allow student submissions"
on public.exam_submissions for insert
to public
with check (true);

create policy "Allow presenter to read submissions"
on public.exam_submissions for select
to public
using (true);
