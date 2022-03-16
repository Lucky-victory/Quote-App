const mainContainer=document.querySelector('.main-container');
const qotdContainer=document.querySelector('.qotd-container');

const baseUrl="https://quote-generator-21.herokuapp.com";
let allQuotes=[];
const colors=["#770680","#B35209","#A9095E","#077B60","#0882DD"];

async function fetcher(url,paramsObj){
   const params=new URLSearchParams(paramsObj);
   
   const response=await fetch(url+"?"+params);
   const data= await response.json();
   
   return data;
}
async function getLoveQuotes(){
  const d=await fetcher(baseUrl,{limit:5,category:"love"});
return d.data;
}
async function getInspirationalQuotes(){
  const d=await fetcher(baseUrl,{limit:5,category:"inspirational"});
 return d.data;

}
async function getMotivationalQuotes(){
  const d=await fetcher(baseUrl,{limit:5,category:"motivational"});
  
  return d.data;

}

async function getFriendshipQuotes(){
  const d=await fetcher(baseUrl,{limit:5,category:"friendship"});
  return d.data;

}
async function getDesignQuotes(){
  const d=await fetcher(baseUrl,{limit:5,category:"design"});
  return d.data
}
async function getAllQuotes(){
   mainContainer.innerHTML=`
   
      <div class="category-header">
      </div>
      <div class="cards-container">
         
   <div class="card-skeleton"></div>
   <div class="card-skeleton"></div>
      <div class="card-skeleton">
         
      </div>
      </div>
   `;
   
   const results=await Promise.allSettled([getLoveQuotes(),
      getInspirationalQuotes(),
      getMotivationalQuotes(),
      getFriendshipQuotes(),
      getDesignQuotes()]);
      
   const transformedResult=results.reduce((accum,result,index)=>{
      const q={"quotes":result.value,"color":colors[index]};
      accum.push(q);
      return accum;
   },[]);
allQuotes=transformedResult;
    renderAllQuotes(allQuotes);  
}
getAllQuotes()

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
function renderAllQuotes(allQuotes){
   if(!Object.keys(allQuotes).length){
      return
   }
   mainContainer.innerHTML='';
   allQuotes.forEach((quotes)=>{
      
   mainContainer.insertAdjacentHTML("beforeend",renderCardsContainer(quotes));
   })
   
}

async function QuoteOfTheDay(){
      qotdContainer.innerHTML='   <div class="card-skeleton"></div>'  
 
   let qotd= await fetcher(baseUrl+"/qotd");
   if(!Object.keys(qotd.data).length){
    qotdContainer.innerHTML='No Quote '  
      return 
   }
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
QuoteOfTheDay();