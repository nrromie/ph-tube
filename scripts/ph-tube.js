const loadVids = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/category/1000')
    const data = await res.json();
    const vids = data.data;
    displayVids(vids);
}

const container = document.getElementById('container');

const displayVids = vids => {
    const card = document.createElement('div')
    card.classList = `card w-96 bg-base-100 shadow-xl`
    vids.forEach(vid => {
        card.innerHTML = `
        <figure><img src='${vid.thumbnail}' /></figure>
        <div class="card-body">
        <h2 class="card-title">${vid.title}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
        </div>
        </div>
        `;
        container.appendChild(card);
    });
}

loadVids();