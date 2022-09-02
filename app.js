fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => displayData(data))

const displayData = catagory => {
    catagory.data.news_category.forEach(eachCatagory => {
        const { category_id, category_name } = eachCatagory;
        const catagoryDisplay = document.getElementById("cata-display");
        const display = document.createElement('div');
        display.innerHTML = `
        <button onclick="catagoryData('${category_id}')" class="btn btn-primary m-1 btn-xs sm:btn-sm md:btn-md lg:btn-lg">${category_name}</button>
        `;
        catagoryDisplay.appendChild(display);
    })
}

const catagoryData = id => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(response => response.json())
        .then(data => cardData(data))
        // data.catch(() => {console.log("Error:Data Not Found");})
        .catch((error) => {
            console.error('Error:', error);
        })
}

const cardData = allData => {
    let cardDisplay = document.getElementById("card");
    cardDisplay.innerHTML = " ";

    allData.data.forEach(eachCard => {
        const { total_view, title, author, thumbnail_url, image_url, details } = eachCard;
        const { img, name } = author;
        const displayCard = document.createElement('div');
        displayCard.classList.add("card", "lg:card-side", "bg-base-100", "shadow-xl", "m-2");
        displayCard.innerHTML = `
            <figure><img src="${thumbnail_url}" alt="Album"></figure>
            <div class="card-body">
                <h2 class="card-title">${title}</h2>
                <p>${details}</p>
                <div class="flex justify-around">
                    <div>
                        <img class="object-cover h-12 w-10" src="${img}" alt="" srcset="">
                        <p>${name === null ? "No Data Found" : name}</p>
                    </div>
                    <div>
                        <h4 class="text-center">Total View: ${total_view === null ? "No Data Found" : total_view}</h4>
                    </div>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Details</button>
                    </div>
                </div>
            </div>
        `;
        cardDisplay.appendChild(displayCard);
    })
}