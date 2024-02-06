$(() => {

  const renderCreateResourceModal = function() {
    const $createResourceModal = $(`
      <h3>Create a resource</h3>
      <form id="create-resource-form" method="POST" action="/resources">
        <div>
          <label for="newTitle">Title</label>
          <input id="newTitle" name="newTitle" type="text" placeholder="Enter the resource title">
        </div>
        <div>
          <label for="newDescription">Description</label>
          <textarea id="newDescription" name="newDescription" placeholder="Enter the resource description" type="text"></textarea>
        </div>
        <div>
          <label for="newUrl">URL</label>
          <input id="newUrl" name="newUrl" placeholder="Enter the resource URL" type="text">
        </div>
        <div>
        <label for="newResourceCategory">Select a category</label>
        <select name="newResourceCategory" id="newResourceCategory">
          <option value="Javascript">Javascript</option>
          <option value="CSS">CSS</option>
          <option value="React">React</option>
          <option value="SQL">SQL</option>
          <option value="Express">Express</option>
          <option value="Ruby">Ruby</option>
        </select>
        </div>
        <div>
        <label for="newThumbnail">Thumbnail image URL</label>
          <input id="newThumbnail" name="newThumbnail" placeholder="Enter the resource thumbnail URL" type="text">
        </div>
        <p class="hidden-err-msg">Please, fill all the required fields</p>
        <button type="submit">Submit</button>
      </form>
    `);
    $("#resource_modal-container").empty();
    $("#resource_modal-container").removeClass('hidden');
    $("#resource_modal-container").append($createResourceModal);
  };

  $("#create-btn").on("click", function(event) {
    event.preventDefault();
    $(this).siblings('.modal').removeClass('hidden');
    renderCreateResourceModal();
  });

  $('#modal_close').on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().addClass('hidden');
  });

  $('.modal').on('click', function (e) {
    if (e.target === e.currentTarget) {
      $(this).addClass('hidden');
    }
  });

  $("#login-message").on("click", function(event) {
    event.preventDefault();
    $(this).siblings('.modal').removeClass('hidden');
    $("#resource_modal-container").empty();
    $("#resource_modal-container").removeClass('hidden');
    $("#resource_modal-container").append(`<h3>You need to login to create a resource</h3>`);
  });


  // Handle form submission
  $("#resource_modal-container").on("submit", "#create-resource-form", function (event) {
    event.preventDefault();
    const $modal = $(this).closest('.modal');
    const resourceData = $(this).serialize();
    $.ajax({
      url: "/resources",
      method: "POST",
      data: resourceData
    })
      .then(function(resource) {
        console.log(resource);
        if (resource.isFilled) {
          $modal.addClass('hidden');
          window.location.reload();
        } else {
          $("#newTitle").addClass("red-required");
          $("#newDescription").addClass("red-required");
          $("#newUrl").addClass("red-required");
          $(".hidden-err-msg").slideDown();
        }
      })
      .catch(error => console.log("rendering resource error", error));
  });
});
