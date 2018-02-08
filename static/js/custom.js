// spells on global cooldown
const words = ['software engineer.', 'learner.', 'tech enthusiast.', 'gamer.'];
let idx = 0;
let str = '';

// type and wipe
if ($('#typity').length != 0) {
  startType(words[idx], 0);
}

function startType(word, charIndex) {
  if (charIndex < word.length) {
    str += word.charAt(charIndex);
    $('#typity').html(str);
    charIndex++;
    setTimeout(function () {
      startType(word, charIndex);
    }, 50);
  } else {
    startWipe();
    str = '';
  }
}

function startWipe() {
  idx = idx < words.length - 1 ? idx + 1 : 0;

  setTimeout(function () {
    $('#typity').addClass('highlighted')
  }, 1000);

  setTimeout(function () {
    $('#typity').removeClass('highlighted').text('');
  }, 2000);

  setTimeout(function () {
    startType(words[idx], 0);
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