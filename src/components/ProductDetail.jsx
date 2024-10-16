
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();

  const product = {
    1: { id: 1, name: "Product 1", price: "$10", description: "Detail 1" },
    2: { id: 2, name: "Product 2", price: "$20", description: "Detail 2" },
  }[productId];

  if (!product) return <h2>Product Not Found</h2>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <p className="mb-4">{product.description}</p>
      <p className="font-semibold">Price: {product.price}</p>
    </div>
  );
};

export default ProductDetail;
