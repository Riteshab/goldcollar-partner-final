import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Search, ExternalLink } from 'lucide-react';
import ResourceEditor from './ResourceEditor';

interface Resource {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  file_url: string;
  category: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export default function ResourcesManager() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching resources:', error);
    } else {
      setResources(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    const { error } = await supabase.from('resources').delete().eq('id', id);

    if (error) {
      alert('Error deleting resource: ' + error.message);
    } else {
      fetchResources();
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setShowEditor(true);
  };

  const handleCreate = () => {
    setEditingResource(null);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingResource(null);
    fetchResources();
  };

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showEditor) {
    return <ResourceEditor resource={editingResource} onClose={handleCloseEditor} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Free Resources</h2>
          <p className="text-sm text-gray-500 mt-1">Manage downloadable resources</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#8b7355] text-white rounded-lg hover:bg-[#6d5a42] transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Resource
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-4">Loading resources...</p>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No resources found. Create your first resource!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {resource.thumbnail_url && (
                <img
                  src={resource.thumbnail_url}
                  alt={resource.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">{resource.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ml-2 ${
                      resource.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {resource.status === 'published' ? 'Live' : 'Draft'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                {resource.category && (
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded mb-3">
                    {resource.category}
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(resource)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-[#8b7355] hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  {resource.file_url && (
                    <a
                      href={resource.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(resource.id)}
                    className="flex items-center justify-center px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
