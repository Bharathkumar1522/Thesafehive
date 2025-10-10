import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Img from '../ui/image';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

const INTRINSIC_W = 1200; // matches your ?w=1200 URLs
const INTRINSIC_H_MD = 384; // md:h-96 -> 96 * 4 = 384px

const LifestyleCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Lifestyle images showcasing safe, healthy, and happy living
  const lifestyleImages = [
    {
      id: 1,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759967667/1_pagh9y.webp',
      title: 'Discover the Joy of Living Chemical-Free',
      description: 'Breathe easy. Live pure. Choose wellness that starts at home.',
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759969700/20251009_0109_Serene_Natural_Elements_simple_compose_01k734r3defn6bz3ayehf3vpd5_war0vn.webp',
      title: 'Pure Ingredients, Peaceful Spaces',
      description: 'Every choice you make shapes a healthier home',
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759969700/20251009_0117_Serene_Morning_Ritual_simple_compose_01k7354t9hf9frpjsx1dh52bbr_gh3kjo.webp',
      title: 'Where Love Meets Clean Living',
      description: 'Caring for your loved ones begins with what you bring home',
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759969700/20251009_0115_Wholesome_Kitchen_Joy_simple_compose_01k7351qj6fr88k1nsnfp3b4a4_mflgm4.webp',
      title: 'Nourish Your Body, Naturally',
      description: 'Small steps toward a big change in how you feel, every day',
    },
    {
      id: 5,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759969700/20251009_0119_Barefoot_Bliss_simple_compose_01k735aafhfzza3jvsbcxjdyz8_l0plcy.webp',
      title: 'Live in Rhythm with the Earth',
      description: 'Nature heals when we choose to live in harmony.',
    },
    {
      id: 6,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759969701/20251009_0124_Joyful_Outdoor_Adventures_simple_compose_01k735k54temh99wmdsjtjzrzp_r0zkjn.webp',
      title: 'Safe. Healthy. Happy Living.',
      description: 'Join the movement toward a naturally better tomorrow.',
    },
    {
      id: 7,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759972120/20251009_0157_Community_Eco_Gathering_simple_compose_01k737fyj8fxdrnt6c7wacmz4x_webefq.webp',
      title: 'Together for a Cleaner, Kinder World',
      description: 'Wellness grows stronger when we share it',
    },
    {
      id: 8,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759972076/20251009_0159_Hopeful_Sunrise_Vista_simple_compose_01k737khwse478pmw7y2ysjks5_imrzcq.webp',
      title: 'Sustainable Today, Thriving Tomorrow',
      description: 'Choose mindful living — for yourself and the planet',
    },
  ];

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 0 },
    defaultAnimation: {
      duration: 1500
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  // Auto-advance every 5s (respect reduced motion)
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const timer = setInterval(() => instanceRef.current?.next(), 5000);
    return () => clearInterval(timer);
  }, [instanceRef]);

  const nextSlide = () => instanceRef.current?.next();
  const prevSlide = () => instanceRef.current?.prev();
  const goToSlide = (index: number) => instanceRef.current?.moveToIdx(index);

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Main Carousel */}
      <div ref={sliderRef} className="keen-slider overflow-hidden rounded-2xl shadow-2xl relative">
        {lifestyleImages.map((image, idx) => (
          <div
            key={image.id}
            className="keen-slider__slide w-full flex-shrink-0 relative"
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} of ${lifestyleImages.length}`}
          >
            <div className="relative h-64 md:h-96">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Img
                  src={image.url}
                  alt={image.title}
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
        {/* Navigation Buttons (inside slider for true vertical centering) */}
        <button
          onClick={prevSlide}
          className="hidden md:inline-flex absolute left-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center p-4 rounded-full bg-white/80 text-gray-900 hover:bg-white shadow-lg ring-1 ring-black/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/60"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:inline-flex absolute right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center p-4 rounded-full bg-white/80 text-gray-900 hover:bg-white shadow-lg ring-1 ring-black/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/60"
          aria-label="Next image"
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      </div>

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
