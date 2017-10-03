$('nav#menu ul li').on('click', function() {
  $('nav#menu ul li').removeClass('active');
  $(this).addClass('active');

  const selectedChild = 'child-' + $('nav#menu ul li').index(this);
  $('.t-wrap').removeClass('hild-4 child-5 child-6 child-7');
  $('.t-wrap').addClass(selectedChild);

  const activeId = $(this).attr('id');
  $('.content-overlay').removeClass('show');
  $('.content-overlay.' + activeId).addClass('show');
});