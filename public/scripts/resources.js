$(() => {
  const renderResouceModal = function(resource) {
    const $resourceModal = $(`
    <h3>${resource.title}</h3>
    <div class="image-container">
      <img src="${resource.thumbnail_url}" alt="Resource thumbnail image" class="thumbnail" width="200px" />
      <p class="description">${resource.description}</p>
    </div>
    `);
    $("#myModal .modal-content").html($resourceModal);
  };

  // Show modal when a resource is clicked
  $(".resource").on("click", function() {
    console.log('click')
    const resourceId = $(this).attr("id");

    $.ajax({
      url: "/resources/" + resourceId,
      method: "GET",
      success: function(data) {
        console.log(data);
        renderResouceModal(data);

        // Show the modal
        $("#myModal").fadeIn();
      },
      error: function(error) {
        console.error("Error fetching resource details:", error);
      }
    });
});


  // Close modal when the close button is clicked
  $(".close").click(function() {
    $("#myModal").fadeOut();
  });
});
