import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Img from '../ui/image';

const INTRINSIC_W = 1200; // matches your ?w=1200 URLs
const INTRINSIC_H_MD = 384; // md:h-96 -> 96 * 4 = 384px
const INTRINSIC_H_SM = 256; // h-64 -> 64 * 4 = 256px

const LifestyleCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX.current = null;
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const deltaX = touchStartX.current - touchEndX.current;
    const threshold = 50; // px
    if (deltaX > threshold) {
      // swipe left -> next
      nextSlide();
    } else if (deltaX < -threshold) {
      // swipe right -> prev
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Lifestyle images showcasing safe, healthy, and happy living
  const lifestyleImages = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Natural Family Time',
      description: 'Creating safe spaces for family bonding with chemical-free products',
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Organic Kitchen Living',
      description: 'Preparing healthy meals in a toxin-free kitchen environment',
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/4498597/pexels-photo-4498597.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Clean Home Sanctuary',
      description: 'Maintaining a pristine home using natural cleaning solutions',
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Natural Beauty Routine',
      description: 'Embracing chemical-free skincare and beauty practices',
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/4498592/pexels-photo-4498592.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Peaceful Wellness Moments',
      description: 'Finding tranquility through natural wellness practices',
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Healthy Active Living',
      description: 'Staying active while maintaining a chemical-free lifestyle',
    },
    {
      id: 7,
      url: 'https://images.pexels.com/photos/4498593/pexels-photo-4498593.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Safe Baby Care',
      description: 'Protecting our little ones with gentle, natural products',
    },
    {
      id: 8,
      url: 'https://images.pexels.com/photos/3985328/pexels-photo-3985328.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Garden to Table',
      description: 'Growing and enjoying fresh, organic produce at home',
    },
  ];

  // Auto-advance carousel every 5 seconds (respect reduced motion)
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % lifestyleImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [lifestyleImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % lifestyleImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + lifestyleImages.length) % lifestyleImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Main Carousel */}
      <div
        className="overflow-hidden rounded-2xl shadow-2xl"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Lifestyle images"
        >
          {lifestyleImages.map((image, idx) => (
            <div
              key={image.id}
              className="w-full flex-shrink-0 relative"
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${lifestyleImages.length}`}
            >
              <div className="relative h-64 md:h-96">
                {/* Background Image */}
                <div className="absolute inset-0">
                  {/* Use intrinsic size to prevent CLS; image is below-the-fold so it stays lazy */}
                  <Img
                    src={image.url}
                    alt={image.title}
                    // Choose a safe intrinsic height for CLS; md is 384px, small is 256px.
                    // We’ll give the larger one; CSS will constrain on small screens.
                    w={INTRINSIC_W}
                    h={INTRINSIC_H_MD}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex items-end">
                  <div className="w-full p-6 md:p-8">
                    <div className="max-w-2xl">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {image.title}
                      </h3>
                      <p className="text-lg text-gray-200">{image.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="hidden md:inline-flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/50 text-transparent hover:text-black focus:text-black p-3 rounded-full transition-all duration-300 z-20"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:inline-flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/50 text-transparent hover:text-black focus:text-black p-3 rounded-full transition-all duration-300 z-20"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2" role="tablist" aria-label="Carousel slides">
        {lifestyleImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-green-600 scale-125 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to image ${index + 1}`}
            aria-selected={index === currentSlide}
            role="tab"
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">
          {currentSlide + 1} of {lifestyleImages.length}
        </span>
      </div>
    </div>
  );
};

export default LifestyleCarousel;
