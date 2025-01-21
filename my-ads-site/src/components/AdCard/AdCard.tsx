import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Ad } from '@/services/api';

interface AdCardProps {
  ad: Ad;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Image
        src={ad.picture || '/placeholder.jpg'}
        alt={ad.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{ad.title}</h2>
        <p className="text-gray-600 mb-2">{ad.price} €</p>
        <p className="text-gray-500 mb-4">{ad.location}</p>
        <p className="text-sm text-gray-500 mb-2">Category: {ad.category}</p>
        {ad.createdAt && (
          <p className="text-xs text-gray-400 mb-2">
            Created: {new Date(ad.createdAt).toLocaleDateString()}
          </p>
        )}
        <Link href={`/ads/${ad.id}`} className="text-blue-500 hover:underline">
          Voir l'annonce
        </Link>
      </div>
    </div>
  );
};

export default AdCard;

