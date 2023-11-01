// JavaScript code for item.ejs
const id = document.querySelector('#item_id').dataset.id;
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButton = document.querySelector(".btn-primary");

    addToCartButton.addEventListener("click", () => {
        const product_id = parseInt(id); // Replace with the actual product ID
        const quantity = parseInt(document.querySelector("#quantity").value);


        addToCart(product_id, quantity);
    });

    function addToCart(product_id, quantity) {
        // Send an AJAX request to add the product to the cart
        fetch("/add-to-cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ product_id, quantity })
        })
        .then(response => {
            if (response.ok) {
                // Successfully added to the cart
                alert("Product added to the cart!");
    } else {
        // Handle the error
        alert("Failed to add product to the cart.");
    }
})
    .catch(error => {
        console.error("Error adding product to the cart:", error);
    });
}
});
