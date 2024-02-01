// Client facing scripts here
$(window).on('load', function() {
  $(".description").each(function () {
    const originalText = $(this).text();
    if (originalText) {
      $(this).text(originalText.slice(0, 70) + "...");
    }
  });
});
