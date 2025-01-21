'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchAdsByUser, Ad } from '@/services/api';
import Header from '@/components/header/Header';
import { MapPin, Euro } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:8000'

export default function MyAdsPage() {
  const params = useParams()
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAds = async () => {
      if (params.id) {
        try {
          const userAds = await fetchAdsByUser(parseInt(params.id as string))
          setAds(userAds)
        } catch (err) {
          console.error('Failed to fetch ads:', err)
          setError('Impossible de récupérer vos annonces. Veuillez réessayer plus tard.')
        } finally {
          setLoading(false)
        }
      }
    }

    fetchAds()
  }, [params.id])

  if (loading) {
    return <div>Chargement...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Mes annonces publiées</h1>
        {ads.length === 0 ? (
          <p className="text-gray-500">Vous n'avez pas encore créé d'annonces.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <div key={ad.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 bg-gray-300 flex items-center justify-center">
                  {ad.picture ? (
                    <img
                      src={`${API_BASE_URL}${ad.picture}`}
                      alt={ad.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <p className="text-gray-500">Pas de photo</p>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900">{ad.title}</h2>
                  <p className="text-gray-600 line-clamp-3">{ad.description}</p>
                  <div className="flex items-center">
                    <Euro className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-lg font-bold text-indigo-600">{ad.price} €</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-gray-600">{ad.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

