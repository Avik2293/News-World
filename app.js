
//Auto catagory set...
fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => displayData(data))
    .catch((error) => {
        console.error('Error:', error);
    })

const displayData = catagory => {
    toggleSpinner(true);
    catagory.data.news_category.forEach(eachCatagory => {
        const { category_id, category_name } = eachCatagory;
        const catagoryDisplay = document.getElementById("cata-display");
        const display = document.createElement('div');
        display.innerHTML = `
        <button onclick="catagoryData('${category_id}')" class="btn btn-primary m-1 btn-xs sm:btn-sm md:btn-md lg:btn-lg">${category_name}</button>
        `;
        catagoryDisplay.appendChild(display);

    })
    // Default All Data Load...
    catagoryData('08');
    toggleSpinner(false);
}


// Data load by Catagory Click...
const catagoryData = id => {
    toggleSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(response => response.json())
        .then(data => cardData(data))
        // data.catch(() => {console.log("Error:Data Not Found");})
        .catch((error) => {
            console.error('Error:', error);
        })
    // .catch(error => console.log(error))
}

const cardData = allData => {
    // console.log(allData);

    let dataFound = document.getElementById("data-calc");
    let dataFoundValue = dataFound.innerText;
    dataFoundValue = " ";
    dataFound.innerText = `${allData.data.length} items found for this catagory.`;

    //Error Message...
    const errorMsg = document.getElementById('error-msg');
    if (allData.data.length == 0) {
        errorMsg.classList.remove('hidden');
    }
    else {
        errorMsg.classList.add('hidden');
    }

    // Card load..
    let cardDisplay = document.getElementById("card");
    cardDisplay.innerHTML = " ";

    // Top View auto...
    let topView = allData.data;
    // console.log(topView);
    topView.sort((a, b) => b.total_view - a.total_view);
    // console.log(topView);


    topView.forEach(eachCard => {
        const { total_view, title, author, thumbnail_url, image_url, details, _id } = eachCard;
        const { img, name } = author;

        const displayCard = document.createElement('div');
        displayCard.classList.add("card", "lg:card-side", "bg-base-100", "shadow-xl", "m-2");
        displayCard.innerHTML = `
            <figure><img src="${thumbnail_url}" alt="Album"></figure>
            <div class="card-body">
                <h2 class="card-title">${title === null ? "No Data Found" : title}</h2>
                <p>${details.length > 300 ? details.slice(0, 300) + '...' : details}</p>
                <div class="flex justify-around">
                    <div class="flex">
                        <img class="object-cover h-12 w-10 rounded-full" src="${img}" alt="" srcset="">
                        <p>${((name === null) || (name === "")) ? "No Data Found" : name}</p>
                    </div>
                    <div class="flex">
                    <i class="fa-solid fa-eye"></i><h4 class="text-center"> ${total_view === null ? "No Data Found" : total_view}</h4>
                    </div>
                    <div class="card-actions justify-end">
                        <label for="my-modal-3" onclick="modal('${_id}')" class="btn modal-button">Details</label>
                    </div>
                </div>
            </div>
        `;
        cardDisplay.appendChild(displayCard);
    })
    toggleSpinner(false);
}


//For Modal by _id...
const modal = (id) => {
    console.log(id);

    const url = `https://openapi.programming-hero.com/api/news/${id}`;

    fetch(url)
        .then(response => response.json())
        .then(data => modalData(data))
        // data.catch(() => {console.log("Error:Data Not Found");})
        // .catch((error) => {
        //     console.error('Error:', error);
        // })
        .catch(error => console.log(error))
}

const modalData = eachModalData => {
    let modalDisplay = document.getElementById("modal-id");
    modalDisplay.innerHTML = " ";
    const { title, image_url, details } = eachModalData.data[0];

    modalDisplay.innerHTML = `
    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <img src="${image_url}" alt="" srcset="">
    <h3 class="text-lg font-bold">${title}</h3>
    <p class="py-4">${details}</p>
    `;

    // toggleSpinner(false);
}


// Spinner ... 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('hidden');
    }
    else {
        loaderSection.classList.add('hidden');
    }
}

