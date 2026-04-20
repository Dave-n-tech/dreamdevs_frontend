import { useState } from "react";
import { useLoginMutation } from "../apis/fakeStoreApi";
import { useNavigate } from "react-router";

const Login = () => {
  const userDetails = {
    username: "",
    password: "",
  };

  const [userProfile, setUserProfile] = useState(userDetails);
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserProfile((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userProfile);

    try {
      const response = await login(userProfile).unwrap();
      if (!response.token) {
        setError("Check your network connection and try again");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
      localStorage.setItem("token", response.token);
      setUserProfile(userDetails);
      navigate("/products");
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg w-full max-w-md"
        style={{ padding: "32px 48px" }}
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Welcome
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Sign in to your account
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-6 flex flex-col items-start justify-start w-full" style={{paddingBottom: "12px"}}>
          <label
            htmlFor="username"
            className="block text-[13px] font-medium text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-100 rounded-lg placeholder:text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            onChange={handleChange}
          />
        </div>

        <div className="mb-8 flex flex-col items-start justify-start w-full" style={{paddingBottom: "12px"}}>
          <label
            htmlFor="password"
            className="block text-[13px] font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-100 rounded-lg placeholder:text-[13px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
