let order = [];

function updateOrder() {
  event.preventDefault(); // Prevent form from submitting

  const $form = $(event.target).closest("form");
  const name = $form.data("name");
  const price = parseFloat($form.data("price"));
  const $quantityInput = $form.find('input[name="quantity"]');
  const quantity = parseInt($quantityInput.val());

  if (isNaN(quantity) || quantity < 1) {
    alert("Please enter a valid quantity.");
    return;
  }

  // Check if item already exists
  const existingItem = order.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.total = existingItem.quantity * existingItem.price;
  } else {
    order.push({ name, price, quantity, total: price * quantity });
  }

  $quantityInput.val("");
  displayOrderSummary();
}

function displayOrderSummary() {
  const $orderList = $("#order-list");
  const $totalAmount = $("#total-amount");

  $orderList.empty();
  let total = 0;

  order.forEach((item) => {
    const $li = $("<li>").text(
      `${item.name} (Qty. ${item.quantity}) - ₱${item.total}`
    );
    $orderList.append($li);
    total += item.total;
  });

  $totalAmount.text(`Total: ₱${total}`);
}

function getReceipt() {
  const $orderSummaryGet = $("#order-summary-get");
  const $serviceOptionGet = $("#service-option-get");
  const $totalBill = $("#total-bill");
  const $amountPaid = $("#amount-paid");
  const $totalChange = $("#total-change");

  $orderSummaryGet.empty();

  let total = 0;
  order.forEach((item) => {
    const $li = $("<li>").text(
      `${item.name} (Qty. ${item.quantity}) - ₱${item.total}`
    );
    $orderSummaryGet.append($li);
    total += item.total;
  });

  const amountPaid = parseFloat($("#money-input").val());
  const change = amountPaid - total;

  const serviceOption = $('input[name="service-option"]:checked').val();

  $serviceOptionGet.text(`Service: ${serviceOption}`);
  $totalBill.text(`Total Bill: ₱${total.toFixed(2)}`);
  $amountPaid.text(`Amount Paid: ₱${amountPaid.toFixed(2)}`);

  $totalChange.text(`Total Change: ₱${change.toFixed(2)}`);

  $("#get-receipt-modal").removeClass("hidden").addClass("flex");
}

function completeOrder() {
  if (order.length === 0) {
    alert("No items in the order.");
    return;
  }

  let total = 0;
  order.forEach((item) => {
    total += item.total;
  });

  const amountPaid = parseFloat($("#money-input").val());

  if (isNaN(amountPaid) || amountPaid <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  if (amountPaid < total) {
    alert(`Payment is insufficient. Total bill is ₱${total.toFixed(2)}.`);
    return;
  }

  alert("Thanks for ordering!");

  // Reset order
  order = [];
  $("#money-input").val("");
  displayOrderSummary();
  $("#get-receipt-modal").removeClass("flex").addClass("hidden");
}

function closeGetModal() {
  $("#get-receipt-modal").removeClass("flex").addClass("hidden");
}
