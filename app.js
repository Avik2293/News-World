fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(response => response.json())
    .then(data => displayData(data))

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
    toggleSpinner(false);
}

const catagoryData = id => {
    toggleSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(response => response.json())
        .then(data => cardData(data))
        // data.catch(() => {console.log("Error:Data Not Found");})
        .catch((error) => {
            console.error('Error:', error);
        })
    // .catch(error => console.log(error));
}

const cardData = allData => {
    let cardDisplay = document.getElementById("card");
    cardDisplay.innerHTML = " ";

    allData.data.forEach(eachCard => {
        const { total_view, title, author, thumbnail_url, image_url, details, _id } = eachCard;
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
                        <img class="object-cover h-12 w-10 rounded-full" src="${img}" alt="" srcset="">
                        <p>${name === null ? "No Data Found" : name}</p>
                    </div>
                    <div>
                        <h4 class="text-center">Total View: ${total_view === null ? "No Data Found" : total_view}</h4>
                    </div>
                    <div class="card-actions justify-end">
                        <label for="my-modal-3" onclick="modal(${_id})" class="btn modal-button">Details</label>
                    </div>
                </div>
            </div>
        `;
        cardDisplay.appendChild(displayCard);
    })
    toggleSpinner(false);
}


// const modalData = (image, title, details) => {
//     console.log(image, title, details);
//     // const { id, body } = modals[0];
//     let modal = document.getElementById("modal-id");
//     // modal.innerHTML = " ";
//     const displayModal = document.createElement('div');
//     // displayModal.classList.add("");
//     displayModal.innerHTML = `
//     <img src="${image}" alt="" srcset="">
//     <h3 class="text-lg font-bold">${title}</h3>
//     <p class="py-4">${details}</p>
//     `;
//     modal.appendChild(displayModal);
// }
// console.log(modalData());

const modal = (id) => {
    console.log(id);
    // const urlPart = parseInt(id);
    toggleSpinner(true);
    console.log(urlPart);
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
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

    const { title, image_url, details } = eachModalData.data[0];

    const displayModal = document.createElement('div');
    displayModal.innerHTML = `
    <img src="${image_url}" alt="" srcset="">
    <h3 class="text-lg font-bold">${title}</h3>
    <p class="py-4">${details}</p>
    `;
    modal.appendChild(displayModal);
    toggleSpinner(false);
}


// Spinner ... 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('hidden')
    }
    else{
        loaderSection.classList.add('hidden');
    }
}