$(document).ready(function() {
    function loadPersonalDetails() {
        $('.content-block').empty();
        const storedUsername = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('email');
        const personalDetailsForm = `
      <h2>Edit Personal Details</h2>
      <form id="personal-details-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" class="form-control" id="username" value="${storedUsername}">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" value="${storedEmail}">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="New Password">
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    `;

        $('.content-block').append(personalDetailsForm);
    }

    $('#personal-details-tab').click(function() {
        loadPersonalDetails();
    });

    $('#purchase-history-tab').click(function() {
        $('.content-block').empty();
    });

    $('#bonuses-tab').click(function() {
        $('.content-block').empty();
    });

    $('#payment-methods-tab').click(function() {
        $('.content-block').empty();
    });

    loadPersonalDetails();
});
