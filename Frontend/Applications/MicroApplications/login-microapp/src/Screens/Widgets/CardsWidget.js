import React from "react";
import { BanknotesIcon, BellIcon, UserIcon } from "@heroicons/react/24/outline";

const CardsWidget = () => {
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
  if (!cards.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition duration-300"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">{card.title}</div>
            {card.icon && (
              <card.icon className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div className="text-2xl font-semibold text-gray-900">{card.value}</div>
          {card.subtitle && (
            <div className="text-xs text-gray-400 mt-1">{card.subtitle}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardsWidget;
