// Import the necessary Jest DOM manipulation tools
const { JSDOM } = require('jsdom');

// Create a mock DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// Mock the script.js file
jest.mock('../../../assets/js/script.js', () => {
  // This will be executed when the script is imported
  const header = document.createElement('header');
  header.setAttribute('data-header', '');
  document.body.appendChild(header);

  const navToggleBtn = document.createElement('button');
  navToggleBtn.setAttribute('data-nav-toggle-btn', '');
  document.body.appendChild(navToggleBtn);

  const navbarLink = document.createElement('a');
  navbarLink.setAttribute('data-nav-link', '');
  document.body.appendChild(navbarLink);

  const myProfileBtn = document.createElement('button');
  myProfileBtn.id = 'myProfileBtn';
  document.body.appendChild(myProfileBtn);

  const closeBtn = document.createElement('button');
  closeBtn.id = 'closeBtn';
  document.body.appendChild(closeBtn);

  const profileDashboard = document.createElement('div');
  profileDashboard.id = 'profileDashboard';
  profileDashboard.classList.add('hidden');
  document.body.appendChild(profileDashboard);

  const backTopBtn = document.createElement('button');
  backTopBtn.setAttribute('data-back-to-top', '');
  document.body.appendChild(backTopBtn);

  // Import and execute the actual script
  require('../../../assets/js/script.js');
}, { virtual: true });

describe('Navbar Toggle Functionality', () => {
  test('should toggle nav-active class on header and active class on button when nav toggle button is clicked', () => {
    const header = document.querySelector('[data-header]');
    const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');
    
    navToggleBtn.click();
    
    expect(header.classList.contains('nav-active')).toBe(true);
    expect(navToggleBtn.classList.contains('active')).toBe(true);
    
    navToggleBtn.click();
    
    expect(header.classList.contains('nav-active')).toBe(false);
    expect(navToggleBtn.classList.contains('active')).toBe(false);
  });
});

describe('Navbar Link Functionality', () => {
  test('should toggle nav-active class on header and active class on nav toggle button when a navbar link is clicked', () => {
    const header = document.querySelector('[data-header]');
    const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');
    const navbarLink = document.querySelector('[data-nav-link]');
    
    navbarLink.click();
    
    expect(header.classList.contains('nav-active')).toBe(true);
    expect(navToggleBtn.classList.contains('active')).toBe(true);
    
    navbarLink.click();
    
    expect(header.classList.contains('nav-active')).toBe(false);
    expect(navToggleBtn.classList.contains('active')).toBe(false);
  });
});

describe('Profile Dashboard Functionality', () => {
  test('should remove hidden class from profile dashboard when myProfileBtn is clicked', () => {
    const myProfileBtn = document.getElementById('myProfileBtn');
    const profileDashboard = document.getElementById('profileDashboard');
    
    myProfileBtn.click();
    
    expect(profileDashboard.classList.contains('hidden')).toBe(false);
  });

  test('should add hidden class to profile dashboard when closeBtn is clicked', () => {
    const closeBtn = document.getElementById('closeBtn');
    const profileDashboard = document.getElementById('profileDashboard');
    
    closeBtn.click();
    
    expect(profileDashboard.classList.contains('hidden')).toBe(true);
  });
});

describe('Scroll Functionality', () => {
  test('should add active class to header and back-to-top button when scrollY is >= 100', () => {
    const header = document.querySelector('[data-header]');
    const backTopBtn = document.querySelector('[data-back-to-top]');
    
    // Simulate scrolling
    Object.defineProperty(window, 'scrollY', {value: 100, configurable: true});
    window.dispatchEvent(new Event('scroll'));
    
    expect(header.classList.contains('active')).toBe(true);
    expect(backTopBtn.classList.contains('active')).toBe(true);
  });

  test('should remove active class from header and back-to-top button when scrollY is < 100', () => {
    const header = document.querySelector('[data-header]');
    const backTopBtn = document.querySelector('[data-back-to-top]');
    
    // Simulate scrolling
    Object.defineProperty(window, 'scrollY', {value: 99, configurable: true});
    window.dispatchEvent(new Event('scroll'));
    
    expect(header.classList.contains('active')).toBe(false);
    expect(backTopBtn.classList.contains('active')).toBe(false);
  });
});