window.addEventListener('DOMContentLoaded', () => {

  window.addEventListener('load', () => {

    const $ = (selector) => document.querySelector(`${selector}`);

    // let $menu = $('.menu');
    // let $menuBtn = $('.menu-btn');
    // $menuBtn.addEventListener('click', () => {
    //   const $hamburgerToggle = $menuBtn.getElementsByTagName('svg').item(0)
    //   const $hamburgerToggleOpen = $menuBtn.getElementsByTagName('svg').item(1)
    //   $hamburgerToggle.classList.toggle('none')
    //   $hamburgerToggleOpen.classList.toggle('none')
    //   $menu.classList.toggle('is-active')
    // });

    //funcion autoejecutable para evitar colisiones
    //MENU

    /**
     * funcion autoejecutable que maneja el menu
     * @params{string} nodo raiz document
     * @params{string} funcion que recibe un selector
     */

    //Menu
    ((d, $) => {
      let $menu = $('.menu');
      let $menuBtn = $('.menu-btn');

      $menuBtn.addEventListener('click', () => {
        const $hamburgerToggle = $menuBtn.getElementsByTagName('svg').item(0)
        const $hamburgerToggleOpen = $menuBtn.getElementsByTagName('svg').item(1)

        $hamburgerToggle.classList.toggle('none')
        $hamburgerToggleOpen.classList.toggle('none')
        $menu.classList.toggle('is-active')
      });

      //Delegacion de eventos para optimizar los click de los enlaces === a
      //delego el evento al elemto padre superior o al nodo raiz (el document) y apartir de ahi busco el selector que coincida(!e.target.matches('.menu a')) para descadenar la programacion
      d.addEventListener("click", (e) => {
        //sino coincide con la clase .menu a que retorne falso
        if (!e.target.matches('.menu a')) return false

        const $hamburgerToggle = $menuBtn.getElementsByTagName('svg').item(0)
        const $hamburgerToggleOpen = $menuBtn.getElementsByTagName('svg').item(1)

        $hamburgerToggle.classList.remove('none')
        $hamburgerToggleOpen.classList.add('none')
        $menu.classList.toggle('is-active')

        //Navlink active cuando se selcciona
        d.querySelector('a.active-link').classList.remove('active-link')
        e.target.classList.add('active-link')
      });

    })(document, $);

    //Social icons
    ((d, $) => {

      const observer = new IntersectionObserver(handleInterceptionObserver, {
        threshold: 0.20
      });

      const $scrollTrackerElement = d.getElementById('inicio');
      observer.observe($scrollTrackerElement);
      // debugger;

      function handleInterceptionObserver(entries) {
        entries.forEach(entry => {
          // console.log(entry)
          const $socialIcons = d.querySelector('.social');

          if (!entry.isIntersecting) {
            $socialIcons.firstElementChild.classList.remove('none');
            $socialIcons.firstElementChild.classList.add('social-contact');
          } else {
            $socialIcons.firstElementChild.classList.remove('social-contact');
            $socialIcons.firstElementChild.classList.add('none');
          }
        });
      }

    })(document, $);

    //Formulario
    ((d, $) => {
      d.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e)
        if (e.target.matches('form')) {

          const $spinner = $('.form-loader')
          const $submit = $('.form-container .btn-color')
          const $labels = d.querySelectorAll('.form-label [required]')

          $submit.style.cursor = 'no-drop';

          $spinner.classList.remove('none');



          $labels.forEach((item) => {
            const $pattern = item.pattern || item.pattern;

            //create message
            const $span = d.createElement('span');
            $span.textContent = item.title;
            $span.classList.add('form-message-error')

            item.insertAdjacentElement('afterend', $span)
            // debugger

            //reset form
            item.value = ''
          })

          setTimeout(() => {
            $spinner.classList.add('none');
            $submit.style.cursor = 'pointer';
          }, 100);
        }
      });
    })(document, $);

    document.querySelector('html').style.opacity = '1';
  })

});
