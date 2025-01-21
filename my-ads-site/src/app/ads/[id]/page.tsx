'use client'
import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { fetchAdById, Ad } from '@/services/api';
import Header from '@/components/header/Header';
import { MapPin, Euro, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:8000'

export default function AdDetailPage() {
  const params = useParams()
  const [ad, setAd] = useState<Ad | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAd = async () => {
      if (params.id) {
        try {
          const fetchedAd = await fetchAdById(params.id as string)
          setAd(fetchedAd)
        } catch (error) {
          console.error('Failed to fetch ad:', error)
          notFound()
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadAd()
  }, [params.id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!ad) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {ad.picture ? (
            <img
              className="w-full h-96 object-contain"
              src={`${API_BASE_URL}${ad.picture}`}
              alt={ad.title}
            />
          ) : (
            <div className="w-full h-96 bg-gray-300 flex items-center justify-center">
              <p className="text-gray-500">Pas de photo</p>
            </div>
          )}

          <div className="p-8 space-y-6">
            <div>
              <h1 className="mt-1 text-4xl font-bold text-gray-900">{ad.title}</h1>
            </div>
            <p className="text-gray-600">{ad.description}</p>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-gray-600">{ad.location}</span>
            </div>
            <div className="flex items-center">
              <Euro className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-2xl font-bold text-indigo-600">{ad.price} €</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-gray-600">
                Publié le {format(new Date(ad.createdAt || ''), 'dd/MM/yyyy')}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>

  )
}

