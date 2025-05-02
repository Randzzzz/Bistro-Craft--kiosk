function showMenu(category) {
  $(".item-container").hide(); // Hide all items
  $(`.${category}`).css("display", "flex"); // Show selected category
}

// Show 'all' section by default
window.onload = function () {
  showMenu("all");
};

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full");
    });
  }
});
