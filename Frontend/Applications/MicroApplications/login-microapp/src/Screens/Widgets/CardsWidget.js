import React, { useEffect, useRef, useState } from "react";
import { BanknotesIcon, BellIcon, UserIcon } from "@heroicons/react/24/outline";

const CardsWidget = () => {
  const scrollRef = useRef(null);
  const cardRef = useRef(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  const cards = [
    {
      title: "Balance",
      value: "$12,450",
      subtitle: "Updated 1h ago",
      icon: BanknotesIcon,
    },
    {
      title: "Notifications",
      value: "3",
      subtitle: "Unread",
      icon: BellIcon,
    },
    {
      title: "Profile Views",
      value: "1,245",
      subtitle: "This week",
      icon: UserIcon,
    },
  ];

  // Dynamically measure width
  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth + 30); // 30px gap
    }
  }, []);

  // Autoscroll logic with pause
  useEffect(() => {
    if (paused || cardWidth === 0) return;
    const interval = setInterval(() => {
      const nextIndex = (cardIndex + 1) % cards.length;
      const scrollLeft = nextIndex * cardWidth;
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }

      setCardIndex(nextIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [cardIndex, cardWidth, paused, cards.length]);

  return (
    <div className="bg-white overflow-y-hidden h-full">
      <div ref={scrollRef} className="overflow-x-auto">
        <div className="flex gap-[30px] pl-4 pt-4 pb-4 h-44">
          {cards.map((card, idx) => (
            <div
              key={idx}
              ref={idx === 0 ? cardRef : null}
              className="min-w-[80%] sm:min-w-[300px] bg-white p-4 rounded-2xl hover:bg-gray-200 shadow hover:shadow-lg transition duration-300"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-500">
                  {card.title}
                </div>
                {card.icon && <card.icon className="w-5 h-5 text-gray-400" />}
              </div>
              <div className="text-2xl font-semibold text-gray-900">
                {card.value}
              </div>
              <div className="text-sm text-gray-400 mt-1">{card.subtitle}</div>
            </div>
          ))}
          <div className="min-w-[3%]" />
        </div>
      </div>
    </div>
  );
};

export default CardsWidget;
