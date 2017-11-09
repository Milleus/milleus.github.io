  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();

$('#slide-out > li > a').on('click', function() {
  const href = $(this).attr('href').replace(/[\/]+/g, '');
  $('html, body').animate({
    scrollTop: $(href).offset().top
  }, 1000);
});