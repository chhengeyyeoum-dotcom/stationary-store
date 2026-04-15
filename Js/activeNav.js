/**
 * Set active nav link based on current page
 */
function setActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Remove active class from all links
    link.classList.remove('active');
    
    // Add active class to matching link
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
    
    // Handle index.html and root path
    if ((currentPage === 'index.html' || currentPage === '') && href === 'index.html') {
      link.classList.add('active');
    }
  });
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', setActiveNavLink);
