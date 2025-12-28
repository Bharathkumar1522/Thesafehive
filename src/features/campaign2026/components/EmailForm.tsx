import { useState, FormEvent } from 'react';
import { X, Mail, User, Send, CheckCircle } from 'lucide-react';
import Logo from './Logo';

interface EmailFormProps {
    onClose: () => void;
}

export default function EmailForm({ onClose }: EmailFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        // Basic validation
        if (!formData.name || !formData.email) {
            setError('Please fill in all fields');
            setIsSubmitting(false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email address');
            setIsSubmitting(false);
            return;
        }

        try {
            // Send to local secure backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    suggestions: formData.comment
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Submission failed');
            }

            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (err) {
            console.error('Submission error:', err);
            setError('Something went wrong. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative bg-gradient-to-br from-white to-[#ECFDF5] rounded-2xl shadow-2xl max-w-md w-full p-8 border border-[#59a75c]/20">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Logo */}
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                        <Logo className="h-12 w-auto" variant="dark" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#0C4023] mb-2">
                        Join Our Community
                    </h2>
                    <p className="text-[#0C4023]/70">
                        Get exclusive Christmas safety tips and toxin-free living guides
                    </p>
                </div>

                {isSuccess ? (
                    /* Success State */
                    <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#59a75c]/20 rounded-full mb-4">
                            <CheckCircle className="w-10 h-10 text-[#59a75c]" />
                        </div>
                        <h3 className="text-xl font-bold text-[#0C4023] mb-2">
                            Welcome to TheSafeHive!
                        </h3>
                        <p className="text-[#0C4023]/70">
                            Check your email for a special welcome gift 🎁
                        </p>
                    </div>
                ) : (
                    /* Form */
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-[#0C4023] mb-2">
                                Your Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#59a75c]/50" />
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 border-2 border-[#59a75c]/20 rounded-lg focus:border-[#59a75c] focus:outline-none transition-colors bg-white"
                                    placeholder="Enter your name"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-[#0C4023] mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#59a75c]/50" />
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-11 pr-4 py-3 border-2 border-[#59a75c]/20 rounded-lg focus:border-[#59a75c] focus:outline-none transition-colors bg-white"
                                    placeholder="your@email.com"
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>

                        {/* Comment Field */}
                        <div>
                            <label htmlFor="comment" className="block text-sm font-semibold text-[#0C4023] mb-2">
                                Comment / Suggestions
                            </label>
                            <textarea
                                id="comment"
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                className="w-full p-4 border-2 border-[#59a75c]/20 rounded-lg focus:border-[#59a75c] focus:outline-none transition-colors bg-white min-h-[100px] resize-y"
                                placeholder="Share your thoughts..."
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-[#59a75c] text-white font-semibold rounded-lg hover:bg-[#3d7a40] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    <span>Send Message</span>
                                </>
                            )}
                        </button>

                        {/* Privacy Notice */}
                        <p className="text-xs text-[#0C4023]/60 text-center">
                            We respect your privacy.
                            <br />
                            By joining, you agree to our{' '}
                            <a href="https://www.thesafehive.com/" target="_blank" rel="noopener noreferrer" className="text-[#59a75c] hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
