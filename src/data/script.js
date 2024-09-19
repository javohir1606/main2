const menu = document.querySelector(".menu");
const box = document.querySelector(".box");

import { catalog, hotdishes } from "./main.js";


const render = async () => {
  const data = await catalog();

  menu.innerHTML = await data.map((item) => `
  <button class="font-bold text-[16px] text-[#fff] rounded-[13px]" data-path="${item.path}">${item.name}</button>
  `).join("");

}
render();



const renderData = async (path) => {
  const data = await hotdishes(path);

  box.innerHTML = await data?.map((item) => `
       <div class="w-[192px] h-[260px] bg-[#1F1D2B] rounded-[16px] mt-6">
          <img class=" w-[132px] h-[132px] rounded-[50%] ml-auto mr-auto mt-[-15%]" src="${item.img}" alt="">
          <h2 class="text-[#fff] w-[144px] ml-auto mr-auto mt-4 mb-2 text-base">${item.title}</h2>
          <p class="text-[#fff] mb-1 text-center font-normal leading-[140%]">${item.price}</p>
          <p class="text-[#fff] font-normal text-base leading-[140%] text-center">${item.text}</p>
       </div>
`).join("");

}


menu.addEventListener('click', async (e) => {
  const path = e.target.dataset.path;
  if(path){
    await renderData(path)
  }
})



