// hero.js

// Import GSAP and ScrollTrigger plugin
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Wait for DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
  // Check if current page is the homepage; exit if not
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  // Register ScrollTrigger plugin with GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Select hero image element
  const heroImg = document.querySelector(".hero-img img");
  let currentImageIndex = 0; // Tracks current image in sequence

  const projectImages = [
    "/images/work-items/kssem-Clg-ERP-Dashboard.png",
    "/images/work-items/IPL-Dashboard.png",
    "/images/work-items/Dashboard-Chain-of-Thought.png",
    "/images/work-items/nanoGPT-interface.png",
    "/images/work-items/chat-bot.png",
    "/images/work-items/weather-cli-gif.gif",
    "/images/work-items/Dsa-Study-Hub-Homepage.png",
    "/images/work-items/CRYPTVAULT.png",
    "/images/work-items/voting-system.png",
    "/images/work-items/costoflivingbenagluru.png"
  ];
  const totalImages = projectImages.length; // Total number of images for cycling
  let scrollTriggerInstance = null; // Stores ScrollTrigger instance for cleanup

  // Cycle through images every 250ms
  setInterval(() => {
    // Increment image index, reset to 0 if it reaches totalImages
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    // Update hero image source
    heroImg.src = projectImages[currentImageIndex];
  }, 250);

  // Initialize animations with ScrollTrigger
  const initAnimations = () => {
    // Kill existing ScrollTrigger instance to prevent duplicates
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }

    // Create new ScrollTrigger instance
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: ".hero-img-holder", // Element that triggers animation
      start: "top bottom", // Animation starts when top of trigger hits bottom of viewport
      end: "top top", // Animation ends when top of trigger hits top of viewport
      onUpdate: (self) => {
        const progress = self.progress; // Scroll progress (0 to 1)
        // Animate hero image properties based on scroll progress
        gsap.set(".hero-img", {
          y: `${-110 + 110 * progress}%`, // Move up from -110% to 0%
          scale: 0.25 + 0.75 * progress, // Scale from 0.25 to 1
          rotation: -15 + 15 * progress, // Rotate from -15deg to 0deg
        });
      },
    });
  };

  // Run animations on page load
  initAnimations();

  // Re-run animations on window resize to recalculate trigger points
  window.addEventListener("resize", () => {
    initAnimations();
  });
});