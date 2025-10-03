import React from "react";

import FactCard from "../components/FactCard";
import SizeCard from "../components/SizeCard";
import DefenseStrategies from "../components/DefenseStrategies";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import Header from "../components/Header";
import GradientCard from "../components/GradientCard";
const FunFacts = () => {
 

  const sizes = [
    {
      name: "House",
      size: "20m",
      damage: "Local destruction",
      color: "#FFE066",
      scale: 30,
    },
    {
      name: "Football Field",
      size: "100m",
      damage: "City damage",
      color: "#FF9933",
      scale: 45,
    },
    {
      name: "Eiffel Tower",
      size: "300m",
      damage: "Regional impact",
      color: "#FF6B6B",
      scale: 60,
    },
    {
      name: "Mount Everest",
      size: "9km",
      damage: "Global catastrophe",
      color: "#8B0000",
      scale: 75,
    },
  ];

  const funFacts = [
    {
      title: "Dinosaur Extinction",
      fact: "The asteroid that killed the dinosaurs was about 6 miles (10 km) wide and created a crater 93 miles (150 km) across in what is now Mexico's Yucatan Peninsula.",
      image: assets.DinosaurExtinction,
      severity: "Extinction",
    },
    {
      title: "Daily Visitors",
      fact: "About 44,000 pounds (20,000 kg) of meteoritic material falls to Earth every day, but most of it burns up in the atmosphere.",
      image: assets.DailyVisitors,
      severity: "Harmless",
    },
    {
      title: "Tunguska Event",
      fact: "In 1908, an asteroid or comet exploded over Siberia with the force of 1,000 atomic bombs, flattening 2,000 square kilometers of forest.",
      image: assets.TunguskaEvent,
      severity: "Regional",
    },
    {
      title: "Chelyabinsk Meteor",
      fact: "In 2013, a 20-meter asteroid exploded over Russia, creating a shockwave that damaged thousands of buildings and injured over 1,500 people.",
      image: assets.ChelyabinskMeteor,
      severity: "City",
    },
    {
      title: "Near Misses",
      fact: "Asteroid 2012 DA14 passed within 17,200 miles of Earth in 2013 - closer than many satellites. It was about 50 meters across.",
      image: assets.NearMisses,
      severity: "Close Call",
    },
    {
      title: "Earth's Shields",
      fact: "Our atmosphere protects us from most small asteroids. Objects smaller than 25 meters usually burn up completely before reaching the ground.",
      image: assets.Earthshields,
      severity: "Protected",
    },
    {
      title: "Impact Frequency",
      fact: "Asteroids large enough to cause regional damage (1 km across) hit Earth about once every 500,000 years on average.",
      image: assets.ImpactFrequency,
      severity: "Rare",
    },
    {
      title: "Speed Demons",
      fact: "Asteroids typically hit Earth at speeds between 25,000 and 160,000 mph (40,000-260,000 km/h). The faster they go, the more damage they cause.",
      image: assets.SpeedDemons,
      severity: "High Energy",
    },
  ];

  // Reusable fade/slide animation for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Header
          obj={{
            title: "Asteroid Fun Facts",
            description:
              "Discover fascinating facts about asteroids, meteor impacts, and how we defend our planet from cosmic threats.",
          }}
        ></Header>
      </motion.div>

      {/* Size Comparison */}
      <motion.div
        className="bg-gradient-to-r from-[#1a1a1a] to-[#2d1b4e] border border-[#8c58f3]/40 rounded-2xl p-6 sm:p-10 shadow-lg mb-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-normal mb-8 text-center">
          Asteroid Size Comparison
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {sizes.map((size, index) => (
            <SizeCard key={index} size={size} />
          ))}
        </div>
      </motion.div>

      {/* Fun Facts (keep card motion) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {" "}
        {funFacts.map((fact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {" "}
            <FactCard fact={fact} index={index} />{" "}
          </motion.div>
        ))}{" "}
      </div>

      {/* Defense Strategies */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <DefenseStrategies />
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="mt-12 text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <GradientCard
          title="Want to Test Your Skills?"
          desc="Try our asteroid deflection simulator or explore impact scenarios on
            the world map!"
        />
      </motion.div>
    </div>
  );
};

export default FunFacts;
