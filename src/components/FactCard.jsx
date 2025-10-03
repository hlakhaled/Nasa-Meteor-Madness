import React from "react";

function FactCard({ fact, index }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Extinction":
        return "#8B0000";
      case "Regional":
        return "#FF3333";
      case "City":
        return "#BD7716";
      case "Close Call":
        return "#888A3F";
      case "Rare":
        return "#9370DB";
      case "High Energy":
        return "#FF6B6B";
      default:
        return "#4CAF50";
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d1b4e] border-2 border-[#8c58f3] rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:border-[#a566ff]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-normal text-xl md:text-2xl group-hover:text-[#a566ff] transition-colors">
          {fact.title}
        </h3>
        <div
          className="px-3 py-1 rounded-full font-bold text-white font-['Inter'] text-xs"
          style={{ backgroundColor: getSeverityColor(fact.severity) }}
        >
          {fact.severity}
        </div>
      </div>

      {/* Image */}
      {fact.image && (
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
          <img
            src={fact.image}
            alt={fact.title}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Fact text */}
      <p className="font-['Inter'] text-xs sm:text-sm font-light mb-4 line-clamp-3">
        {fact.fact}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="text-[#8c58f3] text-sm font-bold font-['Inter']">
          Fact #{index + 1}
        </div>
        <div className="w-8 h-8 bg-[#8c58f3] rounded-full flex items-center justify-center">
          <span className="text-white text-[20px]">💫</span>
        </div>
      </div>
    </div>
  );
}

export default FactCard;
