import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Search, Star } from 'lucide-react';
import CaseStudyEditor from './CaseStudyEditor';

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
  created_at: string;
  updated_at: string;
}

export default function CaseStudiesManager() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching case studies:', error);
    } else {
      setCaseStudies(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;

    const { error } = await supabase.from('case_studies').delete().eq('id', id);

    if (error) {
      alert('Error deleting case study: ' + error.message);
    } else {
      fetchCaseStudies();
    }
  };

  const handleEdit = (caseStudy: CaseStudy) => {
    setEditingCaseStudy(caseStudy);
    setShowEditor(true);
  };

  const handleCreate = () => {
    setEditingCaseStudy(null);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingCaseStudy(null);
    fetchCaseStudies();
  };

  const filteredCaseStudies = caseStudies.filter(cs =>
    cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cs.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cs.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showEditor) {
    return <CaseStudyEditor caseStudy={editingCaseStudy} onClose={handleCloseEditor} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Case Studies</h2>
          <p className="text-sm text-gray-500 mt-1">Manage success stories</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#8b7355] text-white rounded-lg hover:bg-[#6d5a42] transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Case Study
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search case studies..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8b7355] focus:border-transparent"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-[#8b7355] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 mt-4">Loading case studies...</p>
        </div>
      ) : filteredCaseStudies.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No case studies found. Create your first case study!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCaseStudies.map((caseStudy) => (
            <div
              key={caseStudy.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {caseStudy.image_url && (
                <img
                  src={caseStudy.image_url}
                  alt={caseStudy.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1">{caseStudy.title}</h3>
                  <div className="flex items-center gap-2 ml-2">
                    {caseStudy.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        caseStudy.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {caseStudy.status === 'published' ? 'Live' : 'Draft'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {caseStudy.client_name && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Client:</span> {caseStudy.client_name}
                    </p>
                  )}
                  {caseStudy.location && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Location:</span> {caseStudy.location}
                    </p>
                  )}
                  {caseStudy.roi_percentage > 0 && (
                    <p className="text-sm text-green-600 font-semibold">
                      ROI: {caseStudy.roi_percentage}%
                    </p>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{caseStudy.description}</p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(caseStudy)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-700 hover:text-[#8b7355] hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(caseStudy.id)}
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
