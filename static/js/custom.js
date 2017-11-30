// spells on global cooldown
const words = ['software engineer.', 'learner.', 'tech enthusiast.', 'gamer.'];
let wordIndex = 0;

// type and wipe
$(document).ready(function () {
  if(document.getElementById('typity') !== null ) {
    startType(words[wordIndex], 0);
  }
});

function startType(word, charIndex) {
  if (charIndex < word.length) {
    document.getElementById('typity').innerHTML += word.charAt(charIndex);
    charIndex++;
    setTimeout(function () {
      startType(word, charIndex);
    }, 50);
  } else {
    startWipe();
  }
}

function startWipe() {
  wordIndex = wordIndex < words.length - 1 ? wordIndex + 1 : 0;

  setTimeout(function () {
    $('mark').addClass('highlighted')
  }, 1000);

  setTimeout(function () {
    $('mark').removeClass('highlighted').text('');
  }, 2000);

  setTimeout(function () {
    startType(words[wordIndex], 0);
  }, 2000);
}

// side navigation
$(".button-collapse").sideNav();
// Initialize collapsible (uncomment the line below if you use the dropdown variation)
//$('.collapsible').collapsible();

// slide animation
$('#slide-out > li > a').on('click', function () {
  const href = $(this).attr('href').replace(/[\/]+/g, '');
  $('html, body').animate({
    scrollTop: $(href).offset().top
  }, 1000);
});