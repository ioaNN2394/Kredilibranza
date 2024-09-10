
function limitarAnchoMinimo() {
    if (window.innerWidth < 770) {
        window.resizeTo(770, window.innerHeight);
    }
}

window.addEventListener('resize', limitarAnchoMinimo);

// ------------------------------------------ Animacion barra de navegacion --------------------------------------------------//
let prevScrollPos = window.pageYOffset;

window.addEventListener("scroll", function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    document.getElementById("navegacion").style.top = "0";
    document.getElementById("separador1").style.top = "11.5%";
  } else {
    document.getElementById("navegacion").style.top = "-100%";
    document.getElementById("separador1").style.top = "-100%";
  }
  prevScrollPos = currentScrollPos;
});


export { limitarAnchoMinimo };
