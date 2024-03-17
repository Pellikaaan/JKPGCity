const { deleteVenue } = require("../venuesService");

document.addEventListener('DOMContentLoaded', function () {
  // Previous code for toggling filters

  document.getElementById('toggleSortName').addEventListener('click', function () {
    const currentOrder = this.getAttribute('data-order') === 'asc' ? 'desc' : 'asc';
    window.location.href = `/venues?sort=name&order=${currentOrder}`;
  });

  document.getElementById('toggleSortRating').addEventListener('click', function () {
    const currentOrder = this.getAttribute('data-order') === 'asc' ? 'desc' : 'asc';
    window.location.href = `/venues?sort=rating&order=${currentOrder}`;
  });

  document.getElementById('toggleFilter').addEventListener('click', function () {
    var filterDiv = document.getElementById('districtFilter');
    filterDiv.style.display = filterDiv.style.display === 'none' ? '' : 'none';
  });

  document.getElementById('clearFilter').addEventListener('click', function () {
    window.location.href = '/venues'; // Redirect to venues without any filter
  });

});
