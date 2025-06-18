/*
  # Create sensitivity configurations table

  1. New Tables
    - `sensitivity_configs`
      - `id` (uuid, primary key)
      - `nickname` (text, player nickname)
      - `game` (text, PUBG or FreeFire)
      - `device` (text, device level: Fraco/Médio/Forte)
      - `role` (text, team role: Rush/Suporte/AWM)
      - `aim_style` (text, aim style: Rápida/Precisa)
      - `sensitivity_general` (integer, general sensitivity)
      - `sensitivity_red_dot` (integer, red dot sensitivity)
      - `sensitivity_2x` (integer, 2x scope sensitivity)
      - `sensitivity_4x` (integer, 4x scope sensitivity)
      - `sensitivity_awm` (integer, AWM sensitivity)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `sensitivity_configs` table
    - Add policy for public read/write access (since this is a public calculator)
*/

CREATE TABLE IF NOT EXISTS sensitivity_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname text NOT NULL,
  game text NOT NULL CHECK (game IN ('PUBG', 'FreeFire')),
  device text NOT NULL CHECK (device IN ('Fraco', 'Médio', 'Forte')),
  role text NOT NULL CHECK (role IN ('Rush', 'Suporte', 'AWM')),
  aim_style text NOT NULL CHECK (aim_style IN ('Rápida', 'Precisa')),
  sensitivity_general integer NOT NULL CHECK (sensitivity_general >= 0 AND sensitivity_general <= 100),
  sensitivity_red_dot integer NOT NULL CHECK (sensitivity_red_dot >= 0 AND sensitivity_red_dot <= 100),
  sensitivity_2x integer NOT NULL CHECK (sensitivity_2x >= 0 AND sensitivity_2x <= 100),
  sensitivity_4x integer NOT NULL CHECK (sensitivity_4x >= 0 AND sensitivity_4x <= 100),
  sensitivity_awm integer NOT NULL CHECK (sensitivity_awm >= 0 AND sensitivity_awm <= 100),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sensitivity_configs ENABLE ROW LEVEL SECURITY;

-- Allow public access for this calculator app
CREATE POLICY "Allow public read access"
  ON sensitivity_configs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access"
  ON sensitivity_configs
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create index for better performance when querying by game and created_at
CREATE INDEX IF NOT EXISTS idx_sensitivity_configs_game_created 
  ON sensitivity_configs(game, created_at DESC);

-- Create index for nickname searches
CREATE INDEX IF NOT EXISTS idx_sensitivity_configs_nickname 
  ON sensitivity_configs(nickname);