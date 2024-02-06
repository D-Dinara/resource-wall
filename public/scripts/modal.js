/**
 * @function populateModal
 * @argument appendingContainer a container on the page where the modal will append
 * @argument resource the resource that we want populated in the modal
 */

const populateResourceModal = (appendingContainer, resource) => {
  $(appendingContainer).removeClass('hidden');
  resource = resource.resource[0];

  $('#resource_modal-container').append(`
  <div class="modal_profile--inner modal_container--inner flex">
    <button id="modal_close">X</button>
    <div class="modal_thumbnail">
      <img src="${resource.thumbnail_url}" />
    </div>
    <div class="modal_profile--rendered">
      <div class="modal_profile--title">
        <h2>${resource.title}</h2>
        <span class="modal_profile--rating">Rating: ${resource.rating}</span>
      </div>
      <div class="modal_profile--description">
        <p>${resource.description}</p>
      </div>
      <div class="modal_profile--comments">
        <p>lorem ipsum dolor sit amet</p>
      </div>
    </div>
  </div>
`);
};

/**
 * @function @populateEditModal
 * Behaves the same as @populateResourceModal
 * Creates a form instead of displaying information
 */

const populateEditModal = (appendingContainer, resource) => {
  $(appendingContainer).removeClass('hidden');
  resource = resource.resource[0];

  $(appendingContainer).append(`
    <div class="modal_profile--inner modal_container--inner flex">
    <button id="modal_close">X</button>
    <div class="modal_thumbnail">
      <img src="${resource.thumbnail_url}" />
    </div>
    <div class="modal_form">
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

export { populateResourceModal, populateEditModal };
