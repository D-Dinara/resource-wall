const renderComment = (comment) => {
  if (!comment.commentor || !comment.text) return;
  return `<li class="comment"><span class="bold">${comment.commentor}:</span> ${comment.text}</li>`
}

const closeModal = () => {
  $('.modal_close').on('click', function (e) {
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
  const disabled = isLoggedin ? "" : "disabled";
  const likeBtnText = isLiked ? "Unlike" : "Like";
  const rateBtnText = isRated ? "Change my rating" : "Rate";
  const disabledIfRated = isRated ? "disabled" : "";

  $(appendingContainer).removeClass('hidden');

  $(appendingContainer).append(`
  <div class="modal--inner flex">
    <button id="modal_close" class="modal_close">X</button>
    <div class="modal_thumbnail">
      <img src="${resource.thumbnail_url}" />
    </div>
    <div class="modal--rendered">
      <header class="modal_title">
        <a target="_blank" href=${resource.url} class="modal_url"> Visit Page </a>
        <h2>${resource.title}</h2>
        <span id="rating-display" class="modal_rating">Average Rating: ${avgRating} / 5.00</span>
        <div class="modal_rating-form">
        <form id="rating-form" method="POST" action="/ratings/${resource.id}">
        <span>My rating: </span>
        <select ${disabled} ${disabledIfRated} name="rateOption" id="rateOption">
        <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
                <div class="flex modal_buttons">
                <button ${disabled} type="submit" id="rate-btn" class="btn">${rateBtnText}</button>
                </form>
                <div class="modal_likes-form">
                  <form id="likes-form" method="POST" action="/likes/${resource.id}">
                    <button ${disabled} type="submit" id="like-btn" class="btn">${likeBtnText}</button>
                  </form>
                </div>
                </div>
                </div>
      </header>
      <body class="modal_body">
      <h3> Description </h3>
        <section class="modal_description">
          <p>${resource.description}</p>
        </section>
        <section class="modal_comments">
        <h3>Comments</h3>
          <div class="modal_comments--list">
            <ul>
              ${comments.map(comment => renderComment(comment)).join("")}
            </ul>
          </div>
          <div class="modal_comments--form">
            <form id="comment-form" method="POST" action="/comments/${resource.id}">
              <label for="comment-text"><span class="bold">Leave a comment</span></label>
              <textarea ${disabled} name="commentText" id="comment-text"></textarea>
              <div>
                <button ${disabled} type="submit" class="btn">Add comment</button>
              </div>
            </form>
            </div>
        </section>
      </body>
    </div>
  </div>
  `);

  // Handle form submission for rating
  $("#rating-form").on("submit", function (event) {
    event.preventDefault();
    const rateOption = $(this).serialize();
    const $rateBtn = $(this).find("#rate-btn");
    const isAlreadyRated = $rateBtn.text() === "Change my rating";

    $.ajax({
      url: $(this).attr("action"),
      method: isAlreadyRated ? "DELETE" : "POST",
      data: rateOption
    })
      .then(function (data) {
        if (isAlreadyRated) {
          $rateBtn.text("Rate");
          $("#rateOption").prop("disabled", false);
        } else {
          $rateBtn.text("Change my rating");
          $("#rateOption").prop("disabled", true);
        }
        const avgRating = data.avgrating ? parseFloat(data.avgrating).toFixed(2) : "0.00";

        // Update the displayed rating
        $("#rating-display").text(`Average Rating: ${avgRating} / 5.00`);
      });
  });


  // Handle form submission for likes
  $("#likes-form").on("submit", function (event) {
    event.preventDefault();
    const $likeBtn = $(this).find("#like-btn");
    const isAlreadyLiked = $likeBtn.text() === "Unlike";
    $.ajax({
      url: $(this).attr("action"),
      method: isAlreadyLiked ? "DELETE" : "POST",
    })
      .then(function () {
        if (isAlreadyLiked) {
          $likeBtn.text("Like");
        } else {
          $likeBtn.text("Unlike");
        }
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  });

  // Handle form submission for adding comments
  $('#comment-form').on('submit', function (e) {
    e.preventDefault();
    const commentText = $(this).serialize();
    $.ajax({
      url: $(this).attr("action"),
      method: "POST",
      data: commentText
    })
      .then(function ([user, newComment]) {
        const $comment = $(`
          <li class="comment">${user.username}: ${newComment.text}</li>
        `)

        $(".modal_comments--list ul").append($comment);
      });
  });

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
    <button id="modal_close" class="modal_close">X</button>
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
