import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import InsightEditor from './InsightEditor';

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
  created_at: string;
  updated_at: string;
}

export default function InsightsManager() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingInsight, setEditingInsight] = useState<Insight | null>(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('insights')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching insights:', error);
    } else {
      setInsights(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this insight?')) return;

    const { error } = await supabase.from('insights').delete().eq('id', id);

    if (error) {
      alert('Error deleting insight: ' + error.message);
    } else {
      fetchInsights();
    }
  };

  const handleEdit = (insight: Insight) => {
    setEditingInsight(insight);
    setShowEditor(true);
  };

  const handleCreate = () => {
    setEditingInsight(null);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingInsight(null);
    fetchInsights();
  };

  const filteredInsights = insights.filter(insight =>
    insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    insight.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showEditor) {
    return <InsightEditor insight={editingInsight} onClose={handleCloseEditor} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Insights</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your insight posts</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#8b7355] text-white rounded-lg hover:bg-[#6d5a42] transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Insight Post
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search insights..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-4">Loading insights...</p>
        </div>
      ) : filteredInsights.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No insights found. Create your first insight post!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInsights.map((insight) => (
            <div
              key={insight.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        insight.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {insight.status === 'published' ? (
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          Published
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <EyeOff className="w-3 h-3" />
                          Draft
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{insight.excerpt || 'No excerpt'}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>By {insight.author || 'Unknown'}</span>
                    <span>•</span>
                    <span>{new Date(insight.created_at).toLocaleDateString()}</span>
                    {insight.published_at && (
                      <>
                        <span>•</span>
                        <span>Published {new Date(insight.published_at).toLocaleDateString()}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(insight)}
                    className="p-2 text-gray-600 hover:text-[#8b7355] hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(insight.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
