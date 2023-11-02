// function addProductToCart() {
//     const product = $(".product").clone();
//     $(".cart tbody").append(product);
// }

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
        const price = parseFloat($(this).find(".product-details p").text().replace("$", ""));
        const quantity = parseInt($(this).find(".quantity").val());
        const subtotal = price * quantity;
        total += subtotal;
    });
    $("#total").text("$" + total);
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
// addProductToCart();

// Proceed to checkout button click event
$(".proceed").on("click", function () {
    // You can add code for processing the order here
    alert("Proceeding to checkout!");
});

fetch('/api/cart-items', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 403) {
            // Handle unauthorized access
            console.error('Unauthorized');
        } else {
            // Handle other errors
            console.error('Error:', response.status);
        }
    })
    .then((data) => {
        // Handle the response data (pairs of product IDs and quantities)
        console.log('Cart Items:', data);

        // Iterate through product IDs and populate your cart
        data.productIds.forEach(async (productData) => {
            const productId = productData.product_id;
            const quantity = productData.quantity;

            try {
                // Fetch product data from db.json using productId
                const response = await fetch(`../employees-server/db.json`);
                const productsData = await response.json();
                const products = productsData.stock;

                // Find the product with the given ID
                const product = products.find((item) => item.id === productId);

                if (product) {
                    // Create a copy of your cart item template
                    const productTemplate = $("#product").clone();
                    productTemplate.removeAttr("id"); // Remove the id
                    productTemplate.addClass("product");
                    productTemplate.css('display', 'table-row')
                    // Update the template with product data
                    productTemplate.html(productTemplate.html()
                        .replace(/{{id}}/g, product.id)
                        .replace(/{{image}}/g, product.image)
                        .replace(/{{model}}/g, product.model)
                        .replace(/{{price}}/g, product.price));

                    // Append the modified template to your cart table
                    productTemplate.find('.quantity').val(quantity);
                    $(".cart tbody").append(productTemplate);
                }
            } catch (error) {
                // Handle any errors
                console.error('Error fetching product data:', error);
            }
            updateTotal();
        });
    })
    .catch((error) => {
        // Handle fetch errors
        console.error('Fetch Error:', error);
    });


$(".cart").on("click", ".remove", async function () {
    const product = $(this).closest(".product");
    const productId = product.find("h3").data("product-id");

    try {
        const response = await fetch(`/api/cart-items/${productId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            removeProduct(product);
        } else {
            console.error('Error removing cart item:', response.status);
        }
    } catch (error) {
        console.error('Error removing cart item:', error);
    }
});