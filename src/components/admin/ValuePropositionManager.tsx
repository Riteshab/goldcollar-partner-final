import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, AlertCircle } from 'lucide-react';

interface ValueProp {
  title: string;
  description: string;
}

export function ValuePropositionManager() {
  const [valueProp1, setValueProp1] = useState<ValueProp>({ title: '', description: '' });
  const [valueProp2, setValueProp2] = useState<ValueProp>({ title: '', description: '' });
  const [valueProp3, setValueProp3] = useState<ValueProp>({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', [
        'value_prop_1_title',
        'value_prop_1_description',
        'value_prop_2_title',
        'value_prop_2_description',
        'value_prop_3_title',
        'value_prop_3_description'
      ]);

    if (error) {
      console.error('Error fetching settings:', error);
    } else if (data) {
      const settings = data.reduce((acc: any, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});

      setValueProp1({
        title: settings.value_prop_1_title || '',
        description: settings.value_prop_1_description || ''
      });
      setValueProp2({
        title: settings.value_prop_2_title || '',
        description: settings.value_prop_2_description || ''
      });
      setValueProp3({
        title: settings.value_prop_3_title || '',
        description: settings.value_prop_3_description || ''
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const updates = [
      { key: 'value_prop_1_title', value: valueProp1.title },
      { key: 'value_prop_1_description', value: valueProp1.description },
      { key: 'value_prop_2_title', value: valueProp2.title },
      { key: 'value_prop_2_description', value: valueProp2.description },
      { key: 'value_prop_3_title', value: valueProp3.title },
      { key: 'value_prop_3_description', value: valueProp3.description }
    ];

    for (const update of updates) {
      const { error } = await supabase
        .from('site_settings')
        .update({ value: update.value })
        .eq('key', update.key);

      if (error) {
        console.error('Error updating setting:', error);
        setMessage('Error saving settings. Please try again.');
        setSaving(false);
        return;
      }
    }

    setMessage('Value propositions updated successfully!');
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Value Propositions</h2>
          <p className="text-gray-600 mt-1">Manage the three value proposition cards displayed on the home page</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-[#8b7355] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#6d5a42] transition disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`flex items-center gap-2 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
          <AlertCircle className="w-5 h-5" />
          <span>{message}</span>
        </div>
      )}

      <div className="grid gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-3xl font-bold text-[#8b7355]/30">1</div>
            <h3 className="text-lg font-bold text-gray-900">First Value Proposition</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={valueProp1.title}
                onChange={(e) => setValueProp1({ ...valueProp1, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b7355]"
                placeholder="e.g., Buyers Agent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={valueProp1.description}
                onChange={(e) => setValueProp1({ ...valueProp1, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b7355]"
                placeholder="Describe this value proposition..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-3xl font-bold text-[#8b7355]/30">2</div>
            <h3 className="text-lg font-bold text-gray-900">Second Value Proposition</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={valueProp2.title}
                onChange={(e) => setValueProp2({ ...valueProp2, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b7355]"
                placeholder="e.g., Property Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={valueProp2.description}
                onChange={(e) => setValueProp2({ ...valueProp2, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b7355]"
                placeholder="Describe this value proposition..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-3xl font-bold text-[#8b7355]/30">3</div>
            <h3 className="text-lg font-bold text-gray-900">Third Value Proposition</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={valueProp3.title}
                onChange={(e) => setValueProp3({ ...valueProp3, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b7355]"
                placeholder="e.g., Luxury Club"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={valueProp3.description}
                onChange={(e) => setValueProp3({ ...valueProp3, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b7355]"
                placeholder="Describe this value proposition..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
