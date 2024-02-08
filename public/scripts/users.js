$(document).ready(() => {
  // display edit user modal on button click
  $('#edit_user').on('click', function (e) {
    e.preventDefault();
    $(this).siblings('.modal').removeClass('hidden');
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

  $('#user-category-select').on('change', function (e) {
    const categoryId = $(e.target).val();
    const allResources = $('#user-resources_display').find('.resource-item');
    if (categoryId === "0") {
      $.each(allResources, function () {
        $(this).show();
      })
    } else {
      $.each(allResources, function () {
        if (!$(this).hasClass(`category_id-${categoryId}`)) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    }
  });

  // AJAX PUT request to edit DB user when user_form-edit is submitted
  $('#user_form-edit').on('submit', function (e) {
    e.preventDefault();
    const formData = {
      username: $("#username").val(),
      email: $("#user_email").val(),
      firstName: $('#first_name').val(),
      lastName: $('#last_name').val()
    };
    const userId = $(e.target).find('#user_id').val();

    $.ajax(`/users/${userId}`, {
      data: formData,
      method: "PUT"
    })
      .then(response => response)
      .then(() => window.location.reload())
      .catch(error => console.log("Form submit error", error));
  });

  $('.liked').hide();

  $('#user-resources_liked').on('click', function (e) {
    e.preventDefault();
    $('.liked').fadeIn(400);
    $('.owned').hide();
  })
  $('#user-resources_owned').on('click', function (e) {
    e.preventDefault();
    $('.owned').fadeIn(400);
    $('.liked').hide();
  });
});
