import { populateResourceModal } from "./modal.js";

$(document).ready(() => {
  $('.resource-item img').on('click', function (e) {
    e.preventDefault();
    const resourceId = $(this).parent().attr('id');
    // get the resource by id
    $.ajax(`/resources/${resourceId}`, { method: "GET" })
      // then display it
      .then(result => {
        populateResourceModal("#resource_modal-container", result);
      })
      .catch(error => console.log("edit resource error", error));
  });
});
