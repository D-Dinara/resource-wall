$(document).ready(() => {
  const populateEditModal = (resource) => {
    $('#resource_modal-container').removeClass('hidden');
    const useResource = resource[0];
    $('#resource_modal-container').append(`
      <div class="modal_profile--inner modal_container--inner flex">
        <button id="modal_close">X</button>
        <div class="modal_thumbnail">
          <img src="${useResource.thumbnail_url}" />
        </div>
        <div class="modal_form">
          <form id="modal_form-edit">
            <div class="hidden">
              <label for="resource_id"></label>
              <input id="resource_id" type="number" value="${useResource.id}" disabled>
            </div>
            <div>
              <label for="title">${useResource.title}</label>
              <input id="title" placeholder="Enter a new title" type="text">
            </div>
            <div>
              <label for="description">${useResource.description}</label>
              <input id="description" placeholder="Enter a new description" type="textarea">
            </div>
            <div>
              <label for="url">${useResource.url}</label>
              <input id="url" placeholder="Enter a new URL" type="text">
            </div>
            <div>
              <label for="category">Placeholder</label>
              <input id="category" placeholder="category edit" type="select" disabled>
            </div>
            <div class="form_button--container">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    `);
  };

  $('.btn_edit').on('click', function (e) {
    e.preventDefault();
    const resourceId = $(this).attr('id').replace("edit_", "");
    // get the resource by id
    $.ajax(`/resources/${resourceId}`, { method: "GET" })
      // then create a form to edit it
      .then(result => populateEditModal(result))
      .catch(error => console.log("edit resource error", error));
  });
});
