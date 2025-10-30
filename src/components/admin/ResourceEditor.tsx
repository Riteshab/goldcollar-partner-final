import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  file_url: string;
  category: string;
  status: 'draft' | 'published';
}

interface ResourceEditorProps {
  resource: Resource | null;
  onClose: () => void;
}

export default function ResourceEditor({ resource, onClose }: ResourceEditorProps) {
  const [title, setTitle] = useState(resource?.title || '');
  const [description, setDescription] = useState(resource?.description || '');
  const [thumbnailUrl, setThumbnailUrl] = useState(resource?.thumbnail_url || '');
  const [fileUrl, setFileUrl] = useState(resource?.file_url || '');
  const [category, setCategory] = useState(resource?.category || '');
  const [status, setStatus] = useState<'draft' | 'published'>(resource?.status || 'draft');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const resourceData = {
      title,
      description,
      thumbnail_url: thumbnailUrl,
      file_url: fileUrl,
      category,
      status,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (resource) {
      const result = await supabase
        .from('resources')
        .update(resourceData)
        .eq('id', resource.id);
      error = result.error;
    } else {
      const user = await supabase.auth.getUser();
      const result = await supabase
        .from('resources')
        .insert([{ ...resourceData, created_by: user.data.user?.id }]);
      error = result.error;
    }

    if (error) {
      alert('Error saving resource: ' + error.message);
    } else {
      onClose();
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Resources
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {resource ? 'Edit Resource' : 'Create New Resource'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="Enter resource title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="Describe this resource"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="e.g., Guide, Template, Checklist"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File URL *
              </label>
              <input
                type="url"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="https://example.com/file.pdf"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Direct link to downloadable file</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-gray-900">Settings</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {thumbnailUrl && (
                  <img
                    src={thumbnailUrl}
                    alt="Preview"
                    className="mt-2 w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#8b7355] text-white rounded-lg hover:bg-[#6d5a42] transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Resource'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
