//Composant pour contacter le vendeur et recevoir les messages depuis la boite de réception. A finaliser
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { MessageCircle, Loader2, Trash2 } from 'lucide-react'
import { parseCookies } from 'nookies'
import Header from '@/components/header/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { fetchChats, deleteChat, Chat } from '@/services/api'
import { useToast } from "@/hooks/use-toast"
import { getUserIdFromToken } from '@/services/jwt-utils'

export default function Inbox() {
  const [chats, setChats] = useState<Chat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const cookies = parseCookies()
    const token = cookies.token
    const extractedUserId = token ? getUserIdFromToken(token) : null

    if (!extractedUserId) {
      setError('Utilisateur non authentifié')
      setIsLoading(false)
      return
    }

    setUserId(extractedUserId)
    loadChats(extractedUserId)
  }, [])

  const loadChats = async (userId: string) => {
    try {
      setIsLoading(true)
      const fetchedChats = await fetchChats()
      const filteredChats = fetchedChats.filter(
        (chat) => chat.sender === userId || chat.receiver === userId
      )

      setChats(filteredChats)
      setError(null)
    } catch (err) {
      console.error("erreur", err)
      setError("Erreur lors du chargement des discussions")
      toast({
        title: "Erreur",
        description: "Impossible de charger les discussions. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChatClick = (chatId: number) => {
    router.push(`/chats/${chatId}`)
  }

  const handleDeleteChat = async (chatId: number) => {
    try {
      await deleteChat(chatId.toString())
      setChats(chats.filter(chat => chat.id !== chatId))
      toast({
        title: "Succès",
        description: "La discussion a été supprimée.",
      })
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la discussion. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Utilisateur non authentifié</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Mes discussions</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {chats.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-gray-500">Aucune discussion pour le moment</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {chats.map((chat) => (
              <Card key={chat.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>{chat.sender?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{chat.sender || 'Utilisateur inconnu'}</CardTitle>
                      {/* <CardDescription>{chat.ad || 'Annonce inconnue'}</CardDescription> */}
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {chat.sender === userId ? "Envoyé" : "Reçu"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 truncate">{chat.message}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">
                      {format(new Date(chat.createdAt), "d MMMM yyyy à HH:mm", { locale: fr })}
                    </span>
                    <div className="space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleChatClick(chat.id)}>
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Voir la discussion
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteChat(chat.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
