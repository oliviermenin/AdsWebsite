"use client";
import Header from '@/components/header/Header';
import { fetchAds } from '@/services/api';
import { MapPin, Euro } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:8000';

export default function Home() {
  const [ads, setAds] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAds, setFilteredAds] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedAds = await fetchAds();
      setAds(fetchedAds);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = ads.filter((ad) =>
      ad.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAds(filtered);
  }, [searchQuery, ads]);

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Annonces récentes</h1>

        <div className="relative max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Rechercher une annonce..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 px-4 pr-10 rounded-lg shadow-md hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full bg-white text-gray-800 mb-5"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAds.length > 0 ? (
            filteredAds.map((ad: any) => (
              <Link href={`/ads/${ad.id}`} key={ad.id}>
                <div
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                >
                  <div className="h-48 bg-gray-300">
                    {ad.picture ? (
                      <img
                        src={`${API_BASE_URL}${ad.picture}`}
                        alt={ad.title}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <p className="text-center py-20 text-gray-500">Pas de photo</p>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{ad.title}</h2>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500">
                        <MapPin size={16} className="mr-1" />
                        {ad.location}
                      </div>
                      <div className="flex items-center font-bold text-blue-600">
                        <Euro size={16} className="mr-1" />
                        {ad.price} €
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Aucune annonce ne correspond à votre recherche.</p>
          )}
        </div>
      </main>
    </div>
  );
}
