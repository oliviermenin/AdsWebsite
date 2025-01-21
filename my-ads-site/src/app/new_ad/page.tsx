"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Euro, MapPin, ImageIcon } from 'lucide-react';
import Header from '@/components/header/Header';
import { createAd, fetchCategories, Category, uploadImage } from '@/services/api';
import { getUserIdFromToken } from '@/services/jwt-utils';
import { parseCookies } from 'nookies';

export default function CreateAdPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    category: '',
    picture: null as File | null,
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0] || null
      setFormData(prev => ({ ...prev, [name]: file }))
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setPreviewUrl(null)
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const cookies = parseCookies();
    const token = cookies.token;
    const userId = token ? getUserIdFromToken(token) : null;

    if (!userId) {
      setError('Utilisateur non authentifié');
      setIsLoading(false);
      return;
    }

    try {
      let picturePath = '';
      if (formData.picture) {
        picturePath = await uploadImage(formData.picture);
      }

      const adData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: formData.location,
        picture: picturePath,
        category: formData.category,
        created_by: `/users/${userId}`,
      };

      const response = await createAd(adData);
      console.log('Annonce créée avec succès:', response);
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur est survenue lors de la création de l'annonce.");
      }
      console.error("Erreur de création d'annonce:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Créer une nouvelle annonce</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Titre de l'annonce
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Prix
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Euro className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="block w-full pl-10 pr-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">EUR</span>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Localisation
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Catégorie
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.id} value={`/categories/${category.id}`}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="picture" className="block text-sm font-medium text-gray-700">
                  Image de l'annonce
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    id="picture"
                    name="picture"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="picture"
                    className="relative cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <span>Choisir une image</span>
                    <ImageIcon className="h-5 w-5 text-gray-400 ml-2 inline" />
                  </label>
                </div>
                {previewUrl && (
                  <div className="mt-2">
                    <img src={previewUrl} alt="Preview" className="h-32 w-auto object-cover rounded-md" />
                  </div>
                )}
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Création en cours...' : 'Créer l\'annonce'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

