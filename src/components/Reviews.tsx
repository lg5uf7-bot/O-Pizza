import { Star } from 'lucide-react';
import { reviews } from '../reviews';

export default function Reviews() {
  // Duplicate reviews to create a seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 -mt-40 bg-dark-900 overflow-hidden">
      <h2 className="text-4xl md:text-5xl font-cursive text-brand-500 mb-16 text-center tracking-wide">
        What Our Customers Say
      </h2>
      <div className="flex animate-marquee gap-8">
        {duplicatedReviews.map((review, index) => (
          <div
            key={index}
            className="bg-dark-800 p-8 rounded-3xl border border-white/5 shadow-lg min-w-[350px] max-w-[350px]"
          >
            <div className="flex items-center mb-4">
              {[...Array(review.stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-stone-300 mb-6 italic leading-relaxed h-20 overflow-hidden">
              "{review.text || 'Excellent experience!'}"
            </p>
            <div className="flex items-center justify-between">
              <p className="text-white font-bold">{review.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
