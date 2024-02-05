$(document).ready(() => {
  const populateViewModal = (resource) => {
    $('#resource_modal-container').removeClass('hidden');
    const useResource = resource.resource[0];
    $('#resource_modal-container').append(`
      <div class="modal_profile--inner modal_container--inner flex">
        <button id="modal_close">X</button>
        <div class="modal_thumbnail">
          <img src="${useResource.thumbnail_url}" />
        </div>
        <div class="modal_profile--rendered">
          <div class="modal_profile--title">
            <h2>${useResource.title}</h2>
            <span class="modal_profile--rating">Rating: ${useResource.rating}</span>
          </div>
          <div class="modal_profile--description">
            <p>${useResource.description}</p>
          </div>
          <div class="modal_profile--comments">
            <p>lorem ipsum dolor sit amet</p>
          </div>
        </div>
      </div>
    `);
  };

  $('.resource-item').on('click', function (e) {
    e.preventDefault();
    const resourceId = $(this).attr('id');
    // get the resource by id
    $.ajax(`/resources/${resourceId}`, { method: "GET" })
      // then create a form to edit it
      .then(result => {
        populateViewModal(result);
      })
      .catch(error => console.log("edit resource error", error));
  });
});
