import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../../apis/fakeStoreApi";

const Product = () => {
  const { id } = useParams();
  const { data: product } = useGetProductByIdQuery(id);
  console.log(product);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {product && (
        <div
          className="text-sm p-6 flex flex-col items-center justify-center gap-1 min-w-24 max-w-sm bg-white rounded-lg"
          style={{ padding: "12px 25px 30px" }}
        >
          <div className="w-32 h-64 rounded-lg">
            <img
              className="object-contain w-full h-full"
              src={product.image}
              alt={product.title}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <p className="text-[10px] font-semibold text-gray-700 text-left">
              {product.title}
            </p>
            <p className="text-[10px] font-bold text-green-600 text-left">
              Price: &#8358;{product.price.toFixed(2)}
            </p>
            <p className="text-[10px] text-gray-600 text-left">
              {product.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
