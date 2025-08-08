// Team page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const departmentContents = document.querySelectorAll('.department-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTeam = button.getAttribute('data-team');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            departmentContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTeam).classList.add('active');
        });
    });

    // Organization chart department click functionality
    const chartDepartments = document.querySelectorAll('.chart-item.department');
    
    chartDepartments.forEach(department => {
        department.addEventListener('click', () => {
            const targetTeam = department.getAttribute('data-team');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            departmentContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to corresponding button and content
            document.querySelector(`[data-team="${targetTeam}"]`).classList.add('active');
            document.getElementById(targetTeam).classList.add('active');
            
            // Smooth scroll to department content
            document.querySelector('.team-departments').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Member card hover effects
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Social link functionality
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Here you can add actual LinkedIn URLs
            alert('LinkedIn profili açılacak');
        });
    });

    // Chart item hover effects
    const chartItems = document.querySelectorAll('.chart-item');
    
    chartItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });

    // Add animation to organization chart
    const chartContainer = document.querySelector('.chart-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    if (chartContainer) {
        chartContainer.style.opacity = '0';
        chartContainer.style.transform = 'translateY(30px)';
        chartContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(chartContainer);
    }

    // Add animation to member cards
    const memberObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    memberCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        memberObserver.observe(card);
    });

    // Department header animation
    const departmentHeaders = document.querySelectorAll('.department-header');
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });

    departmentHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateX(-30px)';
        header.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        headerObserver.observe(header);
    });

    // Tab button animation
    const tabObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    }, { threshold: 0.5 });

    tabButtons.forEach(button => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        button.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        tabObserver.observe(button);
    });
});

// Add CSS for additional animations
const teamStyles = document.createElement('style');
teamStyles.textContent = `
    .chart-item {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .chart-item:hover {
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    }
    
    .member-card {
        transition: all 0.3s ease;
    }
    
    .member-card:hover {
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }
    
    .social-link {
        transition: all 0.3s ease;
    }
    
    .social-link:hover {
        transform: scale(1.2);
        color: #0077b5;
    }
    
    .tab-btn {
        transition: all 0.3s ease;
    }
    
    .tab-btn:hover {
        transform: translateY(-2px);
    }
    
    .department-content {
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .department-content:not(.active) {
        display: none;
    }
    
    .department-content.active {
        display: block;
        animation: fadeInUp 0.6s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(teamStyles);
