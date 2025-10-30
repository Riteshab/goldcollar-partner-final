/*
  # Remove Hero Video URL from Site Settings

  ## Changes
  1. Delete the hero_video_url setting from site_settings table
  
  ## Reason
  The hero video URL is now hardcoded in the source code and no longer needs to be managed through the admin interface.
*/

DELETE FROM site_settings WHERE key = 'hero_video_url';
