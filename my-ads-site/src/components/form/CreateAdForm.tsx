import { useState } from "react";
import { createAd } from "@/services/api";

export default function CreateAdForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    picture: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAd(formData);
      alert("Annonce créée avec succès !");
    } catch (error) {
      alert("Erreur lors de la création de l'annonce.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Créer une nouvelle annonce</h2>
      <input
        name="title"
        placeholder="Titre"
        value={formData.title}
        onChange={handleChange}
        required
        className="mb-2 w-full px-4 py-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="mb-2 w-full px-4 py-2 border rounded"
      />
      <input
        name="price"
        placeholder="Prix"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
        className="mb-2 w-full px-4 py-2 border rounded"
      />
      <input
        name="location"
        placeholder="Localisation"
        value={formData.location}
        onChange={handleChange}
        required
        className="mb-2 w-full px-4 py-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Soumettre
      </button>
    </form>
  );
}
