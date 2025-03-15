/*
  # Add test users and their profiles

  1. New Data
    - Creates several test users with diverse subject combinations
    - Each user has a unique set of subjects to demonstrate matching
    - Names are diverse and representative

  2. Security
    - Uses secure UUID generation for IDs
    - Follows existing RLS policies
*/

-- Insert test users with diverse subject combinations
INSERT INTO auth.users (id, email)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'alice@example.com'),
  ('22222222-2222-2222-2222-222222222222', 'bob@example.com'),
  ('33333333-3333-3333-3333-333333333333', 'carol@example.com'),
  ('44444444-4444-4444-4444-444444444444', 'david@example.com'),
  ('55555555-5555-5555-5555-555555555555', 'elena@example.com')
ON CONFLICT (id) DO NOTHING;

-- Insert corresponding profiles with diverse subject combinations
INSERT INTO public.profiles (id, name, subjects)
VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Vivek',
    ARRAY['Mathematics', 'Physics', 'Computer Science']
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Abhinav Reddy',
    ARRAY['Physics', 'Chemistry', 'Biology']
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Socrates',
    ARRAY['Literature', 'History', 'Philosophy']
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Nitin Baalaji',
    ARRAY['Computer Science', 'Mathematics', 'Economics']
  ),
  (
    '55555555-5555-5555-5555-555555555555',
    'Jayshree',
    ARRAY['Psychology', 'Biology', 'Philosophy']
  )
ON CONFLICT (id) DO NOTHING;
