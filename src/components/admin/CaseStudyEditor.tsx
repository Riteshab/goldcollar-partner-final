import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client_name: string;
  location: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  roi_percentage: number;
  image_url: string;
  gallery_images: string[];
  status: 'draft' | 'published';
  featured: boolean;
  published_at: string | null;
}

interface CaseStudyEditorProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyEditor({ caseStudy, onClose }: CaseStudyEditorProps) {
  const [title, setTitle] = useState(caseStudy?.title || '');
  const [slug, setSlug] = useState(caseStudy?.slug || '');
  const [clientName, setClientName] = useState(caseStudy?.client_name || '');
  const [location, setLocation] = useState(caseStudy?.location || '');
  const [description, setDescription] = useState(caseStudy?.description || '');
  const [challenge, setChallenge] = useState(caseStudy?.challenge || '');
  const [solution, setSolution] = useState(caseStudy?.solution || '');
  const [results, setResults] = useState(caseStudy?.results || '');
  const [roiPercentage, setRoiPercentage] = useState(caseStudy?.roi_percentage || 0);
  const [imageUrl, setImageUrl] = useState(caseStudy?.image_url || '');
  const [status, setStatus] = useState<'draft' | 'published'>(caseStudy?.status || 'draft');
  const [featured, setFeatured] = useState(caseStudy?.featured || false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!caseStudy && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);
    }
  }, [title, caseStudy]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const caseStudyData = {
      title,
      slug,
      client_name: clientName,
      location,
      description,
      challenge,
      solution,
      results,
      roi_percentage: roiPercentage,
      image_url: imageUrl,
      gallery_images: [],
      status,
      featured,
      published_at: status === 'published' && !caseStudy?.published_at ? new Date().toISOString() : caseStudy?.published_at,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (caseStudy) {
      const result = await supabase
        .from('case_studies')
        .update(caseStudyData)
        .eq('id', caseStudy.id);
      error = result.error;
    } else {
      const user = await supabase.auth.getUser();
      const result = await supabase
        .from('case_studies')
        .insert([{ ...caseStudyData, created_by: user.data.user?.id }]);
      error = result.error;
    }

    if (error) {
      alert('Error saving case study: ' + error.message);
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
          Back to Case Studies
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {caseStudy ? 'Edit Case Study' : 'Create New Case Study'}
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
                placeholder="Enter case study title"
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
                placeholder="case-study-url"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                  placeholder="Client or property name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                  placeholder="City, State"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="Brief overview"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Challenge
              </label>
              <textarea
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="What was the problem?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Solution
              </label>
              <textarea
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="How did you solve it?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Results
              </label>
              <textarea
                value={results}
                onChange={(e) => setResults(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                placeholder="What were the outcomes?"
              />
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
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#8b7355] border-gray-300 rounded focus:ring-[#8b7355]"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Featured on homepage
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ROI Percentage
                </label>
                <input
                  type="number"
                  value={roiPercentage}
                  onChange={(e) => setRoiPercentage(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Image URL
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {imageUrl && (
                  <img
                    src={imageUrl}
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
              {saving ? 'Saving...' : 'Save Case Study'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
