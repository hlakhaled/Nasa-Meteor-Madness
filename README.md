# Meteor Madness

**Meteor Madness** is an interactive web platform that simulates asteroid impacts and defense strategies using real NASA NEO API and USGS geological data. It offers an engaging and educational experience where users can explore planetary defense science through interactive games, 3D simulations, and informative content.

**Live Website:** [Meteor Madness](https://hlakhaled.github.io/Nasa-Meteor-Madness/#/)
![Meteor Madness Screenshot](https://github.com/user-attachments/assets/d3b40c5c-8e19-41e7-a594-c91a04df52a6)

---

## Features

### 1. Defend Earth Game 

**Defend Earth** is an interactive game where players prevent asteroid collisions using real physics-based strategies. It combines fun gameplay with educational insights into planetary defense.

**Highlights:**
- Select from **four deflection methods**: Nuclear, Gravity Tractor, Kinetic Impactor, Laser Ablation
- Adjust **power levels** and **angles** to optimize success
- **Real-time feedback** on mission probability
- Choose **2D or 3D visualizations** to watch missions unfold
- Features **levels, scoring, lives, and a scoreboard** for a gamified learning experience

**Screenshots:**

![Gameplay Interface](https://github.com/user-attachments/assets/cf641eaf-37b4-4e26-8974-e661d86c9b6b)
*Interactive setup and gameplay, showing how players plan asteroid deflection missions.*

![3D Visualization](https://github.com/user-attachments/assets/2e063931-2fe9-4e08-8070-e1c73dc61e5c)
*2D visualization of an asteroid approaching Earth during the simulation.*



### 2. Asteroid Simulations 🪐
- Dynamic **3D Earth visualization** with zoom functionality.
- Select any impact location and view:
  - Precise coordinates
  - Region names
  - Continent identification
- Choose **real NASA-verified asteroids** or **create custom asteroids**:
  - Define diameter, trajectory, velocity, and composition
- Physics-based collision simulation calculates:
  - Crater size
  - TNT-equivalent energy
  - Seismic magnitude
  - Tsunami predictions for coastal impacts
- Differentiates between **continental** and **coastal impacts** for secondary effects prediction.
- Uses **real orbital mechanics, impact energy formulas, and USGS topographical & seismic data** to make complex physics accessible.

### 3. Facts 📚
- Interactive cards delivering educational content on:
  - Asteroid fundamentals
  - Historical impacts
  - Astronomical phenomena
  - Defense strategies

---

## Benefits & Impact
- Makes **planetary defense science accessible** to all users.
- Provides a **hands-on learning experience** through simulation and gamification.
- Helps users understand **how physical parameters affect asteroid deflection**.
- Educates on **astronomical phenomena** and **global impact consequences**.

---

## Technologies Used
- React.js (Vite)
- Three.js / React Three Fiber (3D visualizations)
- NASA NEO API & USGS data
- Tailwind CSS (UI)
- GitHub Pages (Deployment)

---

## Live Demo
Check out the live project here: [Meteor Madness](https://hlakhaled.github.io/Nasa-Meteor-Madness/)

---

## Installation (for local development)
```bash
git clone https://github.com/<your-username>/Nasa-Meteor-Madness.git
cd Nasa-Meteor-Madness
npm install
npm run dev
