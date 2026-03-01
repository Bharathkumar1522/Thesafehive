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
      title: 'Discover Safer Choices for Every Home',
      description: 'Evidence-led guidance for everyday household and personal care products.',
    },
    {
      id: 2,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759969700/20251009_0109_Serene_Natural_Elements_simple_compose_01k734r3defn6bz3ayehf3vpd5_war0vn.webp',
      title: 'Lower-Risk Ingredients, Calmer Spaces',
      description: 'Every informed choice shapes a healthier home for the people you love.',
    },
    {
      id: 3,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759969700/20251009_0117_Serene_Morning_Ritual_simple_compose_01k7354t9hf9frpjsx1dh52bbr_gh3kjo.webp',
      title: 'Where Clarity Meets Conscious Living',
      description: 'Caring for your loved ones starts with knowing what is in the products you use.',
    },
    {
      id: 4,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759969700/20251009_0115_Wholesome_Kitchen_Joy_simple_compose_01k7351qj6fr88k1nsnfp3b4a4_mflgm4.webp',
      title: 'Science-Backed Decisions, Every Day',
      description: 'Small, better-informed steps toward a meaningful change in how you live.',
    },
    {
      id: 5,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759969700/20251009_0119_Barefoot_Bliss_simple_compose_01k735aafhfzza3jvsbcxjdyz8_l0plcy.webp',
      title: 'In Tune with Evidence, Not Marketing',
      description: 'TheSafeHive cuts through label jargon so you can make clear, grounded decisions.',
    },
    {
      id: 6,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759969701/20251009_0124_Joyful_Outdoor_Adventures_simple_compose_01k735k54temh99wmdsjtjzrzp_r0zkjn.webp',
      title: 'Safe. Informed. Confident.',
      description: 'Join thousands making smarter household choices, backed by public science.',
    },
    {
      id: 7,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759972120/20251009_0157_Community_Eco_Gathering_simple_compose_01k737fyj8fxdrnt6c7wacmz4x_webefq.webp',
      title: 'Together for a Transparent Consumer World',
      description: 'Safety intelligence grows stronger when we share it openly.',
    },
    {
      id: 8,
      url: 'https://res.cloudinary.com/dwmaznf4n/image/upload/v1759972076/20251009_0159_Hopeful_Sunrise_Vista_simple_compose_01k737khwse478pmw7y2ysjks5_imrzcq.webp',
      title: 'Informed Today, Healthier Tomorrow',
      description: 'Choose evidence-led living — for yourself and the people around you.',
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
      <div ref={sliderRef} className="keen-slider overflow-hidden rounded-[2rem] shadow-2xl relative">
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
                    <h3 className="text-2xl md:text-4xl font-heading text-white mb-3 drop-shadow-md">
                      {image.title}
                    </h3>
                    <p className="text-lg md:text-xl text-cream/90 drop-shadow-md">{image.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Navigation Buttons (inside slider for true vertical centering) */}
        <button
          onClick={prevSlide}
          className="hidden md:inline-flex absolute left-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center p-4 rounded-full bg-cream/90 text-forest hover:bg-cream shadow-lg ring-1 ring-sage/20 backdrop-blur-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sage"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:inline-flex absolute right-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center p-4 rounded-full bg-cream/90 text-forest hover:bg-cream shadow-lg ring-1 ring-sage/20 backdrop-blur-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sage"
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
            className={`rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-sage w-6 h-3 shadow-md' : 'bg-sage/40 w-3 h-3 hover:bg-sage/60'
              }`}
            aria-label={`Go to image ${index + 1}`}
            aria-selected={index === currentSlide}
            role="tab"
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center mt-4">
        <span className="text-sm text-charcoal/60 font-medium">
          {currentSlide + 1} of {lifestyleImages.length}
        </span>
      </div>
    </div>
  );
};

export default LifestyleCarousel;
