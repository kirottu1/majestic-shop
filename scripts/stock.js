const SELECTOR = Object.freeze({
    TABLE: '.card-columns',
    TEMPLATE: '#card-template',
    BRAND_CHECKBOXES: "input[name='brand']",
    MODEL_CHECKBOXES: "input[name='model']",
});

const shoeStockTable = document.querySelector(SELECTOR.TABLE);
const cardTemplate = document.querySelector(SELECTOR.TEMPLATE).innerHTML;

function init() {
    API.getList()
        .then((res) => {
            adjustPosts(res);
            initializeFiltering();
        });
}

init();

function adjustPosts(post) {
    const adjustedPost = post.map((el) => getPostHTML(el)).join('');
    shoeStockTable.innerHTML = adjustedPost;
}

function getPostHTML(data) {
    const modelRegex = /{{model}}/g;
    return cardTemplate
        .replace(modelRegex, data.model)
        .replace('{{id}}', data.id)
        .replace('{{design}}', data.design)
        .replace('{{image}}', data.image)
        .replace('{{price}}', data.price)
        .replace('{{link}}', data.link)
        .replace('{{brand}}', data.brand);
}
//
// function initializeFiltering() {
//     const brandCheckboxes = document.querySelectorAll(SELECTOR.BRAND_CHECKBOXES);
//     const modelCheckboxes = document.querySelectorAll(SELECTOR.MODEL_CHECKBOXES);
//
//     function updateModelsVisibility() {
//         const selectedBrands = Array.from(brandCheckboxes)
//             .filter((checkbox) => checkbox.checked)
//             .map((checkbox) => checkbox.id);
//
//         const selectedModels = Array.from(modelCheckboxes)
//             .filter((checkbox) => checkbox.checked)
//             .map((checkbox) => checkbox.getAttribute('data-model'));
//
//         const divs = document.querySelectorAll('.filterDiv');
//
//         divs.forEach((div) => {
//             const brand = div.getAttribute('data-brand');
//             const model = div.getAttribute('data-model');
//
//             const brandIncluded = selectedBrands.length === 0 || selectedBrands.includes(brand);
//             const modelIncluded = selectedModels.length === 0 || selectedModels.includes(model);
//
//             if (brandIncluded && modelIncluded) {
//                 div.style.display = 'inline-block';
//             } else {
//                 div.style.display = 'none';
//             }
//         });
//     }
//
//     brandCheckboxes.forEach((checkbox) => {
//         checkbox.addEventListener('change', updateModelsVisibility);
//     });
//
//     modelCheckboxes.forEach((checkbox) => {
//         checkbox.addEventListener('change', updateModelsVisibility);
//     });
//
//     updateModelsVisibility();
// }

function initializeFiltering() {
    const brandCheckboxes = document.querySelectorAll(SELECTOR.BRAND_CHECKBOXES);
    const modelCheckboxes = document.querySelectorAll(SELECTOR.MODEL_CHECKBOXES);

    function updateModelsVisibility() {
        const selectedBrands = Array.from(brandCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.id);

        const selectedModels = Array.from(modelCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.getAttribute('data-model'));

        const divs = document.querySelectorAll('.filterDiv');

        divs.forEach((div) => {
            const brand = div.getAttribute('data-brand');
            const model = div.getAttribute('data-model');

            const brandIncluded = selectedBrands.length === 0 || selectedBrands.includes(brand);
            const modelIncluded = selectedModels.length === 0 || selectedModels.includes(model);

            if (brandIncluded && modelIncluded) {
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        });

        // Disable brand checkboxes for other models
        brandCheckboxes.forEach((checkbox) => {
            const brand = checkbox.id;
            if (!selectedModels.includes(brand)) {
                checkbox.disabled = selectedModels.length > 0;
            } else {
                checkbox.disabled = false;
            }
        });

        // Disable model checkboxes for other brands
        modelCheckboxes.forEach((checkbox) => {
            const modelBrand = checkbox.getAttribute('data-brand');
            if (!selectedBrands.includes(modelBrand)) {
                checkbox.disabled = selectedBrands.length > 0;
            } else {
                checkbox.disabled = false;
            }
        });
    }

    brandCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', updateModelsVisibility);
    });

    modelCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', updateModelsVisibility);
    });

    updateModelsVisibility();
}
