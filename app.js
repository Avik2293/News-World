fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => displayData(data))

const displayData = catagory => {
    catagory.data.news_category.forEach(eachCatagory => {
        const { category_id, category_name } = eachCatagory;
        const catagoryDisplay = document.getElementById("cata-display");
        const display = document.createElement('div');
        display.innerHTML = `
        <button class="btn btn-primary m-1 btn-xs sm:btn-sm md:btn-md lg:btn-lg">${category_name}</button>
        `;
        catagoryDisplay.appendChild(display);
    })
}