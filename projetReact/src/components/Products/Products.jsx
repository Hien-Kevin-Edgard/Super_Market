import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductCard = ({ image, nome_product, prix_unitaire, quantite, code_bare, total }) => (
  <div className="p-4 border rounded-md shadow-lg">
    <img src={image} alt={nome_product} className="h-[220px] w-[150px] object-cover rounded-md" />
    <div className="mt-2 text-center">
      <h2 className="text-sm font-semibold text-gray-800">{nome_product}</h2>
      <span className="block text-sm text-gray-600">Quantité : {quantite}</span>
      <span className="block text-sm text-gray-600">Prix Unitaire : {prix_unitaire}</span>
      <span className="block text-sm text-gray-600">Code Bare : {code_bare} Fcfa</span>
      <span className="block text-sm text-gray-600">Total : {total}</span>
    </div>
  </div>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/articles/');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Chargement des produits...</p>;
  if (error) return <p>Erreur lors du chargement des produits</p>;

  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {/* Génération dynamique des cartes de produits */}
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                nome_product={product.nome_product}
                quantite={product.quantite}
                prix_unitaire={product.prix_unitaire}
                code_bare={product.code_bare}
                total={product.total}
              />
            ))}
          </div>
          {/* View all button */}
          <div className="flex justify-center mt-10">
            <button className="cursor-pointer bg-primary text-white py-2 px-6 rounded-md">
              Voir tout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
