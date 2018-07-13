// spells on global cooldown
const words = ['software developer.', 'learner.', 'tech enthusiast.', 'gamer.'];
let idx = 0;
let str = '';

// type/wipe
if ($('#typity').length != 0) {
  startType(words[idx], 0);
}

function startType(word, charIdx) {
  if (charIdx < word.length) {
    str += word.charAt(charIdx);
    $('#typity').html(str);
    charIdx++;
    setTimeout(function () {
      startType(word, charIdx);
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
