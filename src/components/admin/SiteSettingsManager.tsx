import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Video, AlertCircle } from 'lucide-react';

interface Setting {
  id: string;
  key: string;
  value: string;
  description: string;
  updated_at: string;
}

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .order('key');

    if (error) {
      console.error('Error fetching settings:', error);
    } else {
      setSettings(data || []);
    }
    setLoading(false);
  };

  const handleUpdateSetting = async (key: string, value: string) => {
    const updatedSettings = settings.map(s =>
      s.key === key ? { ...s, value } : s
    );
    setSettings(updatedSettings);
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMessage('');

    const user = await supabase.auth.getUser();

    for (const setting of settings) {
      const { error } = await supabase
        .from('site_settings')
        .update({
          value: setting.value,
          updated_at: new Date().toISOString(),
          updated_by: user.data.user?.id
        })
        .eq('key', setting.key);

      if (error) {
        alert('Error saving settings: ' + error.message);
        setSaving(false);
        return;
      }
    }

    setSuccessMessage('Settings saved successfully!');
    setSaving(false);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const getSetting = (key: string) => {
    return settings.find(s => s.key === key);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 mt-4">Loading settings...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage dynamic website content</p>
        </div>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-800">{successMessage}</p>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Video className="w-5 h-5 text-[#8b7355]" />
            <h3 className="text-lg font-semibold text-gray-900">Homepage Settings</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Headline
              </label>
              <input
                type="text"
                value={getSetting('hero_headline')?.value || ''}
                onChange={(e) => handleUpdateSetting('hero_headline', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="Main headline text"
              />
              <p className="text-xs text-gray-500 mt-1">
                Large text displayed at the top of the homepage hero section
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Subheadline
              </label>
              <textarea
                value={getSetting('hero_subheadline')?.value || ''}
                onChange={(e) => handleUpdateSetting('hero_subheadline', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="Supporting text below the headline"
              />
              <p className="text-xs text-gray-500 mt-1">
                Subheading text displayed below the hero headline
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Video className="w-5 h-5 text-[#8b7355]" />
            <h3 className="text-lg font-semibold text-gray-900">Video Settings</h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why Work With Us Video URL
              </label>
              <input
                type="url"
                value={getSetting('why_work_video_url')?.value || ''}
                onChange={(e) => handleUpdateSetting('why_work_video_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="https://res.cloudinary.com/..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Video displayed in the "Why Work With Us" section on the landing page (Cloudinary video URL recommended)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discover Our Approach Video URL
              </label>
              <input
                type="url"
                value={getSetting('approach_video_url')?.value || ''}
                onChange={(e) => handleUpdateSetting('approach_video_url', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="https://example.com/video.mp4 or YouTube URL"
              />
              <p className="text-xs text-gray-500 mt-1">
                Video displayed in the "Discover Our Approach" section on the landing page
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#8b7355] text-white rounded-lg hover:bg-[#6d5a42] transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
