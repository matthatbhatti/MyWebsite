

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing features...');
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Animate hamburger icon
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Feedback Section Functions
    window.openFeedbackForm = function() {
        // You can replace this with your actual feedback form URL or modal
        alert('Thank you for your interest! Feedback form will be available soon. You can contact us at: feedback@prophetcomparison.com');
    };

    window.visitAgain = function() {
        alert('Thank you for visiting! We hope to see you back soon for more insights into the Minor Prophets.');
    };

    // Smooth Scrolling for Anchor Links (optimized with passive listener)
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }, { passive: true });
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Check system preference
        html.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        }
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate sections and cards on scroll
    document.querySelectorAll('section h2').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Staggered animation for prophet cards
    document.querySelectorAll('.prophet-card').forEach(function(card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.8s ease-out ${index * 0.1}s, transform 0.8s ease-out ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate chart wrappers on scroll
    document.querySelectorAll('.chart-wrapper').forEach(function(chart, index) {
        if (!chart.classList.contains('active')) {
            chart.style.opacity = '0';
            chart.style.transform = 'translateY(40px) scale(0.95)';
            chart.style.transition = `opacity 0.8s ease-out ${index * 0.2}s, transform 0.8s ease-out ${index * 0.2}s`;
            observer.observe(chart);
        }
    });

    // Click to show text functionality
    document.querySelectorAll('.prophet-card').forEach(function(card) {
        card.addEventListener('click', function() {
            // Toggle active class on clicked card
            card.classList.toggle('active');

            // Optional: Close other cards when one is opened
            document.querySelectorAll('.prophet-card').forEach(function(otherCard) {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
        });
    });

    // Set data-prophet on images for hover text
    document.querySelectorAll('.prophet-card').forEach(function(card) {
        const img = card.querySelector('img');
        const prophet = card.getAttribute('data-prophet');
        img.setAttribute('data-prophet', prophet);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const crossIcon = document.querySelector('.cross-icon');

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        // Navbar effect
        if (scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1rem 0';
        }

        // Parallax effect for hero
        if (hero) {
            hero.style.backgroundPositionY = `${scrollY * 0.5}px`;
        }

        // Parallax for cross icon
        if (crossIcon) {
            crossIcon.style.transform = `translate(-50%, -50%) translateY(${scrollY * 0.2}px)`;
        }
    });

    // Book Details Navigation
    initializeBookNavigation();

    // Reflection Questions Toggle
    initializeReflectionQuestions();

    // Initialize Charts immediately
    initializeCharts();

    // Initialize Chart Navigation with arrows and dots
    initializeChartNavigation();

    // Initialize Search functionality
    initializeSearch();

    // Add loading features
    addLoadingFeatures();

    // Enhance accessibility
    enhanceAccessibility();

    // Add share functionality
    addShareFunctionality();
});



function initializeBookNavigation() {
    const bookCards = document.querySelectorAll('.book-detail-card');
    const prevBtn = document.getElementById('prev-book');
    const nextBtn = document.getElementById('next-book');
    const dots = document.querySelectorAll('.dot');
    let currentBookIndex = 0;

    function showBook(index, direction = 'next') {
        const currentCard = document.querySelector('.book-detail-card.active');
        const nextCard = bookCards[index];

        if (currentCard && nextCard && currentCard !== nextCard) {
            // Add slide out animation to current card
            currentCard.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
            currentCard.style.opacity = '0';

            // After slide out, hide current and show next
            setTimeout(function() {
                currentCard.classList.remove('active');
                currentCard.style.transform = '';
                currentCard.style.opacity = '';

                nextCard.classList.add('active');
                nextCard.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
                nextCard.style.opacity = '0';

                // Slide in animation
                setTimeout(function() {
                    nextCard.style.transform = 'translateX(0)';
                    nextCard.style.opacity = '1';
                }, 50);
            }, 300);
        } else if (nextCard) {
            nextCard.classList.add('active');
        }

        // Update dots
        dots.forEach(function(dot, i) {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextBook() {
        currentBookIndex = (currentBookIndex + 1) % bookCards.length;
        showBook(currentBookIndex, 'next');
    }

    function prevBook() {
        currentBookIndex = (currentBookIndex - 1 + bookCards.length) % bookCards.length;
        showBook(currentBookIndex, 'prev');
    }

    function goToBook(index) {
        currentBookIndex = index;
        showBook(currentBookIndex);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevBook);
        nextBtn.addEventListener('click', nextBook);
    }

    // Add event listeners to dots
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            goToBook(index);
        });
    });

    // Initialize with first book
    showBook(currentBookIndex);
}





function initializeReflectionQuestions() {
    // Reflection Questions Toggle
    window.toggleAnswer = function(questionNumber) {
        const answer = document.getElementById('answer' + questionNumber);
        const arrow = document.getElementById('arrow' + questionNumber);
        const questionHeader = arrow.closest('.question-header');

        if (answer.style.display === 'block') {
            answer.style.display = 'none';
            arrow.textContent = '+';
            questionHeader.classList.remove('expanded');
        } else {
            answer.style.display = 'block';
            arrow.textContent = '-';
            questionHeader.classList.add('expanded');
        }
    };
}

// Initialize Charts
function initializeCharts() {
    console.log('Initializing charts...');

    // Ensure Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }

    // Writing Dates Timeline Chart
    const writingDatesCtx = document.getElementById('writingDatesChart');
    if (writingDatesCtx) {
        console.log('Creating writing dates chart...');

        // Clear any existing chart
        if (writingDatesCtx.chart) {
            writingDatesCtx.chart.destroy();
        }

        // Set canvas size properly
        const container = writingDatesCtx.parentElement;
        writingDatesCtx.width = container.offsetWidth;
        writingDatesCtx.height = 400;

        const writingDatesChart = new Chart(writingDatesCtx, {
            type: 'line',
            data: {
                labels: ['Joel', 'Amos', 'Hosea', 'Jonah', 'Micah', 'Nahum', 'Zephaniah', 'Habakkuk', 'Obadiah', 'Haggai', 'Zechariah', 'Malachi'],
                datasets: [{
                    label: 'Approximate Writing Date (BC)',
                    data: [835, 760, 750, 780, 735, 650, 640, 608, 586, 520, 520, 430],
                    borderColor: 'var(--primary-color)',
                    backgroundColor: 'rgba(139, 69, 19, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: 'var(--secondary-color)',
                    pointBorderColor: 'var(--primary-color)',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'var(--text-color)',
                            font: {
                                size: 14,
                                family: 'Poppins'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'var(--card-bg)',
                        titleColor: 'var(--primary-color)',
                        bodyColor: 'var(--text-color)',
                        borderColor: 'var(--secondary-color)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + ' BC';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(139, 69, 19, 0.1)'
                        },
                        ticks: {
                            color: 'var(--text-color)',
                            callback: function(value) {
                                return value + ' BC';
                            }
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(139, 69, 19, 0.1)'
                        },
                        ticks: {
                            color: 'var(--text-color)'
                        }
                    }
                }
            }
        });

        // Store chart instance for cleanup
        writingDatesCtx.chart = writingDatesChart;
    }

    // Interconnections Chart
    const interconnectionsCtx = document.getElementById('interconnectionsChart');
    if (interconnectionsCtx) {
        // Clear any existing chart
        if (interconnectionsCtx.chart) {
            interconnectionsCtx.chart.destroy();
        }

        // Set canvas size properly
        const container = interconnectionsCtx.parentElement;
        interconnectionsCtx.width = container.offsetWidth;
        interconnectionsCtx.height = 400;

        const interconnectionsChart = new Chart(interconnectionsCtx, {
            type: 'radar',
            data: {
                labels: ['Judgment', 'Mercy', 'Justice', 'Repentance', 'Faithfulness', 'Sovereignty'],
                datasets: [
                    {
                        label: 'Hosea',
                        data: [8, 9, 7, 8, 10, 6],
                        borderColor: 'var(--primary-color)',
                        backgroundColor: 'rgba(139, 69, 19, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: 'var(--primary-color)',
                        pointBorderColor: 'var(--text-color)',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Joel',
                        data: [8, 8, 6, 9, 7, 5],
                        borderColor: '#FFE4E1',
                        backgroundColor: 'rgba(255, 228, 225, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: '#FFE4E1',
                        pointBorderColor: 'var(--text-color)',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Amos',
                        data: [9, 6, 10, 7, 8, 7],
                        borderColor: 'var(--secondary-color)',
                        backgroundColor: 'rgba(212, 175, 55, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: 'var(--secondary-color)',
                        pointBorderColor: 'var(--text-color)',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Obadiah',
                        data: [10, 5, 8, 6, 7, 9],
                        borderColor: '#F0FFF0',
                        backgroundColor: 'rgba(240, 255, 240, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: '#F0FFF0',
                        pointBorderColor: 'var(--text-color)',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Jonah',
                        data: [6, 10, 5, 8, 9, 7],
                        borderColor: '#E6E6FA',
                        backgroundColor: 'rgba(230, 230, 250, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: '#E6E6FA',
                        pointBorderColor: 'var(--text-color)',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Micah',
                        data: [9, 8, 10, 7, 9, 6],
                        borderColor: '#228B22',
                        backgroundColor: 'rgba(34, 139, 34, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: '#228B22',
                        pointBorderColor: 'var(--text-color)',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Nahum',
                        data: [10, 4, 9, 5, 8, 8],
                        borderColor: '#DDA0DD',
                        backgroundColor: 'rgba(221, 160, 221, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: '#DDA0DD',
                        pointBorderColor: 'var(--text-color)',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Habakkuk',
                        data: [7, 6, 8, 9, 10, 9],
                        borderColor: '#FF6347',
                        backgroundColor: 'rgba(255, 99, 71, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: '#FF6347',
                        pointBorderColor: 'var(--text-color)',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Zephaniah',
                        data: [9, 7, 8, 10, 6, 8],
                        borderColor: '#9370DB',
                        backgroundColor: 'rgba(147, 112, 219, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: '#9370DB',
                        pointBorderColor: 'var(--text-color)',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Haggai',
                        data: [5, 9, 6, 7, 10, 8],
                        borderColor: '#FFF8DC',
                        backgroundColor: 'rgba(255, 248, 220, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: '#FFF8DC',
                        pointBorderColor: 'var(--text-color)',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Zechariah',
                        data: [7, 9, 8, 8, 9, 7],
                        borderColor: '#F0F8FF',
                        backgroundColor: 'rgba(240, 248, 255, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: '#F0F8FF',
                        pointBorderColor: 'var(--text-color)',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Malachi',
                        data: [8, 7, 9, 6, 10, 8],
                        borderColor: '#FAF0E6',
                        backgroundColor: 'rgba(250, 240, 230, 0.2)',
                        borderWidth: 2,
                        pointBackgroundColor: '#FAF0E6',
                        pointBorderColor: 'var(--text-color)',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'var(--text-color)',
                            font: {
                                size: 12,
                                family: 'Poppins'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'var(--card-bg)',
                        titleColor: 'var(--primary-color)',
                        bodyColor: 'var(--text-color)',
                        borderColor: 'var(--secondary-color)',
                        borderWidth: 1,
                        cornerRadius: 8
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                            stepSize: 2,
                            color: 'var(--text-color)'
                        },
                        grid: {
                            color: 'rgba(139, 69, 19, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(139, 69, 19, 0.1)'
                        },
                        pointLabels: {
                            color: 'var(--text-color)',
                            font: {
                                size: 12,
                                family: 'Poppins'
                            }
                        }
                    }
                }
            }
        });

        // Store chart instance for cleanup
        interconnectionsCtx.chart = interconnectionsChart;
    }

    // Minor Prophets Overview Chart
    const sixProphetsCtx = document.getElementById('sixProphetsChart');
    if (sixProphetsCtx) {
        // Clear any existing chart
        if (sixProphetsCtx.chart) {
            sixProphetsCtx.chart.destroy();
        }

        // Set canvas size properly
        const container = sixProphetsCtx.parentElement;
        sixProphetsCtx.width = container.offsetWidth;
        sixProphetsCtx.height = 400;

        const sixProphetsChart = new Chart(sixProphetsCtx, {
            type: 'pie',
            data: {
                labels: ['Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'],
                datasets: [{
                    label: 'Key Themes',
                    data: [18, 16, 20, 12, 17, 19, 17, 15, 14, 13, 21, 16], // Sample data representing theme emphasis
                    backgroundColor: [
                        '#FFB6C1', // Light pink - Hosea
                        '#FFE4E1', // Misty rose - Joel
                        '#FFFACD', // Lemon chiffon - Amos
                        '#F0FFF0', // Honeydew - Obadiah
                        '#E6E6FA', // Lavender - Jonah
                        '#F5DEB3', // Wheat - Micah
                        '#DDA0DD', // Plum - Nahum
                        '#FFE4B5', // Moccasin - Habakkuk
                        '#E0FFFF', // Light cyan - Zephaniah
                        '#FFF8DC', // Cornsilk - Haggai
                        '#F0F8FF', // Alice blue - Zechariah
                        '#FAF0E6'  // Linen - Malachi
                    ],
                    borderColor: 'var(--text-color)',
                    borderWidth: 2,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: 'var(--text-color)',
                            font: {
                                size: 10,
                                family: 'Poppins'
                            },
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'var(--card-bg)',
                        titleColor: 'var(--primary-color)',
                        bodyColor: 'var(--text-color)',
                        borderColor: 'var(--secondary-color)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                const prophet = context.label;
                                const prophetDetails = {
                                    'Hosea': { chapters: 14, verses: 197, theme: 'Covenant love and infidelity' },
                                    'Joel': { chapters: 3, verses: 73, theme: 'Day of the Lord and restoration' },
                                    'Amos': { chapters: 9, verses: 146, theme: 'Social justice and righteousness' },
                                    'Obadiah': { chapters: 1, verses: 21, theme: 'Judgment on Edom' },
                                    'Jonah': { chapters: 4, verses: 48, theme: 'God\'s mercy and compassion' },
                                    'Micah': { chapters: 7, verses: 105, theme: 'Social justice and restoration' },
                                    'Nahum': { chapters: 3, verses: 47, theme: 'Judgment on wickedness' },
                                    'Habakkuk': { chapters: 3, verses: 56, theme: 'Faith in God\'s sovereignty' },
                                    'Zephaniah': { chapters: 3, verses: 53, theme: 'Day of the Lord and purification' },
                                    'Haggai': { chapters: 2, verses: 38, theme: 'Temple rebuilding and presence' },
                                    'Zechariah': { chapters: 14, verses: 211, theme: 'Restoration and Messiah' },
                                    'Malachi': { chapters: 4, verses: 55, theme: 'Covenant faithfulness' }
                                };
                                const details = prophetDetails[prophet];
                                return [
                                    `${prophet}: ${details.theme}`,
                                    `Chapters: ${details.chapters}, Verses: ${details.verses}`
                                ];
                            }
                        }
                    }
                }
            }
        });

        // Store chart instance for cleanup
        sixProphetsCtx.chart = sixProphetsChart;
    }

    // Add resize handler to make charts stable
    window.addEventListener('resize', function() {
        if (writingDatesCtx && writingDatesCtx.chart) {
            writingDatesCtx.chart.resize();
        }
        if (interconnectionsCtx && interconnectionsCtx.chart) {
            interconnectionsCtx.chart.resize();
        }
        if (sixProphetsCtx && sixProphetsCtx.chart) {
            sixProphetsCtx.chart.resize();
        }
    });
}

// Initialize Chart Navigation
function initializeChartNavigation() {
    const chartWrappers = document.querySelectorAll('.chart-wrapper');
    const chartDots = document.querySelectorAll('.chart-dot');
    const prevBtn = document.getElementById('prev-chart');
    const nextBtn = document.getElementById('next-chart');
    let currentChartIndex = 0;

    // Initialize with first chart active
    showChart(currentChartIndex);

    function showChart(index) {
        chartWrappers.forEach(function(wrapper, i) {
            if (i === index) {
                wrapper.classList.add('active');
            } else {
                wrapper.classList.remove('active');
            }
        });

        chartDots.forEach(function(dot, i) {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextChart() {
        currentChartIndex = (currentChartIndex + 1) % chartWrappers.length;
        showChart(currentChartIndex);
    }

    function prevChart() {
        currentChartIndex = (currentChartIndex - 1 + chartWrappers.length) % chartWrappers.length;
        showChart(currentChartIndex);
    }

    function goToChart(index) {
        currentChartIndex = index;
        showChart(currentChartIndex);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevChart);
        nextBtn.addEventListener('click', nextChart);
    }

    chartDots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            goToChart(index);
        });
    });

    // Initialize with first chart
    showChart(currentChartIndex);
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('prophet-search');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    const suggestionsContainer = document.getElementById('search-suggestions');

    const prophetData = [
        {
            name: 'Hosea',
            theme: 'God\'s covenant love and faithfulness',
            sin: 'infidelity, idolatry',
            judgment: 'exile, removal of blessings',
            mercy: 'restoration, healing',
            character: 'patient, loving, faithful',
            responsibility: 'genuine repentance',
            writingDate: 'Around 750 BC',
            location: 'Northern Kingdom of Israel',
            chapters: 14,
            verses: 197
        },
        {
            name: 'Joel',
            theme: 'The Day of the Lord and restoration',
            sin: 'spiritual carelessness',
            judgment: 'Day of the Lord',
            mercy: 'restoration, Spirit outpouring',
            character: 'merciful, patient',
            responsibility: 'sincere repentance',
            writingDate: 'Around 835 BC',
            location: 'Judah',
            chapters: 3,
            verses: 73
        },
        {
            name: 'Amos',
            theme: 'Social justice and righteousness',
            sin: 'injustice, oppression',
            judgment: 'inevitable judgment',
            mercy: 'hope for the last days',
            character: 'just, righteous',
            responsibility: 'seek God, act justly',
            writingDate: 'Around 760 BC',
            location: 'Southern Kingdom',
            chapters: 9,
            verses: 146
        },
        {
            name: 'Obadiah',
            theme: 'Judgment on Edom and God\'s sovereignty',
            sin: 'pride, aggression',
            judgment: 'complete destruction',
            mercy: 'justice implies mercy',
            character: 'ultimate judge',
            responsibility: 'treat others justly',
            writingDate: 'Around 586 BC',
            location: 'Edom',
            chapters: 1,
            verses: 21
        },
        {
            name: 'Jonah',
            theme: 'God\'s mercy and compassion',
            sin: 'disobedience, lack of compassion',
            judgment: 'authority over nature',
            mercy: 'merciful to repentant',
            character: 'kind, compassionate',
            responsibility: 'share mercy, respond to call',
            writingDate: 'Around 780 BC',
            location: 'Nineveh',
            chapters: 4,
            verses: 48
        },
        {
            name: 'Micah',
            theme: 'Social justice, judgment, and restoration',
            sin: 'social injustice, oppression, corrupt leadership',
            judgment: 'invasion, destruction',
            mercy: 'restoration to the remnant',
            character: 'just, merciful, holy',
            responsibility: 'do justice, love mercy, walk humbly',
            writingDate: 'Around 735 BC',
            location: 'Judah',
            chapters: 7,
            verses: 105
        },
        {
            name: 'Nahum',
            theme: 'God\'s judgment on wickedness',
            sin: 'brutality, power',
            judgment: 'total devastation',
            mercy: 'refuge for faithful',
            character: 'strong, just',
            responsibility: 'trust God\'s justice',
            writingDate: 'Around 650 BC',
            location: 'Nineveh',
            chapters: 3,
            verses: 47
        },
        {
            name: 'Habakkuk',
            theme: 'Faith in God\'s sovereignty amid injustice',
            sin: 'violence, injustice',
            judgment: 'Babylonian conquest',
            mercy: 'righteous live by faith',
            character: 'sovereign, righteous',
            responsibility: 'live by faith',
            writingDate: 'Around 608 BC',
            location: 'Judah',
            chapters: 3,
            verses: 56
        },
        {
            name: 'Zephaniah',
            theme: 'The Day of the Lord and purification',
            sin: 'spiritual apathy, idolatry',
            judgment: 'Day of the Lord',
            mercy: 'gathering of the humble',
            character: 'jealous for purity',
            responsibility: 'seek righteousness, humility',
            writingDate: 'Around 640 BC',
            location: 'Judah',
            chapters: 3,
            verses: 53
        },
        {
            name: 'Haggai',
            theme: 'Rebuilding the temple and God\'s presence',
            sin: 'neglect of God\'s house',
            judgment: 'withholding of blessings',
            mercy: 'presence and blessing',
            character: 'faithful to promises',
            responsibility: 'rebuild temple, prioritize God',
            writingDate: 'Around 520 BC',
            location: 'Judah',
            chapters: 2,
            verses: 38
        },
        {
            name: 'Zechariah',
            theme: 'Restoration, cleansing, and Messiah',
            sin: 'disobedience, rebellion',
            judgment: 'scattering, judgment',
            mercy: 'restoration, good shepherding',
            character: 'covenant-keeping',
            responsibility: 'return to God',
            writingDate: 'Around 520 BC',
            location: 'Judah',
            chapters: 14,
            verses: 211
        },
        {
            name: 'Malachi',
            theme: 'Covenant faithfulness and coming judgment',
            sin: 'corrupt worship, broken marriages',
            judgment: 'judgment on unfaithfulness',
            mercy: 'refiner and healer',
            character: 'loving, covenant-keeping',
            responsibility: 'fear God, proper offerings',
            writingDate: 'Around 430 BC',
            location: 'Judah',
            chapters: 4,
            verses: 55
        }
    ];

    let currentSuggestions = [];
    let selectedSuggestionIndex = -1;

    function showSuggestions(query) {
        if (!query.trim() || !suggestionsContainer) return;

        const suggestions = prophetData.filter(function(prophet) {
            return prophet.name.toLowerCase().startsWith(query.toLowerCase());
        }).slice(0, 5);

        if (suggestions.length === 0) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        currentSuggestions = suggestions;
        selectedSuggestionIndex = -1;

        const suggestionsHTML = suggestions.map(function(prophet, index) {
            return `<div class="suggestion-item" data-index="${index}">
                <strong>${prophet.name}</strong> - ${prophet.theme} (${prophet.writingDate})
            </div>`;
        }).join('');

        suggestionsContainer.innerHTML = suggestionsHTML;
        suggestionsContainer.style.display = 'block';

        // Add click handlers for suggestions
        document.querySelectorAll('.suggestion-item').forEach(function(item, index) {
            item.addEventListener('click', function() {
                selectSuggestion(index);
            });
        });
    }

    function hideSuggestions() {
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
        selectedSuggestionIndex = -1;
    }

    function selectSuggestion(index) {
        if (currentSuggestions[index]) {
            searchInput.value = currentSuggestions[index].name;
            hideSuggestions();
            performSearch(currentSuggestions[index].name);
        }
    }

    function navigateSuggestions(direction) {
        if (currentSuggestions.length === 0) return;

        selectedSuggestionIndex += direction;

        if (selectedSuggestionIndex < 0) {
            selectedSuggestionIndex = currentSuggestions.length - 1;
        } else if (selectedSuggestionIndex >= currentSuggestions.length) {
            selectedSuggestionIndex = 0;
        }

        updateSuggestionHighlight();
    }

    function updateSuggestionHighlight() {
        document.querySelectorAll('.suggestion-item').forEach(function(item, index) {
            if (index === selectedSuggestionIndex) {
                item.classList.add('highlighted');
            } else {
                item.classList.remove('highlighted');
            }
        });
    }

    function performSearch(query) {
        hideSuggestions();

        if (!query.trim()) {
            searchResults.innerHTML = '<div class="search-placeholder"><p>✨ Start typing to search prophets...</p><p>Try searching by name, theme, or keywords like "justice", "mercy", "judgment"</p></div>';
            return;
        }

        const results = prophetData.filter(function(prophet) {
            const searchText = `${prophet.name} ${prophet.theme} ${prophet.sin} ${prophet.judgment} ${prophet.mercy} ${prophet.character} ${prophet.responsibility} ${prophet.location}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        if (results.length === 0) {
            // Show "did you mean" suggestions
            const similarResults = prophetData.filter(function(prophet) {
                const nameMatch = prophet.name.toLowerCase().includes(query.toLowerCase());
                const themeMatch = prophet.theme.toLowerCase().includes(query.toLowerCase());
                return nameMatch || themeMatch;
            });

            if (similarResults.length > 0) {
                searchResults.innerHTML = `
                    <div class="no-results">
                        <p>No exact matches found for "${query}"</p>
                        <p>Did you mean:</p>
                        <div class="suggestions-list">
                            ${similarResults.slice(0, 3).map(function(prophet) {
                                return `<button class="suggestion-btn" onclick="document.getElementById('prophet-search').value='${prophet.name}'; document.getElementById('search-btn').click();">${prophet.name}</button>`;
                            }).join('')}
                        </div>
                    </div>
                `;
            } else {
                searchResults.innerHTML = '<div class="no-results"><p>No prophets found matching your search. Try different keywords!</p></div>';
            }
            return;
        }

        const resultsHTML = results.map(function(prophet) {
            return `
                <div class="search-result-card creative-card">
                    <div class="card-header">
                        <h3>${prophet.name}</h3>
                        <div class="writing-info">
                            <span class="writing-date">📅 ${prophet.writingDate}</span>
                            <span class="location">📍 ${prophet.location}</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="theme-highlight">
                            <strong>🎯 Theme:</strong> ${prophet.theme}
                        </div>
                        <div class="book-stats">
                            <span>📖 ${prophet.chapters} chapters</span>
                            <span>📝 ${prophet.verses} verses</span>
                        </div>
                        <div class="key-insights">
                            <div class="insight-item">
                                <strong>⚖️ Main Sin:</strong> ${prophet.sin}
                            </div>
                            <div class="insight-item">
                                <strong>⚡ Judgment:</strong> ${prophet.judgment}
                            </div>
                            <div class="insight-item">
                                <strong>💝 Mercy:</strong> ${prophet.mercy}
                            </div>
                            <div class="insight-item">
                                <strong>👑 God's Character:</strong> ${prophet.character}
                            </div>
                            <div class="insight-item">
                                <strong>🙏 Human Responsibility:</strong> ${prophet.responsibility}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        searchResults.innerHTML = `<div class="search-results-container">${resultsHTML}</div>`;
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });

        searchInput.addEventListener('input', function() {
            const query = searchInput.value;
            if (query.length > 0) {
                showSuggestions(query);
            } else {
                hideSuggestions();
                performSearch('');
            }
        });

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                if (selectedSuggestionIndex >= 0) {
                    selectSuggestion(selectedSuggestionIndex);
                } else {
                    performSearch(searchInput.value);
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                navigateSuggestions(1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                navigateSuggestions(-1);
            } else if (e.key === 'Escape') {
                hideSuggestions();
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && (!suggestionsContainer || !suggestionsContainer.contains(e.target))) {
                hideSuggestions();
            }
        });
    }

    // Initialize with placeholder
    performSearch('');
}

// Add loading spinner and progress indicator
function addLoadingFeatures() {
    // Add loading spinner to body
    const loadingSpinner = document.createElement('div');
    loadingSpinner.id = 'loading-spinner';
    loadingSpinner.innerHTML = `
        <div class="spinner"></div>
        <p>Loading...</p>
    `;
    document.body.appendChild(loadingSpinner);

    // Hide loading spinner after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingSpinner.style.opacity = '0';
            setTimeout(function() {
                loadingSpinner.remove();
            }, 300);
        }, 500);
    });

    // Add back-to-top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.title = 'Back to top';
    document.body.appendChild(backToTopBtn);

    // Show/hide back-to-top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced accessibility features
function enhanceAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content landmark
    const hero = document.querySelector('.hero');
    if (hero) {
        const mainContent = document.createElement('div');
        mainContent.id = 'main-content';
        hero.parentNode.insertBefore(mainContent, hero.nextSibling);

        // Move all sections except nav and hero into main content
        const sections = document.querySelectorAll('section');
        sections.forEach(function(section) {
            mainContent.appendChild(section);
        });
    }

    // Improve keyboard navigation
    const focusableElements = document.querySelectorAll('button, a, input, [tabindex]');
    focusableElements.forEach(function(element) {
        element.addEventListener('focus', function() {
            element.style.outline = '2px solid var(--secondary-color)';
        });
        element.addEventListener('blur', function() {
            element.style.outline = '';
        });
    });
}

// Share functionality
function addShareFunctionality() {
    window.sharePage = function() {
        if (navigator.share) {
            navigator.share({
                title: 'Prophet Comparison – Context Guide',
                text: 'Explore the Minor Prophets and their messages through this interactive guide.',
                url: window.location.href
            });
        } else {
            // Fallback: copy URL to clipboard
            navigator.clipboard.writeText(window.location.href).then(function() {
                alert('Link copied to clipboard!');
            });
        }
    };
}




