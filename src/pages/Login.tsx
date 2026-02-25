import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { TornPaper } from '../components/ui/OrganicSectionDividers';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log('Login attempted:', formData);

    onLogin();
    navigate('/');
  };

  return (
    <div className="pt-16 min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto bg-offWhite rounded-[2rem] shadow-sm overflow-hidden border border-taupe/10">
          <div className="p-8 md:p-10">
            <div className="flex justify-center mb-8">
              <Leaf className="h-12 w-12 text-umber" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-heading text-center text-charcoal mb-8">Welcome Back</h1>

            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal/80 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-cream ${errors.email ? 'border-danger' : 'border-taupe/20'
                      } focus:outline-none focus:ring-2 focus:ring-umber focus:border-transparent transition-all duration-300`}
                  />
                  {errors.email && <p className="mt-1.5 text-sm text-danger">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-charcoal/80 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-cream ${errors.password ? 'border-danger' : 'border-taupe/20'
                      } focus:outline-none focus:ring-2 focus:ring-umber focus:border-transparent transition-all duration-300`}
                  />
                  {errors.password && (
                    <p className="mt-1.5 text-sm text-danger">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="h-4 w-4 text-umber focus:ring-umber border-taupe/30 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-charcoal/70">
                      Remember me
                    </label>
                  </div>

                  <a href="#" className="text-sm text-umber hover:text-forest transition-colors duration-300">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-8 px-4 py-3.5 bg-charcoal text-cream font-medium rounded-full hover:bg-umber transition-all duration-500 shadow-sm hover:shadow-md"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8">
              <p className="text-center text-charcoal/70 text-sm">
                Don't have an account?{' '}
                <Link to="/join" className="text-umber hover:text-forest font-medium transition-colors duration-300">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          <div className="px-8 py-6 md:px-10 bg-cream border-t border-taupe/10">
            <div className="flex flex-col space-y-3">
              <button className="flex items-center justify-center px-4 py-2.5 border border-taupe/15 rounded-xl shadow-sm bg-offWhite text-charcoal/80 hover:bg-taupe/10 transition-all duration-300">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                Sign in with Google
              </button>

              <button className="flex items-center justify-center px-4 py-2.5 border border-taupe/15 rounded-xl shadow-sm bg-offWhite text-charcoal/80 hover:bg-taupe/10 transition-all duration-300">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" alt="Facebook" className="w-5 h-5 mr-2" />
                Sign in with Facebook
              </button>

              <button className="flex items-center justify-center px-4 py-2.5 border border-taupe/15 rounded-xl shadow-sm bg-offWhite text-charcoal/80 hover:bg-taupe/10 transition-all duration-300">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-5 h-5 mr-2" />
                Sign in with LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Torn paper: vanilla (cream) → terracotta (Footer transition) ─────────────── */}
      <TornPaper from="#FAF5E4" to="#F0E7DB" height={72} />
    </div>
  );
};

export default Login;