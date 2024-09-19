const menu = document.querySelector(".menu");
const box = document.querySelector(".box");
const row = document.querySelector(".row");
let getArr = JSON.parse(localStorage.getItem("javohir"))|| []
import { catalog, hotdishes, soup } from "./main.js";


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
       <div class="w-[192px] h-[270px] bg-[#1F1D2B] rounded-[16px] mt-6">
          <img class=" w-[132px] h-[132px] rounded-[50%] ml-auto mr-auto mt-[-15%]" src="${item.img}" alt="">
          <h2 class="text-[#fff] w-[144px] ml-auto mr-auto mt-4 mb-2 text-center text-base">${item.title}</h2>
          <p class="text-[#fff] font-normal text-base leading-[140%] text-center mb-2">${item.text}</p>
              <div class="flex text-center justify-between ml-auto mr-auto p-[10px] items-center">
               <p class="text-[#fff] mb-1 text-center font-normal leading-[140%]">${item.price}</p>
               <button class="font-semibold text-[#EA7C69] text-base rounded-[8px] py-[5px] px-[10px] border" data-path="${path}" data-id="${item.id}">Show</button>
              </div>
       </div>
`).join("");

}

// const reducedPrice = getArr.reduce((a,b) => a + Number(b.price),0);

let score = 0;

for(let i = 0; i < getArr.length; i++){
  const price = Number(getArr[i].price);
  score += price;
}



const price = document.querySelector(".price");
const quantity = document.querySelector(".quantity");

quantity.innerHTML = `Quantity: ${getArr.length}`

price.innerHTML = `Price ${score}$`



menu.addEventListener('click', async (e) => {
  const path = e.target.dataset.path;
  if (path) {
    await renderData(path)
  }
})

renderData('hotdishes');


const renderCart = () => {
  row.innerHTML = getArr?.map((item) => `
  <div class="w-[192px] bg-[#271b6c] rounded-[16px] mt-6">
      <img class=" w-[132px] h-[132px] rounded-[50%] ml-auto mr-auto mt-[-15%]" src="${item.img}" alt="">
      <h2 class="text-[#fff] w-[144px] ml-auto mr-auto mt-4 mb-2 text-center text-base">${item.title}</h2>
      <p class="text-[#fff] font-normal text-base leading-[140%] text-center mb-2">${item.text}</p>
      <div class="flex text-center justify-between ml-auto mr-auto p-[10px] items-center">
         <p class="text-[#fff] mb-1 text-center font-normal leading-[140%]">${item.price}</p>
         <button class="font-semibold text-[#EA7C69] text-base rounded-[8px] py-[5px] px-[10px] border" data-id="${item.id}">delete</button>
      </div>
  </div>
`).join("");
}

const deleteCart = (id) =>{

  for (let i = 0; i < getArr.length; i++){
    if(getArr[i].id == id){
      getArr.splice(i, 1);
      break; 
    }
  }
  console.log(getArr);
  

   localStorage.setItem("javohir", JSON.stringify(getArr))
  renderCart()
}



const renderId = async (id, path) => {
  const data = await soup(id, path);
  

  let a = false;
  for (let i = 0; i < getArr.length; i++) {
    if (getArr[i].id == data.id) {
      a = true;
      break;
    }
  }
  
  if (!a) {
    getArr.push(data);
    renderCart()
   
  }

   localStorage.setItem("javohir", JSON.stringify(getArr))

}

renderCart()

box.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  const path = e.target.dataset.path;

console.log(e.target.dataset);

  if (id) {
    renderId(id, path);

  }

})

row.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  console.log(id);
  
  if(id){
    deleteCart(id);
  }
})