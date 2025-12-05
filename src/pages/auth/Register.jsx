import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Register = () => {
  const { register: registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await registerUser(data);
      toast.success('Registration successful');
      reset();
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {/* Name */}
        <input 
          type="text" 
          placeholder="Name" 
          {...register('name', { required: true })}
          className={`w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500' : ''}`}
        />

        {/* Email */}
        <input 
          type="email" 
          placeholder="Email" 
          {...register('email', { required: true })}
          className={`w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500' : ''}`}
        />

        {/* Password */}
        <input 
          type="password" 
          placeholder="Password" 
          {...register('password', { required: true })}
          className={`w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500' : ''}`}
        />

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-green-800/90 text-white py-3 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
        >
          {loading ? (
            <div className="h-6 w-6 border-4 border-white/40 border-t-white rounded-full animate-spin"></div>
          ) : (
            "Register"
          )}
        </button>

        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-black hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
