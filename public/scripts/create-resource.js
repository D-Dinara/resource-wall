$(() => {

  const renderCreateResouceModal = function() {
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
        <select name="newResourceCategory" id="resource-categories">
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
        <button type="submit">Submit</button>
      </form>
    `);

    $("#myModal .modal-content").html($createResourceModal);

    $("#myModal").fadeIn();
  };

  const renderResource = function(resource) {
    const $resource = $(`
    <div class="resource" id="${resource.id}">
      <h3>${resource.title}</h3>
      <div class="image-container">
        <img src=${resource.thumbnail_url} alt="Resource thumbnail image" class="thumbnail" />
        <p class="description">${resource.description}</p>
      </div>
    </div>`);
    $("#resources").prepend($resource);
  }

  // Show modal when a resource is clicked
  $("#create-btn").on("click", function() {
    renderCreateResouceModal();
  });


  // Handle form submission for adding comments
  $("#myModal").on("submit", "#create-resource-form", function(event) {
    event.preventDefault();
    const resourceData = $(this).serialize();
    $.ajax({
      url: "/resources",
      method: "POST",
      data: resourceData
    })
      .then(function(data) {
        renderResource(data);
      });
  });

  // Close modal when the close button is clicked
  $(".close").click(function() {
    $("#myModal").fadeOut();
  });
});
