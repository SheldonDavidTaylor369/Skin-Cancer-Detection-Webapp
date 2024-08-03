document.addEventListener('DOMContentLoaded', function() {
    const ribbon = document.querySelector('.animated__ribbon');
    
    function handleScroll() {
      const section = document.querySelector('.animated__container');
      const sectionTop = section.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;
      
      if (sectionTop < viewportHeight && sectionTop + section.offsetHeight > 0) {
        const scrollPercentage = Math.min((viewportHeight - sectionTop) / viewportHeight, 1);
        ribbon.style.transform = `translateX(${scrollPercentage * 100}%) translateY(-50%)`;
        ribbon.style.opacity = scrollPercentage;
      } else {
        ribbon.style.transform = 'translateX(-100%) translateY(-50%)';
        ribbon.style.opacity = 0;
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
  
    // Add functionality for form submission
    const form = document.querySelector('header form');
    if (form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting and reloading the page
        alert('Appointment taken. Please head to the laboratory blog.');
      });
    }
  });
  