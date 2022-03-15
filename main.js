const mainContainer=document.querySelector('.main-container');
const qotdContainer=document.querySelector('.qotd-container');

const baseUrl="https://quote-generator-21.herokuapp.com";
const opt=[];
async function fetcher(url,paramsObj){
   const params=new URLSearchParams(paramsObj);
   
   const response=await fetch(url+"?"+params);
   const data= await response.json();
   
   return data;
}
async function getQuotes(){
  const d=await fetcher(baseUrl,{limit:5,category:"love"});
  opt.push({"quotes":d.data,color:"#0882DD"})

  renderAllQuotes(opt)

}
async function getQuotes2(){
  const d=await fetcher(baseUrl,{limit:5,category:"motivational"});
  opt.push({"quotes":d.data,color:"#077B60"})
  renderAllQuotes(opt)

}
async function getQuotes3(){
  const d=await fetcher(baseUrl,{limit:5,category:"friendship"});
  opt.push({"quotes":d.data,color:"#B35209"})
  renderAllQuotes(opt)

}

async function getQuotes4(){
  const d=await fetcher(baseUrl,{limit:5,category:"design"});
  opt.push({"quotes":d.data,color:"#A9095E"})
  renderAllQuotes(opt)

}
getQuotes()
getQuotes2()
getQuotes3()
getQuotes4()
// fetcher(baseUrl,{limit:10,category:"love"});

function renderCards(data=[]){
   let html="";
   if(!Object.keys(data).length){
   html='No Quotes to render';
   return;   
   }
   data.quotes.forEach((q)=>{
      return(html+=`
        <div class="card">
         <div class="card-image-wrapper">
            <img src="https://source.unsplash.com/random/600x400?${q.category}" alt="" class="card-image">
         </div>  
         <div class="card-content">
           <p>${q.content}</p>
           <span class='card-author'>${q.author}</span>
         </div>
        </div>
   
     
  
`)
   });
   
  return html; 
}
function renderCardsContainer(data){
   const html=`<div class="container" style="--theme:${data.color}">
        <div class="category-header">
           <h2 class="category-header-title">${data.quotes[0].category} quotes</h2>
        </div>
             <div class="cards-container">

        ${renderCards(data)}
        </div>
   </div>
        `;
    return html;    
}
function renderAllQuotes(opt){
   mainContainer.innerHTML='';
   
   opt.forEach((op)=>{
      
   mainContainer.insertAdjacentHTML("beforeend",renderCardsContainer(op));
   })
   
}

async function QuoteOfTheDay(){
   let qotd= await fetcher(baseUrl+"/qotd");
   qotd=qotd.data;
   qotdContainer.innerHTML=`<div class="card">
      <div class="card-image-wrapper">
               <img src="https://source.unsplash.com/random/600x400?${qotd.category}" alt="" class="card-image">
            </div> <div class="card-content" >
      <p>${qotd.content}</p> 
      <span class='card-author' > ${ qotd.author }
   </span> 
   </div> 
   </div>`
}
QuoteOfTheDay()