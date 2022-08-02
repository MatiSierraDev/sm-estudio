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

((d, $) => {

  const observer = new IntersectionObserver(handleInterceptionObserver, {
    threshold: 0.10
  });

  const $scrollTrackerElement = d.getElementById('nosotros');
  observer.observe($scrollTrackerElement);

  function handleInterceptionObserver(entries) {
    entries.forEach(entry => {
      const $socialIcons = d.querySelector('.social');

      if (entry.intersectionRatio > 0) {
        $socialIcons.firstElementChild.classList.remove('none');
        $socialIcons.firstElementChild.classList.add('social-contact');
      } else {
        $socialIcons.firstElementChild.classList.remove('social-contact');
        $socialIcons.firstElementChild.classList.add('none');
      }
    });
  }


})(document, $)