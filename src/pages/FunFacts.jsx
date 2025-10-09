import React, { useState } from "react";
import { motion } from "framer-motion";
import { asteroidFacts } from "../data/asteroidFacts";
import { sizes } from "../data/asteroidSizes";
import FactCard from "../components/FactCard";
import SizeCard from "../components/SizeCard";
import DefenseStrategies from "../components/DefenseStrategies";
import Header from "../components/Header";
import GradientCard from "../components/GradientCard";
import { FactCardModal } from "../components/FactCardModal";

const FunFacts = () => {
  const [selectedFactIndex, setSelectedFactIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleFacts = showAll ? asteroidFacts : asteroidFacts.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12 relative">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Header
          obj={{
            title: "🌑 Asteroid Facts",
            description:
              "Discover fascinating stories about cosmic impacts and how we defend Earth from celestial threats.",
          }}
        />
      </motion.div>

      {/* Size Comparison */}
      <motion.div
        className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#2d1b4e]/90 border border-[#8c58f3]/50 rounded-2xl p-6 shadow-2xl mb-12 backdrop-blur-sm"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-white text-2xl lg:text-3xl font-semibold mb-8 text-center">
          Asteroid Size Comparison
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {sizes.map((size, index) => (
            <SizeCard key={index} size={size} />
          ))}
        </div>
      </motion.div>

      {/* Fun Facts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {visibleFacts.map((fact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(140, 88, 243, 0.5)",
            }}
          >
            <FactCard
              fact={fact}
              index={index}
              onOpen={() => setSelectedFactIndex(index)}
            />
          </motion.div>
        ))}
      </div>

      {/* Show More / Show Less */}
      {asteroidFacts.length > 6 && (
        <div className="text-center mb-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 rounded-xl bg-[#2d1b4e] border-2 border-[#8c58f3] text-white font-medium hover:bg-[#8c58f3] hover:text-white transition-all shadow-lg"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedFactIndex !== null && (
        <FactCardModal
          facts={asteroidFacts}
          initialIndex={selectedFactIndex}
          isOpen={true}
          onClose={() => setSelectedFactIndex(null)}
        />
      )}

      {/* Defense Strategies */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <DefenseStrategies />
      </motion.div>

      {/* CTA */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <GradientCard
          title="Want to Test Your Skills?"
          desc="Try our asteroid deflection simulator or explore impact scenarios on the world map!"
        />
      </motion.div>
    </div>
  );
};

export default FunFacts;
