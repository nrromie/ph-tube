let container = document.getElementById('container');
const sortBtn = document.getElementById('sort-btn');

const loadVids = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json();
    const vids = data.data;
    sortBtn.onclick = function() {
        const sortedvids = vids.sort((a, b) => {
            const x = parseFloat(a.others.views);
            const y = parseFloat(b.others.views);
        
            return y - x;
        });
        container.innerHTML =``;
        displayVids(sortedvids)
    }
    displayVids(vids);
}

const loadCats = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    const data = await res.json();
    const cats = data.data;
    createBtns(cats)
}

loadVids(1000);
loadCats();

function converTime(sec) {
    if(sec > 0 ){
        const hrs = Math.floor(sec/3600);
        const mins = Math.floor((sec -(hrs*3600))/60);
        const p = `<p class="absolute top-40 right-2 bg-black text-white text-xs p-1 rounded-md">${hrs}hrs ${mins}min ago</p>`;
        return p;
    }
    else{
        return ``;
    }
};

const bluetich = `<i class="fa-solid fa-circle-check" style="color: #0433ff;"></i>`

const displayVids = vids => {
    vids.forEach(vid => {
        const card = document.createElement('div')
        card.classList = `card bg-base-100 relative hover:shadow`

        card.innerHTML = `
        <figure><img class="rounded-2xl h-48 w-full object-cover" src="${vid.thumbnail}" alt="Shoes" /></figure>
            <div class="card-body flex flex-row">
                <div>
                    <img class="w-10 h-10 object-cover rounded-full" src="${vid.authors[0].profile_picture}" alt="Image">
                </div>
                <div>
                <h1 class="font-bold">${vid.title}</h1>
                <h2 class="text-sm text-[#171717b3]">${vid.authors[0].profile_name} ${vid.authors[0].verified ? bluetich: ""}</h2>
                <h3 class="text-sm text-[#171717b3]">${vid.others.views} views</h3>
            </div>
            <div>${converTime(vid.others.posted_date)}</div>
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
        btn.classList = `btn sm:mx-1 mx-[1px]`;
        btn.innerText = cat.category;
        btnContainer.appendChild(btn);
        btn.onclick = function() {
            container.innerHTML = ``;
            loadVids(cat.category_id);
        }
    });
}

