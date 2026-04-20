import { Link } from "react-router";
import { useGetAllProductsQuery } from "../../apis/fakeStoreApi";

const Products = () => {
  const { data } = useGetAllProductsQuery();
  console.log(data);

  return (
    <div
      className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
      style={{ padding: "10px 30px" }}
    >
      {data?.map((product: any) => {
        return (
          <Link to={`/products/${product.id}`}>
            <div
              className="text-sm p-6 flex flex-col items-center justify-center gap-1 bg-white rounded-lg"
              key={product.id}
              style={{ padding: "10px" }}
            >
              <div className="w-32 h-32 rounded-lg">
                <img
                  className="object-contain w-full h-full"
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-700">
                  {product.title}
                </p>
                <p className="text-[10px] font-bold text-green-600 text-center">
                  Price: &#8358;{product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Products;
