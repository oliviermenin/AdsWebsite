"use client";
import Link from 'next/link';
import { PlusCircle, User, LogIn, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { parseCookies, destroyCookie } from 'nookies';
import { getUserIdFromToken } from '@/services/jwt-utils';
import { fetchUserDetails } from '@/services/api';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const cookies = parseCookies();
      const token = cookies.token;

      if (token) {
        setIsLoggedIn(true);

        try {
          const userId = Number(getUserIdFromToken(token));
          if (userId) {
            const user = await fetchUserDetails(userId);
            setUserName(user.name);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération de l\'utilisateur :', error);
          setIsLoggedIn(false);
          setUserName(null);
        }
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    destroyCookie(null, 'token');
    setIsLoggedIn(false);
    setUserName(null);
    window.location.href = '/';
  };

  const handlePostAdClick = () => {
    if (isLoggedIn) {
      window.location.href = '/new_ad';
    } else {
      window.location.href = '/login';
    }
  };

  const handleMyAdsClick = () => {
    if (isLoggedIn) {
      const userId = getUserIdFromToken(parseCookies().token);
      if (userId) {
        window.location.href = `/my_ads/${userId}`;
      } else {
        console.error('Impossible de récupérer l\'ID utilisateur.');
      }
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">LeBonCoin</Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={handlePostAdClick}
            className="flex items-center bg-white text-blue-600 py-2 px-4 rounded-full hover:bg-blue-100 transition duration-300"
          >
            <PlusCircle size={20} className="mr-2" />
            Déposer une nouvelle annonce
          </button>

          {isLoggedIn ? (
            <>
              <span className="text-sm font-medium">{userName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition duration-300"
              >
                <LogOut size={20} className="mr-2" />
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/register" className="flex items-center text-white hover:bg-blue-700 py-2 px-3 rounded-full transition duration-300">
                <User size={18} className="mr-2" />
                S'inscrire
              </Link>
              <Link href="/login" className="flex items-center text-white hover:bg-blue-700 py-2 px-3 rounded-full transition duration-300">
                <LogIn size={18} className="mr-2" />
                Se connecter
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
