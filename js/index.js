const handelCategories = async() =>{
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();

    const menuContainer = document.getElementById('menu-container');
    

    data.data.forEach((element) => {
        
        const div = document.createElement('div');
        div.innerHTML = `
        <button onclick ="handelNews('${element.category_id}')" class="btn btn-active bg-red-500 text-white m-auto">${element.category}</button>
        `;
        menuContainer.appendChild(div)
    });

}



const handelNews = async (elementId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${elementId}`);
    const data = await res.json();

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    const noData = document.getElementById('no-data')

    if(data.data.length===0){
        noData.classList.remove('hidden')

    }
    
    data.data.forEach((video) => {
        const div = document.createElement('div');
        
        div.innerHTML =`
        <div class="card card-compact w-80 bg-base-100 shadow-xl">
            <figure class="h-60"><img src=${video.thumbnail} />
            <div class="absolute bottom-40 right-0 text-white rounded-lg  bg-slate-600">${video.others.posted_date ? `${Math.floor(video.others.posted_date/60)} hrs ${video.others.posted_date%60} min ago` : ''}</div>
            </figure>
            
            <div class="card-body">
            
              <h2 class="card-title font-bold">
              <img src=${video.authors[0]?.profile_picture} class= "w-10 h-10 rounded-full " >
                ${video?.title}</h2>
              <div class="flex"><p class="px-10">${video.authors[0]?.profile_name}</p>
                <div>${video.authors[0].verified === true ? '<img src="img/verified.png" alt="" class="w-6">' : ''}</div>
            </div>
              <p class="px-10">${video?.others.views} views</p>
              
        
            </div>
          </div>
        `;
        

        cardContainer.appendChild(div)
    })
    
};

handelCategories()
handelNews("1000")