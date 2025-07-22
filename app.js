// Application Data
const appData = {
  "services": [
    {
      "title": "Birth Chart Analysis",
      "description": "Comprehensive natal chart reading revealing your personality, strengths, and life path",
      "features": ["Planetary positions analysis", "Life predictions", "Career guidance", "Relationship insights"],
      "price": "₹999"
    },
    {
      "title": "Marriage Compatibility",
      "description": "Traditional Kundali Milan with modern insights for perfect matrimonial matches",
      "features": ["36 Guna matching", "Dosha analysis", "Compatibility score", "Remedial solutions"],
      "price": "₹799"
    },
    {
      "title": "Future Predictions",
      "description": "Detailed forecasting for upcoming years with guidance and preparations",
      "features": ["5-year predictions", "Monthly forecasts", "Auspicious timing", "Warning periods"],
      "price": "₹1299"
    },
    {
      "title": "Parental Guidance",
      "description": "Astrological insights for your children's bright future and potential",
      "features": ["Educational guidance", "Career predictions", "Health insights", "Name suggestions"],
      "price": "₹699"
    }
  ],
  "testimonials": [
    {
      "name": "Priya Sharma",
      "location": "Mumbai",
      "rating": 5,
      "text": "The marriage compatibility reading was incredibly accurate! We found our perfect match and are happily married now."
    },
    {
      "name": "Rajesh Kumar", 
      "location": "Delhi",
      "rating": 5,
      "text": "The birth chart analysis gave me clarity about my career path. Now I'm successfully running my own business."
    },
    {
      "name": "Meera Singh",
      "location": "Bangalore",
      "rating": 5,
      "text": "As a parent, the guidance for my daughter's future was invaluable. The predictions have been spot on."
    }
  ],
  "zodiacSigns": [
    {"name": "Aries", "symbol": "♈", "dates": "Mar 21 - Apr 19"},
    {"name": "Taurus", "symbol": "♉", "dates": "Apr 20 - May 20"},
    {"name": "Gemini", "symbol": "♊", "dates": "May 21 - Jun 20"},
    {"name": "Cancer", "symbol": "♋", "dates": "Jun 21 - Jul 22"},
    {"name": "Leo", "symbol": "♌", "dates": "Jul 23 - Aug 22"},
    {"name": "Virgo", "symbol": "♍", "dates": "Aug 23 - Sep 22"},
    {"name": "Libra", "symbol": "♎", "dates": "Sep 23 - Oct 22"},
    {"name": "Scorpio", "symbol": "♏", "dates": "Oct 23 - Nov 21"},
    {"name": "Sagittarius", "symbol": "♐", "dates": "Nov 22 - Dec 21"},
    {"name": "Capricorn", "symbol": "♑", "dates": "Dec 22 - Jan 19"},
    {"name": "Aquarius", "symbol": "♒", "dates": "Jan 20 - Feb 18"},
    {"name": "Pisces", "symbol": "♓", "dates": "Feb 19 - Mar 20"}
  ]
};

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = 'light';
    this.init();
  }

  init() {
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.theme = 'dark';
    }
    
    this.applyTheme();
    this.setupToggle();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-color-scheme', this.theme);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.textContent = this.theme === 'dark' ? '☀️' : '🌙';
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
  }

  setupToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupNavLinks();
    this.setupScrollspy();
  }

  setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });

      // Close menu when clicking nav links
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
        });
      });
    }
  }

  setupNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  setupScrollspy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 100;
      
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => link.classList.remove('active'));
          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    });
  }
}

// Birth Chart Generator
class BirthChartGenerator {
  constructor() {
    this.form = document.getElementById('birthChartForm');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    this.renderZodiacWheel();
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    if (!this.validateForm(data)) return;

    this.showLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.showLoading(false);
    this.generateChart(data);
  }

  validateForm(data) {
    const required = ['fullName', 'birthDate', 'birthTime', 'birthLocation', 'mobileNumber'];
    const errors = [];

    required.forEach(field => {
      if (!data[field]) {
        errors.push(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
      }
    });

    if (data.mobileNumber && !/^\+?[\d\s-]{10,}$/.test(data.mobileNumber)) {
      errors.push('Please enter a valid mobile number');
    }

    if (errors.length > 0) {
      this.showMessage(errors.join('<br>'), 'error');
      return false;
    }

    return true;
  }

  showLoading(show) {
    const btnText = this.form.querySelector('.btn-text');
    const btnLoading = this.form.querySelector('.btn-loading');
    const submitBtn = this.form.querySelector('button[type="submit"]');

    if (show) {
      btnText.classList.add('hidden');
      btnLoading.classList.remove('hidden');
      submitBtn.disabled = true;
    } else {
      btnText.classList.remove('hidden');
      btnLoading.classList.add('hidden');
      submitBtn.disabled = false;
    }
  }

  generateChart(data) {
    const resultsContainer = document.getElementById('chartResults');
    const userSign = this.getZodiacSign(data.birthDate);
    
    // Show results
    resultsContainer.classList.remove('hidden');
    
    // Set user's zodiac sign
    const userSignElement = document.getElementById('userSign');
    if (userSignElement) {
      userSignElement.textContent = userSign.symbol;
    }

    // Generate predictions
    this.generatePredictions(data, userSign);
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });

    this.showMessage('Birth chart generated successfully! 🌟', 'success');
  }

  getZodiacSign(birthDate) {
    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const signs = [
      { name: 'Capricorn', symbol: '♑', start: [12, 22], end: [1, 19] },
      { name: 'Aquarius', symbol: '♒', start: [1, 20], end: [2, 18] },
      { name: 'Pisces', symbol: '♓', start: [2, 19], end: [3, 20] },
      { name: 'Aries', symbol: '♈', start: [3, 21], end: [4, 19] },
      { name: 'Taurus', symbol: '♉', start: [4, 20], end: [5, 20] },
      { name: 'Gemini', symbol: '♊', start: [5, 21], end: [6, 20] },
      { name: 'Cancer', symbol: '♋', start: [6, 21], end: [7, 22] },
      { name: 'Leo', symbol: '♌', start: [7, 23], end: [8, 22] },
      { name: 'Virgo', symbol: '♍', start: [8, 23], end: [9, 22] },
      { name: 'Libra', symbol: '♎', start: [9, 23], end: [10, 22] },
      { name: 'Scorpio', symbol: '♏', start: [10, 23], end: [11, 21] },
      { name: 'Sagittarius', symbol: '♐', start: [11, 22], end: [12, 21] }
    ];

    for (const sign of signs) {
      const [startMonth, startDay] = sign.start;
      const [endMonth, endDay] = sign.end;
      
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return sign;
      }
    }

    return signs[0]; // Default to Capricorn
  }

  generatePredictions(data, sign) {
    const predictions = {
      lifePath: [
        `As a ${sign.name}, your cosmic journey is marked by strength and determination. The stars indicate a period of significant growth approaching in your life.`,
        `Your birth chart reveals powerful planetary alignments that suggest leadership qualities and natural intuition guiding your path forward.`,
        `The celestial configuration at your birth time shows a harmonious balance of elements, indicating success through perseverance and wisdom.`
      ],
      careerInsights: [
        `Your professional realm is illuminated by favorable planetary positions. Expect recognition and advancement in your chosen field within the next 6-12 months.`,
        `The alignment suggests entrepreneurial success and creative endeavors will flourish. Trust your instincts when making career decisions.`,
        `Your chart indicates strong communication skills and natural leadership abilities that will open doors to new opportunities.`
      ],
      relationships: [
        `Love and companionship are strongly favored in your chart. If single, meaningful connections await. If partnered, deeper bonds will form.`,
        `Family relationships show signs of harmony and mutual understanding. Your nurturing nature will strengthen existing bonds.`,
        `The stars suggest that your empathetic nature and loyalty will attract like-minded souls into your life circle.`
      ]
    };

    // Randomly select predictions
    document.getElementById('lifePath').textContent = predictions.lifePath[Math.floor(Math.random() * predictions.lifePath.length)];
    document.getElementById('careerInsights').textContent = predictions.careerInsights[Math.floor(Math.random() * predictions.careerInsights.length)];
    document.getElementById('relationships').textContent = predictions.relationships[Math.floor(Math.random() * predictions.relationships.length)];
  }

  renderZodiacWheel() {
    const wheelContainer = document.getElementById('zodiacWheel');
    if (!wheelContainer) return;

    const radius = 110;
    const centerX = 130;
    const centerY = 130;

    appData.zodiacSigns.forEach((sign, index) => {
      const angle = (index * 30) - 90; // 30 degrees apart, starting from top
      const radian = (angle * Math.PI) / 180;
      
      const x = centerX + radius * Math.cos(radian);
      const y = centerY + radius * Math.sin(radian);
      
      const signElement = document.createElement('div');
      signElement.className = 'zodiac-sign';
      signElement.textContent = sign.symbol;
      signElement.title = `${sign.name} (${sign.dates})`;
      signElement.style.left = `${x}px`;
      signElement.style.top = `${y}px`;
      
      wheelContainer.appendChild(signElement);
    });
  }

  showMessage(message, type) {
    const messageContainer = document.getElementById('messageContainer');
    if (!messageContainer) return;

    messageContainer.innerHTML = `
      <div class="status status--${type}" style="margin-bottom: 8px;">
        ${message}
      </div>
    `;
    messageContainer.classList.remove('hidden');

    setTimeout(() => {
      messageContainer.classList.add('hidden');
    }, 5000);
  }
}

// Contact Form Handler
class ContactFormHandler {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);
    
    if (!this.validateForm(data)) return;

    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    this.showMessage('Thank you for your message! We will contact you soon. 🙏', 'success');
    this.form.reset();
  }

  validateForm(data) {
    const required = ['contactName', 'contactEmail', 'contactPhone', 'contactMessage'];
    const errors = [];

    required.forEach(field => {
      if (!data[field]) {
        errors.push(`${field.replace('contact', '').replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
      }
    });

    if (data.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail)) {
      errors.push('Please enter a valid email address');
    }

    if (data.contactPhone && !/^\+?[\d\s-]{10,}$/.test(data.contactPhone)) {
      errors.push('Please enter a valid phone number');
    }

    if (errors.length > 0) {
      this.showMessage(errors.join('<br>'), 'error');
      return false;
    }

    return true;
  }

  showMessage(message, type) {
    const messageContainer = document.getElementById('messageContainer');
    if (!messageContainer) return;

    messageContainer.innerHTML = `
      <div class="status status--${type}" style="margin-bottom: 8px;">
        ${message}
      </div>
    `;
    messageContainer.classList.remove('hidden');

    setTimeout(() => {
      messageContainer.classList.add('hidden');
    }, 5000);
  }
}

// Content Renderer
class ContentRenderer {
  constructor() {
    this.renderServices();
    this.renderTestimonials();
  }

  renderServices() {
    const container = document.getElementById('servicesContainer');
    if (!container) return;

    container.innerHTML = appData.services.map(service => `
      <div class="service-detailed-card">
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <ul class="features-list">
          ${service.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <div class="flex items-center justify-between" style="margin-top: 16px;">
          <span class="price" style="font-size: 20px; font-weight: 600;">${service.price}</span>
          <button class="btn btn--primary btn--sm" onclick="scrollToSection('contact')">Book Now</button>
        </div>
      </div>
    `).join('');
  }

  renderTestimonials() {
    const container = document.getElementById('testimonialsContainer');
    if (!container) return;

    container.innerHTML = appData.testimonials.map(testimonial => `
      <div class="testimonial-card">
        <div class="rating" style="margin-bottom: 12px;">
          ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
        </div>
        <p>"${testimonial.text}"</p>
        <div style="margin-top: 16px;">
          <strong>${testimonial.name}</strong><br>
          <small style="color: var(--color-text-secondary);">${testimonial.location}</small>
        </div>
      </div>
    `).join('');
  }
}

// Utility Functions
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new NavigationManager();
  new BirthChartGenerator();
  new ContactFormHandler();
  new ContentRenderer();

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});