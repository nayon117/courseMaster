import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data); 
      toast.success('Login successful');
      reset();
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2"
        />

        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2"
        />

        <input
          type="text"
          placeholder="Admin Key (Optional)"
          {...register('adminKey')}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2"
        />

        <button type="submit" className="w-full bg-green-800/90 text-white py-3 rounded-lg transition-colors cursor-pointer">
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-black hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
