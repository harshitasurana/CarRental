import React from "react";
import Title from "./Title";

const Testimonial = () => {
  const cardsData = [
  {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "Aarav Sharma",
    handle: "@aaravtravels",
    date: "April 20, 2025",
    review:
      "Booking a luxury car was super smooth. The vehicle was clean, well-maintained, and perfect for our family trip.",
  },
  {
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Priya Verma",
    handle: "@priyajourneys",
    date: "May 10, 2025",
    review:
      "Loved the seamless pickup and quick booking process. Driving a premium car made my business trip much more comfortable.",
  },
  {
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    name: "Rohan Mehta",
    handle: "@rohanrides",
    date: "June 5, 2025",
    review:
      "Great service and verified drivers gave me complete peace of mind. Highly recommended for hassle-free car rentals.",
  },
  {
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    name: "Sneha Kapoor",
    handle: "@snehatrips",
    date: "May 10, 2025",
    review:
      "The car felt brand new and the pricing was transparent. Perfect choice for weekend getaways with friends.",
  },
];


  // duplicate for infinite marquee feel
  const doubledCards = [...cardsData, ...cardsData];

  return (
    <div className="py-16 bg-light/50">

        <Title title="What Our Customers Say" subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world." />

      {/* Row 1 */}
      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

        <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
          {doubledCards.map((card, i) => (
            <TestimonialCard key={`row1-${i}`} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>

      {/* Row 2 */}
      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative mt-6">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-5 pb-10">
          {doubledCards.map((card, i) => (
            <TestimonialCard key={`row2-${i}`} card={card} />
          ))}
        </div>

        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </div>
  );
};

export default Testimonial;



// 🔹 Separate reusable card component
const TestimonialCard = ({ card }) => {
  return (
    <div className="p-4 rounded-lg mx-4 shadow hover:shadow-lg transition-all duration-200 w-72 shrink-0 bg-white">
      <div className="flex gap-2">
        <img className="size-11 rounded-full" src={card.image} alt="User" />

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-medium">{card.name}</p>

            {/* verified icon */}
            <svg
              className="mt-0.5"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.555.72a4 4 0 0 1-.297.24..."
                fill="#2196F3"
              />
            </svg>
          </div>

          <span className="text-xs text-slate-500">{card.handle}</span>
        </div>
      </div>

      <p className="text-sm pt-4 text-gray-800">
        {card.review}
      </p>
    </div>
  );
};
