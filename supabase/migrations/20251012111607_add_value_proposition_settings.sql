/*
  # Add Value Proposition Settings

  1. Changes
    - Add new site_settings entries for value proposition content
    - These settings control the three value proposition cards displayed on the home page
    
  2. Settings Added
    - value_prop_1_title: Title for first value proposition
    - value_prop_1_description: Description for first value proposition
    - value_prop_2_title: Title for second value proposition
    - value_prop_2_description: Description for second value proposition
    - value_prop_3_title: Title for third value proposition
    - value_prop_3_description: Description for third value proposition
*/

-- Insert value proposition settings
INSERT INTO site_settings (key, value) VALUES
  ('value_prop_1_title', 'Buyers Agent'),
  ('value_prop_1_description', 'Our commitment to your success extends beyond the final acquisition. We conduct thorough market analysis to ensure your satisfaction, provide comprehensive due diligence, and offer ongoing support for warranty claims, maintenance, and seller negotiations.'),
  ('value_prop_2_title', 'Property Developer'),
  ('value_prop_2_description', 'We specialize in creating bespoke developments that maximize value and deliver exceptional returns. Our end-to-end development service includes site acquisition, design consultation, planning approvals, and project management to bring your vision to life.'),
  ('value_prop_3_title', 'Luxury Club'),
  ('value_prop_3_description', 'Exclusive membership providing access to off-market opportunities, private viewings, and premium investment insights. Our luxury club members receive priority access to high-yield properties and bespoke investment strategies tailored to their portfolio goals.')
ON CONFLICT (key) DO NOTHING;