/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

//testemunhos carrousel
document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".testimonials-slider", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

  document.addEventListener("DOMContentLoaded", function () {
  
      const projects = {
        1: {
          title: "Residência Moderna",
          category: "Arquitetura Residencial",
          client: "Família Souza",
          date: "10 Janeiro, 2022",
          url: "www.arquiteturasouza.com",
          images: ["assets/img/portfolio/projetos/p1.jpeg"],
          description: "Projeto de uma residência moderna e sustentável, com integração de espaços verdes."
        },
        2: {
          title: "Edifício Corporativo",
          category: "Arquitetura Comercial",
          client: "TechCorp",
          date: "25 Março, 2021",
          url: "www.techcorp.com",
          images: ["assets/img/portfolio/projetos/p2.jpeg"],
          description: "Design de um edifício comercial com foco em eficiência energética e estética contemporânea."
        },
        3: {
          title: "Praça Urbana",
          category: "Urbanismo",
          client: "Prefeitura Municipal",
          date: "15 Junho, 2020",
          url: "www.prefeituraurbana.com",
          images: ["assets/img/portfolio/projetos/p3.jpeg"],
          description: "Planejamento urbano para revitalização de uma praça pública, promovendo interação social e lazer."
        },
        4: {
          title: "Residencial de Luxo",
          category: "Arquitetura Residencial",
          client: "Construtora Premium",
          date: "08 Dezembro, 2022",
          url: "www.construtorapremium.com",
          images: ["assets/img/portfolio/projetos/p4.jpeg"],
          description: "Projeto de condomínio de alto padrão, com design sofisticado e tecnologia integrada."
        },
        5: {
          title: "Biblioteca Municipal",
          category: "Arquitetura Cultural",
          client: "Secretaria de Cultura",
          date: "12 Fevereiro, 2019",
          url: "www.bibliotecamunicipal.com",
          images: ["assets/img/portfolio/projetos/p5.jpeg"],
          description: "Criação de um espaço moderno para incentivar a leitura e o conhecimento na comunidade."
        },
        6: {
          title: "Shopping Center",
          category: "Arquitetura Comercial",
          client: "MegaMall",
          date: "20 Maio, 2021",
          url: "www.megamall.com",
          images: ["assets/img/portfolio/projetos/p6.jpeg"],
          description: "Desenvolvimento de um shopping center com design inovador e espaços sustentáveis."
        },
        7: {
          title: "Museu de Arte",
          category: "Arquitetura Cultural",
          client: "Fundação de Arte Nacional",
          date: "05 Setembro, 2020",
          url: "www.fundacaoarte.com",
          images: ["assets/img/portfolio/projetos/p7.jpeg"],
          description: "Projeto arquitetônico para um museu interativo, valorizando a cultura e a história local."
        },
        8: {
          title: "Centro Esportivo",
          category: "Arquitetura Esportiva",
          client: "Federação de Esportes",
          date: "18 Agosto, 2022",
          url: "www.centroesportivo.com",
          images: ["assets/img/portfolio/projetos/p8.jpeg"],
          description: "Criação de um centro esportivo multiuso, com infraestrutura moderna para diversas modalidades."
        },
        9: {
          title: "Escola Sustentável",
          category: "Arquitetura Educacional",
          client: "Instituto Educar",
          date: "10 Abril, 2021",
          url: "www.institutoeducar.com",
          images: ["assets/img/portfolio/projetos/p9.jpeg"],
          description: "Escola sustentável com materiais ecológicos e espaços voltados para aprendizagem ativa."
        },
        10: {
          title: "Hospital Inteligente",
          category: "Arquitetura Hospitalar",
          client: "Rede Vida Saúde",
          date: "30 Outubro, 2022",
          url: "www.redevidasaude.com",
          images: ["assets/img/portfolio/projetos/p10.jpeg"],
          description: "Projeto de hospital com estrutura otimizada para atendimento eficiente e conforto dos pacientes."
        },
        11: {
          title: "Hotel Resort",
          category: "Arquitetura Hoteleira",
          client: "Luxury Resorts",
          date: "14 Julho, 2021",
          url: "www.luxuryresorts.com",
          images: ["assets/img/portfolio/projetos/p11.jpeg"],
          description: "Resort de luxo com design sofisticado, oferecendo experiências exclusivas aos hóspedes."
        },
        12: {
          title: "Centro de Convenções",
          category: "Arquitetura Corporativa",
          client: "Eventos Global",
          date: "25 Novembro, 2023",
          url: "www.eventosglobal.com",
          images: ["assets/img/portfolio/projetos/p12.jpeg"],
          description: "Planejamento e execução de um centro de convenções para eventos de grande porte."
        }
      };
      
  
    document.querySelectorAll(".details-link").forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        
        let projectId = this.getAttribute("data-id");
        let project = projects[projectId];

        if (project) {
          let content = `
            <h3>${project.title}</h3>
            <p><strong>Categoria:</strong> ${project.category}</p>
            <p><strong>Cliente:</strong> ${project.client}</p>
            <p><strong>Data:</strong> ${project.date}</p>
            <p><strong>Website:</strong> <a href="${project.url}" target="_blank">${project.url}</a></p>
            <p>${project.description}</p>
            <div class="portfolio-images">
              ${project.images.map(img => `<img src="${img}" class="img-fluid mb-2" style="max-width:100%;">`).join("")}
            </div>
          `;

          document.getElementById("portfolioContent").innerHTML = content;

          let modal = new bootstrap.Modal(document.getElementById("portfolioModal"));
          modal.show();
        }
      });
    });
  });


  //services

  //btn ver mais
  document.getElementById("verMais").addEventListener("click", function() {
    $('#serviceModalplus').modal('show');
  });

  document.addEventListener("DOMContentLoaded", function () {
    const serviceItems = document.querySelectorAll(".service-trigger");

    serviceItems.forEach(item => {
      item.addEventListener("click", function () {
        const title = this.getAttribute("data-title");
        const description = this.getAttribute("data-description");
        const features = JSON.parse(this.getAttribute("data-features"));
        const image = this.getAttribute("data-image");

        document.getElementById("serviceModalLabel").textContent = title;
        document.getElementById("serviceTitle").textContent = title;
        document.getElementById("serviceDescription").textContent = description;
        document.getElementById("serviceImage").src = image;

        const featureList = document.getElementById("serviceFeatures");
        featureList.innerHTML = "";
        features.forEach(feature => {
          const li = document.createElement("li");
          li.innerHTML = `<i class="bi bi-check-circle"></i> ${feature}`;
          featureList.appendChild(li);
        });

        const modal = new bootstrap.Modal(document.getElementById("serviceModal"));
        modal.show();
      });
    });
  });