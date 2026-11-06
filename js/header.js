(function () {
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  var links = [
    { name: 'Home', href: 'index.html' },
    { name: 'About', href: 'about.html' },
    { name: 'Services', href: 'services.html' },
    { name: 'Industries', dropdown: true },
    { name: 'Strength', href: 'main.html' },
    { name: 'Contact', href: 'contact.html' }
  ];

  var industries = [
    ['Oil and Gas', 'oil-gas.html'],
    ['Construction', 'construction.html'],
    ['Manufacturing', 'manufacturing.html'],
    ['Trading', 'trading.html'],
    ['FMCG', 'fmcg.html'],
    ['Healthcare', 'healthcare.html']
  ];

  var industryActive = industries.some(function (i) {
    return i[1].toLowerCase() === page;
  });

  var menu = links.map(function (l) {
    if (l.dropdown) {
      var items = industries.map(function (i) {
        var cls = (i[1].toLowerCase() === page) ? ' active' : '';
        return '<a class="dropdown-item' + cls + '" href="' + i[1] + '">' + i[0] + '</a>';
      }).join('');
      return '<li class="nav-item dropdown' + (industryActive ? ' active' : '') + '">' +
        '<a class="nav-link dropdown-toggle js-dd-toggle" href="#" role="button" aria-haspopup="true" aria-expanded="false">' + l.name + '</a>' +
        '<div class="dropdown-menu js-dd-menu">' + items + '</div></li>';
    }
    var active = (page === l.href.toLowerCase()) ? ' active' : '';
    return '<li class="nav-item' + active + '"><a href="' + l.href + '" class="nav-link">' + l.name + '</a></li>';
  }).join('');

  var html =
  '<header class="site-header" id="site-header">' +
    '<div class="topbar d-none d-md-flex justify-content-between align-items-center">' +
      '<p class="mb-0 phone">' +
        '<a href="tel:+971566904927" class="mr-3"><span class="fa fa-phone mr-1"></span> +971 566904927</a>' +
        '<a href="mailto:magefreighteam@gmail.com"><span class="fa fa-paper-plane mr-1"></span> magefreighteam@gmail.com</a>' +
      '</p>' +
      '<div class="topbar-social">' +
        '<a href="#"><span class="fa fa-facebook"></span></a>' +
        '<a href="#"><span class="fa fa-instagram"></span></a>' +
      '</div>' +
    '</div>' +
    '<div class="quote-bar d-none d-md-block"><p class="text-center text-white py-2 mb-0">🚚 We move what moves you 💼</p></div>' +
    '<div class="quote-bar d-block d-md-none py-2">' +
      '<marquee behavior="scroll" direction="left" scrollamount="5" style="color:#fff;font-weight:600;font-size:16px;">🚚 We move what moves you 💼</marquee>' +
    '</div>' +
    '<nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light">' +
      '<div class="container-fluid nav-full">' +
        '<a class="navbar-brand" href="index.html"><img src="images/1/LOGO.jpg" alt="Mage Freight & Transport" class="logo img-fluid"></a>' +
        '<button class="navbar-toggler js-toggler" type="button" aria-expanded="false" aria-label="Toggle navigation"><span class="fa fa-bars"></span> Menu</button>' +
        '<div class="collapse navbar-collapse js-collapse"><ul class="navbar-nav ml-auto">' + menu + '</ul></div>' +
      '</div>' +
    '</nav>' +
  '</header>';

  document.write(html);

  var header   = document.getElementById('site-header');
  var toggler  = header.querySelector('.js-toggler');
  var collapse = header.querySelector('.js-collapse');
  var ddToggle = header.querySelector('.js-dd-toggle');
  var ddMenu   = header.querySelector('.js-dd-menu');

  function closeDropdown() {
    ddMenu.classList.remove('show');
    ddMenu.style.setProperty('display', 'none', 'important');
    ddToggle.setAttribute('aria-expanded', 'false');
  }
  function openDropdown() {
    ddMenu.classList.add('show');
    ddMenu.style.setProperty('display', 'block', 'important');
    ddToggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    collapse.classList.remove('show');
    toggler.setAttribute('aria-expanded', 'false');
    closeDropdown();
  }

  // Scroll: transparent -> white
  function onScroll() {
    if (collapse.classList.contains('show')) return;
    if (window.scrollY > 80) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger
  toggler.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (collapse.classList.contains('show')) {
      closeMenu();
    } else {
      collapse.classList.add('show');
      toggler.setAttribute('aria-expanded', 'true');
    }
  });

  // Industries
  ddToggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (ddMenu.classList.contains('show')) closeDropdown();
    else openDropdown();
  });

  // Dropdown item click -> close all
  ddMenu.addEventListener('click', function (e) {
    if (e.target.closest('.dropdown-item')) closeMenu();
  });

  // Normal link click -> close menu
  collapse.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // Outside click -> close all
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#site-header')) closeMenu();
  });

  // Desktop resize -> reset
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 992) {
      collapse.classList.remove('show');
      ddMenu.classList.remove('show');
      ddMenu.style.removeProperty('display');
      ddToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Start: dropdown closed
  closeDropdown();
})();