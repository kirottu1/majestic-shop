function addProductToCart() {
    const product = $(".product").clone();
    $(".cart tbody").append(product);
}

// Update the subtotal for a product
function updateSubtotal(product) {
    const price = parseFloat(product.find(".product-details p").text().replace("$", ""));
    const quantity = parseInt(product.find(".quantity").val());
    const subtotal = price * quantity;
    product.find(".subtotal").text("$" + subtotal);
}

// Calculate and update the total price
function updateTotal() {
    let total = 0;
    $(".product").each(function () {
        total += parseFloat($(this).find(".subtotal").text().replace("$", ""));
    });
    $("#total").text(total);
}

// Remove a product from the cart
function removeProduct(product) {
    product.remove();
    updateTotal();
}

// Delegation for removing products
$(".cart").on("click", ".remove", function () {
    const product = $(this).closest(".product");
    removeProduct(product);
});

// Delegation for changing quantity
$(".cart").on("change", ".quantity", function () {
    const product = $(this).closest(".product");
    updateSubtotal(product);
    updateTotal();
});

// Add a sample product to the cart
addProductToCart();

// Proceed to checkout button click event
$(".proceed").on("click", function () {
    // You can add code for processing the order here
    alert("Proceeding to checkout!");
});