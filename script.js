document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const mainContent = document.getElementById("main-content");
  const portfolioContent = document.getElementById("portfolio-content");
  const contactContent = document.getElementById("contact-content");

  const prevToMain = document.getElementById("prevToMain");
  const nextToContact = document.getElementById("nextToContact");
  const navArrows = document.querySelector(".nav-arrows");
  const rightArrow = document.querySelector(".right-arrow");

  // 🔊 Sounds
  const startSound = new Audio("sounds/sparkle.wav");
  const navSound = new Audio("sounds/jump.wav");
  const blipSound = new Audio("sounds/blip.wav");
  blipSound.volume = 0.35; 
  const typingSound = new Audio("sounds/typing.wav");
  typingSound.loop = true;
  const backgroundMusic = new Audio("sounds/background.wav");
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.02;
  backgroundMusic.volume = 0;
  backgroundMusic.play();
  let vol = 0;
  const fadeIn = setInterval(() => {
    if (vol < 0.02) {
      vol += 0.002;
      backgroundMusic.volume = vol;
    } else {
      clearInterval(fadeIn);
    }
  }, 200);
    
  document.body.classList.add("portfolio-cursor");
  // Start music on first user interaction
     document.body.addEventListener("click", () => {
  if (currentSection === "intro") {
    startSound.currentTime = 0;
    startSound.play();
    backgroundMusic.play(); // ✅ Start music after user interaction
    showSection(mainContent);
    currentSection = "main";
    navArrows.style.display = "flex";
  }
  
});

      

  // Hide nav arrows during intro
  navArrows.style.display = "none";
  let currentSection = "intro";

  // ===== SHOW SECTION =====
  function showSection(section) {
    [intro, mainContent, portfolioContent, contactContent].forEach(s => s.style.display = "none");
    section.style.display = "block";
    triggerTypewriter(section);
    

 

    // Show/hide right arrow based on section
    rightArrow.style.display = (section === contactContent) ? "none" : "inline-block";
  }

  // ===== TYPEWRITER =====
  function triggerTypewriter(section) {
    const typewriters = section.querySelectorAll(".typewriter");
    typewriters.forEach(el => {
      const text = el.getAttribute("data-text") || "";
      el.textContent = "";
      let i = 0;

      typingSound.currentTime = 0;
      typingSound.play();

      const typing = setInterval(() => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          if (i % 3 === 0) {
            blipSound.currentTime = 0;
            blipSound.play();
          }
          i++;
        } else {
          clearInterval(typing);
          typingSound.pause();
        }
      }, 45);
    });
  }

  // ===== START GAME (intro click) =====
  document.body.addEventListener("click", () => {
    if (currentSection === "intro") {
      startSound.currentTime = 0;
      startSound.play();
      showSection(mainContent);
      currentSection = "main";
      navArrows.style.display = "flex";
    }
  });

  // ===== NEXT BUTTON =====
  nextToContact.addEventListener("click", (e) => {
    e.stopPropagation();
    navSound.currentTime = 0;
    navSound.play();

    if (currentSection === "main") {
      showSection(portfolioContent);
      currentSection = "portfolio";
    } else if (currentSection === "portfolio") {
      showSection(contactContent);
      currentSection = "contact";
    }
  });

  // ===== PREVIOUS BUTTON =====
  prevToMain.addEventListener("click", (e) => {
    e.stopPropagation();
    navSound.currentTime = 0;
    navSound.play();

    if (currentSection === "main") {
      showSection(intro);
      currentSection = "intro";
      navArrows.style.display = "none";
    } else if (currentSection === "portfolio") {
      showSection(mainContent);
      currentSection = "main";
    } else if (currentSection === "contact") {
      showSection(portfolioContent);
      currentSection = "portfolio";
    }
  });

 
  showSection(intro);
});
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextToContact.click();
    if (e.key === "ArrowLeft") prevToMain.click();
  });
  const avatars = document.querySelectorAll(".profile-container img");
  avatars.forEach(avatar => {
    avatar.classList.add("animate-stare");
  });
  function playAmbient(track) {
  const ambient = new Audio(`sounds/${track}`);
  ambient.loop = true;
  ambient.volume = 0.03;
  ambient.play();
}

