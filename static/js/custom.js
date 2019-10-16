// spells on global cooldown
const words = ['software engineer.', 'frontend enthusiast.', 'tech enthusiast.', 'Singaporean.'];
const element = document.querySelector(".typity");
let idx = 0;
let typed = "";

function startType(pun, index) {
  if (index < pun.length) {
    typed += pun.charAt(index);
    element.innerHTML = typed;
    index++;
    setTimeout(function() {
      startType(pun, index);
    }, 50);
  } else {
    setTimeout(function() {
      element.classList.add("highlight");
    }, 1000);

    setTimeout(function() {
      element.classList.remove("highlight");
      typed = "";
      element.innerHTML = typed;

      idx = idx < words.length - 1 ? idx + 1 : 0;
      startType(words[idx], 0);
    }, 2000);
  }
}

startType(words[0], 0);


// side navigation
$(".button-collapse").sideNav({
  closeOnClick: true,
  draggable: true
});

// Initialize collapsible (uncomment the line below if you use the dropdown variation)
//$('.collapsible').collapsible();

// anchor scroll
$('#slide-out > li > a[href*="#"]').on('click', function () {
  if (location.pathname == '/') {
    const href = $(this).attr('href').replace(/[\/]+/g, '');
    $('html, body').animate({
      scrollTop: $(href).offset().top
    }, 1000);
  }
});
