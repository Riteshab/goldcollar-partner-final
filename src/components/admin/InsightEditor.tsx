import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save } from 'lucide-react';

interface Insight {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  featured_image_url: string;
  status: 'draft' | 'published';
  published_at: string | null;
}

interface InsightEditorProps {
  insight: Insight | null;
  onClose: () => void;
}

export default function InsightEditor({ insight, onClose }: InsightEditorProps) {
  const [title, setTitle] = useState(insight?.title || '');
  const [slug, setSlug] = useState(insight?.slug || '');
  const [content, setContent] = useState(insight?.content || '');
  const [excerpt, setExcerpt] = useState(insight?.excerpt || '');
  const [author, setAuthor] = useState(insight?.author || '');
  const [featuredImageUrl, setFeaturedImageUrl] = useState(insight?.featured_image_url || '');
  const [status, setStatus] = useState<'draft' | 'published'>(insight?.status || 'draft');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!insight && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);
    }
  }, [title, insight]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const insightData = {
      title,
      slug,
      content,
      excerpt,
      author,
      featured_image_url: featuredImageUrl,
      status,
      published_at: status === 'published' && !insight?.published_at ? new Date().toISOString() : insight?.published_at,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (insight) {
      const result = await supabase
        .from('insights')
        .update(insightData)
        .eq('id', insight.id);
      error = result.error;
    } else {
      const user = await supabase.auth.getUser();
      const result = await supabase
        .from('insights')
        .insert([{ ...insightData, created_by: user.data.user?.id }]);
      error = result.error;
    }

    if (error) {
      alert('Error saving insight: ' + error.message);
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
          Back to Insights
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {insight ? 'Edit Insight Post' : 'Create New Insight Post'}
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
                placeholder="Enter insight title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="insight-post-url"
                required
              />
              <p className="text-xs text-gray-500 mt-1">URL-friendly version of the title</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="Short description (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent font-mono text-sm"
                placeholder="Write your insight content here (HTML supported)"
                required
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold text-gray-900">Publish Settings</h3>

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
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                  placeholder="Author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={featuredImageUrl}
                  onChange={(e) => setFeaturedImageUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {featuredImageUrl && (
                  <img
                    src={featuredImageUrl}
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
              {saving ? 'Saving...' : 'Save Insight Post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
