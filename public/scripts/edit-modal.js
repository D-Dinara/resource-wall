import { closeModal } from "./modal.js";

$(document).ready(() => {
  const submitFormRequest = (id, formData) => {
    $.ajax(`/resources/${id}`, {
      data: formData,
      method: "PUT"
    })
      .then(response => response)
      .then(() => window.location.reload())
      .catch(error => console.log("Form submit error", error));
  };

  const populateEditModal = (appendingContainer, resource) => {
    $(appendingContainer).removeClass('hidden');

    $(appendingContainer).append(`
      <div class="modal--inner flex">
      <button id="modal_close" class="modal_close">X</button>
      <div class="modal_thumbnail">
        <img src="${resource.thumbnail_url}" />
      </div>
      <div class="modal_form">
        <h2>Edit Resource</h2>
        <form id="modal_form-edit">
          <div class="hidden">
            <label for="resource_id"></label>
            <input id="resource_id" type="number" value="${resource.id}" disabled>
          </div>
          <div>
            <label for="title">${resource.title}</label>
            <input id="title" placeholder="Enter a new title" type="text">
          </div>
          <div>
            <label for="description">${resource.description}</label>
            <input id="description" placeholder="Enter a new description" type="textarea">
          </div>
          <div>
            <label for="url">${resource.url}</label>
            <input id="url" placeholder="Enter a new URL" type="text">
          </div>
          <div>
              <label for="category">Category</label>
              <select id="edit_category" name="category" id="user-category-select">
                <option value="0">Uncategorized</option>
                <option value="1">Javascript</option>
                <option value="2">CSS</option>
                <option value="3">React</option>
                <option value="4">SQL</option>
                <option value="5">Express</option>
                <option value="6">Ruby</option>
              </select>
            </div>
          <div class="form_button--container">
            <button type="submit" class="btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
      `);

    closeModal();

    $('#modal_form-edit').on('submit', function (e) {
      e.preventDefault();
      const id = $(e.target).find('#resource_id').val();

      const formData = {
        title: $(e.target).find('#title').val(),
        description: $(e.target).find('#description').val(),
        url: $(e.target).find('#url').val(),
        category_id: $(e.target).find('#edit_category').val()
      };

      submitFormRequest(id, formData);
    })
  };

  $('.btn_edit').on('click', function (e) {
    e.preventDefault();
    const resourceId = $(this).attr('id').replace("edit_", "");
    // get the resource by id
    $.ajax(`/resources/${resourceId}`, { method: "GET" })
      // then create a form to edit it
      .then(result => {
        populateEditModal('#resource_modal-container', result.resource[0]);
      })
      .catch(error => console.log("edit resource error", error));
  });
});
