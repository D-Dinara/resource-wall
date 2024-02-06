$(() => {
  const renderResourceModal = function(resource, comments, isLoggedin, isLiked, isRated, avgRating) {
    const disabled = isLoggedin ? null : "disabled";
    const likeBtnText = isLiked ? "Unlike" : "Like";
    const disableIfRated = isRated ? "disabled" : null;
    const rateBtnText = isRated ? "Rated" : "Rate";

    const $resourceModal = $(`
      <h3>${resource.title}</h3>
      <p id="rating-display">Rating: ${avgRating} / 5.00</p>
      <form id="rating-form" method="POST" action="/ratings/${resource.id}">
        <select ${disabled} ${disableIfRated} name="rateOption" id="rateOption">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button ${disabled} ${disableIfRated} type="submit" id="rate-btn">${rateBtnText}</button>
      </form>
      <form id="likes-form" method="POST" action="/likes/${resource.id}">
        <button ${disabled} type="submit" id="like-btn">${likeBtnText}</button>
      </form>
      <img src="${resource.thumbnail_url}" alt="Resource thumbnail image" class="thumbnail" width="200px" />
      <a href=${resource.url}>Resource URL</a>
      <p class="description">${resource.description}</p>
      <h3>Comments</h3>
      <div class="comments-container"></div>
      <form id="comment-form" method="POST" action="/comments/${resource.id}">
        <label for="comment-text">Leave a comment</label>
        <textarea ${disabled} name="commentText" id="comment-text"></textarea>
        <div>
          <button ${disabled} type="submit">Add comment</button>
        </div>
      </form>
    `);

    $("#myModal .modal-content").html($resourceModal);

    // Render comments in the modal
    comments.forEach(comment => {
      if (comment.commentor && comment.text) {
        const $comment = $(`
          <p class="comment">${comment.commentor}: ${comment.text}</p>
        `);
        $(".comments-container").append($comment);
      }
    });

    $("#myModal").fadeIn();
  };

  // Show modal when a resource is clicked
  $(document).on("click", ".resource", function() {
    const resourceId = $(this).attr("id");
    // Fetch resource details and comments
    $.ajax({
      url: "/resources/" + resourceId,
      method: "GET",
      success: function(responseData) {
        const resource = responseData.resource;
        const comments = resource.map(comment => ({
          text: comment.text,
          commentor: comment.username
        }));
        const isLiked = responseData.isLiked;
        const isRated = responseData.isRated;
        const isLoggedin = responseData.userId;
        const ratingObj = responseData.rating;
        const avgRating = ratingObj.avgrating ? parseFloat(ratingObj.avgrating).toFixed(2) : "0.00";
        renderResourceModal(resource[0], comments, isLoggedin, isLiked, isRated, avgRating);
      },
      error: function(error) {
        console.error("Error fetching resource details:", error);
      }
    });
  });

  // Handle form submission for rating
  $("#myModal").on("submit", "#rating-form", function(event) {
    event.preventDefault();
    const rateOption = $(this).serialize();
    const $rateBtn = $(this).find("#rate-btn");
    const isAlreadyRated = $rateBtn.text() === "Rated";

    $.ajax({
      url: $(this).attr("action"),
      method: "POST",
      data: rateOption
    })
      .then(function(data) {
        if (isAlreadyRated) {
          $rateBtn.text("Rate");
        } else {
          $rateBtn.text("Rated");
          $rateBtn.prop("disabled", true);
          $("#rateOption").prop("disabled", true);
        }
        const avgRating = parseFloat(data.avgrating);
        // Update the displayed rating
        $("#rating-display").text(`Rating: ${avgRating.toFixed(2)} / 5.00`);
      });
  });

  // Handle form submission for likes
  $("#myModal").on("submit", "#likes-form", function(event) {
    event.preventDefault();
    const $likeBtn = $(this).find("#like-btn");
    const isAlreadyLiked = $likeBtn.text() === "Unlike";
    $.ajax({
      url: $(this).attr("action"),
      method: isAlreadyLiked ? "DELETE" : "POST",
    })
      .then(function() {
        if (isAlreadyLiked) {
          console.log("Unliked");
          $likeBtn.text("Like");
        } else {
          console.log("Liked");
          $likeBtn.text("Unlike");
        }
      })
      .catch(function(error) {
        console.error("Error:", error);
      });
  });


  // Handle form submission for adding comments
  $("#myModal").on("submit", "#comment-form", function(event) {
    event.preventDefault();
    const commentText = $(this).serialize();
    $.ajax({
      url: $(this).attr("action"),
      method: "POST",
      data: commentText
    })
      .then(function([user, newComment]) {
        const $comment = $(`
          <p class="comment">${user.username}: ${newComment.text}</p>
        `);
        $(".comments-container").append($comment);
      });
  });

  // Close modal when the close button is clicked
  $(".close").on("click", function() {
    $("#myModal").fadeOut();
  });

  $(document).on("click", function(event) {
    if (!$(event.target).closest("#myModal .modal-content").length && !$(event.target).is("#myModal .modal-content")) {
      $("#myModal").fadeOut();
    }
  });

});




