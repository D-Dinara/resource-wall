const renderComments = (comments) => {
  return comments.map(comment => {
    return `<li class="comment">${comment.commentor}: ${comment.text}</li>`
  });
}

const closeModal = () => {
  $('#modal_close').on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().addClass('hidden');
    $(this).parent().parent().empty();
  });

  $('.modal').on('click', function (e) {
    if (e.target === e.currentTarget) {
      $(this).addClass('hidden');
      $(this).empty();
    }
  });
};

/**
 * @function @populateResourceModal fills data into the modal on click
 * @argument appendingContainer a container on the page where the modal will append
 * @argument resource the resource that we want populated in the modal
 * @argument comments the associated comments that need to render inside the modal
 * @argument isLoggedIn allows certain features to be conditionally available
 */


const populateResourceModal = (appendingContainer, resource, comments, isLoggedin, isLiked, isRated, avgRating) => {
  const disabled = isLoggedin ? null : "disabled";
  const likeBtnText = isLiked ? "Unlike" : "Like";
  const disabledIfRated = isRated ? "disabled" : null;
  const rateBtnText = isRated ? "Rated" : "Rate";

  const commentsText = renderComments(comments);

  $(appendingContainer).removeClass('hidden');

  $(appendingContainer).append(`
    <div class="modal_profile--inner modal_container--inner flex">
      <button id="modal_close">X</button>
      <div class="modal_thumbnail">
        <img src="${resource.thumbnail_url}" />
      </div>
      <div class="modal_profile--rendered">
        <header class="modal_profile--title">
        <a href=${resource.url}> Visit Page </a>
          <h2>${resource.title}</h2>
          <span class="modal_profile--rating">Rating: ${avgRating} / 5</span>
          <div class="modal_rating-form>
            <form id="rating-form" method="POST" action="/resources/${resource.id}">
              <select ${disabled} ${disabledIfRated} name="rateOption" id="rateOption">
                <option value="1.00">1</option>
                <option value="2.00">2</option>
                <option value="3.00">3</option>
                <option value="4.00">4</option>
                <option value="5.00">5</option>
              </select>
              <button ${disabled} ${disabledIfRated} type="submit" id="rate-btn">${rateBtnText}</button>
            </form>
          </div>
          <div class="modal_likes-form>
            <form id="likes-form" method="POST" action="/likes/${resource.id}">
              <button ${disabled} type="submit" id="like-btn">${likeBtnText}</button>
            </form>
          </div>
        </header>
        <body class="modal_body">
          <section class="modal_description">
            <p>${resource.description}</p>
          </section>
          <section class="modal_comments">
            <div class="modal_comments--list>
              <ul>
                ${commentsText}
              </ul>
            </div>
            <div class="modal_comments--form>
              <form id="comment-form" method="POST" action="/comments/${resource.id}">
                <label for="comment-text">Leave a comment</label>
                <textarea ${disabled} name="commentText" id="comment-text"></textarea>
                <div>
                  <button ${disabled} type="submit">Add comment</button>
                </div>
              </form>
            </div>
          </section>
        </body>
      </div>
    </div>
  `);

  closeModal();
};

/**
 * @function @populateEditModal
 * Behaves the same as @populateResourceModal
 * Creates a form instead of displaying information
 */

const populateEditModal = (appendingContainer, resource) => {
  $(appendingContainer).removeClass('hidden');

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

  closeModal();
};

export { populateResourceModal, populateEditModal };
