
const loadVids = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    const vids = data.data;
    displayVids(vids);
}

const loadCats = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await res.json();
    const cats = data.data;
    createBtns(cats)
    console.log(cats)
}

loadVids(1000);
loadCats();

let container = document.getElementById('container');
const bluetich = `<i class="fa-solid fa-circle-check" style="color: #0433ff;"></i>`

const displayVids = vids => {
    vids.forEach(vid => {
        const card = document.createElement('div')
        card.classList = `card bg-base-100 shadow`

        card.innerHTML = `
        <figure><img class="rounded-lg h-48 w-full  object-cover" src="${vid.thumbnail}" alt="Shoes" /></figure>
            <div class="card-body flex flex-row">
                <div>
                    <img class="w-10 h-10 object-cover rounded-full" src="${vid.authors[0].profile_picture}" alt="Image">
                </div>
                <div>
                <h1 class="font-bold">${vid.title}</h1>
                <h2 class="text-sm text-[#171717b3]">${vid.authors[0].profile_name} ${vid.authors[0].verified ? bluetich: ""}</h2>
                <h3 class="text-sm text-[#171717b3]">${vid.others.views} views</h3>
            </div>
        </div>
        `;
        container.appendChild(card);
    });
    if(Object.keys(vids).length === 0){
        const div = document.createElement('div');
        div.classList = `flex flex-col justify-center items-center h-96 lg:col-span-4 md:col-span-2 text-center`;
        div.innerHTML = `<img src="images/Icon.png" alt="">
        <h1 class="text-4xl font-semibold">Oops!! Sorry, There is no <br> content here</h1>`
        container.appendChild(div);

    }
}

const btnContainer = document.getElementById('btns-container');
function createBtns(cats) {
    cats.forEach(cat => {
        const btn = document.createElement('button');
        btn.classList = `btn mx-1`;
        btn.innerText = cat.category;
        btnContainer.appendChild(btn);
        btn.onclick = function() {
            container.innerHTML = ``;
            loadVids(cat.category_id);
        }
    });
}