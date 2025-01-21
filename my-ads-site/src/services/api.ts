const API_BASE_URL = "https://localhost:8000";

export interface Ad {
  id?: number;
  title: string;
  description: string;
  price: number;
  location: string;
  picture: string;
  created_by: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
  address: string;
  zipcode: string;
  country: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface Message {
  senderId: string;
  receiverId: string;
  adId: string;
  message: string;
}

export interface Chat {
  id: number;
  message: string;
  sender: string | null;
  receiver: string | null;
  ad: string | null;
  createdAt: string;
}


async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const fetchAds = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/ads`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.member || []; 
  } catch (error) {
    console.error("Erreur lors de la récupération des annonces :", error);
    return [];
  }
};

export const fetchAdsByUser = async (userId: number): Promise<Ad[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/ads`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as Ad[];
  } catch (error) {
    console.error("Error fetching user's ads:", error);
    throw error;
  }
};

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await handleResponse(response);
    return data.member || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    return [];
  }
}

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result.filePath;
};

export const createAd = async (adData: Record<string, any>): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
      },
      body: JSON.stringify(adData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating ad:', error);
    throw error;
  }
};

export const fetchAdById = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/ads/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching ad:', error);
    return null;
  }
};


export const deleteAd = async (adId: number) => {
  const response = await fetch(`${API_BASE_URL}/ads/${adId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete ad');
  }

  return await response.json();
};



export async function registerUser(userData: User): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/ld+json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur :", error);
    throw error;
  }
}

export async function loginUser(credentials: LoginCredentials): Promise<{ token: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur :", error);
    throw error;
  }
}


export async function fetchUserDetails(userId: number): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de l'utilisateur :", error);
    throw error;
  }
}


export async function updateUserDetails(userId: number, userData: Partial<User>): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Erreur lors de la mise à jour des détails de l'utilisateur :", error);
    throw error;
  }
}

export const fetchMessages = async (adId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chats/${adId}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des messages');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur de récupération des messages :', error);
    return [];
  }
};

export const sendMessage = async ({ senderId, receiverId, adId, message }: Message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/ld+json',
      },
      body: JSON.stringify({
        senderId,
        receiverId,
        adId,
        message,
      }),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi du message');
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message :', error);
  }
};

export async function fetchChats(): Promise<Chat[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/chats`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des discussions : ${response.status}`);
    }

    const data = await response.json();
    console.log("Données brutes de l'API :", data);

    if (!data.member || !Array.isArray(data.member)) {
      throw new Error("Les données reçues ne sont pas valides (clé `member` attendue)");
    }

    return data.member;
  } catch (error) {
    console.error("Erreur lors de la récupération des discussions :", error);
    throw error;
  }
}



export async function deleteChat(chatId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/chats/${chatId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression de la discussion : ${response.status}`);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la discussion :", error);
    throw error;
  }
}

export async function deleteUser(userId: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await handleResponse(response);
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    throw error;
  }
}

