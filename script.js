
const menubuttons = document.querySelector("#menu-buttons");
const menu = document.querySelector("#menu");
const burger= document.querySelector("#burger");
const cross= document.querySelector("#cross");

menubuttons.addEventListener("click",menuburger);

function menuburger(){
  
  console.log(menu.classList);
  if(menu.classList[0]!="open"){

       menu.classList.add("open");
       //console.log("open");
        burger.style.display = 'none';
        menu.style.display = 'block';
        cross.style.display = 'block';

    }else{
        menu.classList.remove("open");
        //console.log("close");
        menu.style.display = 'none';
        cross.style.display = 'none';
        burger.style.display = 'block';
    }  
}

  menu.addEventListener('click', () => {
    menu.style.display = 'none';
    cross.style.display = 'none';
    burger.style.display = 'block';
  });

  
// Intersection-observer du rat
const box = new IntersectionObserver(function (entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.style.animation = `rat-opaque 4s ease-in-out forwards`;
      }   
    } 
        }, {
          threshold: [0.5]
})
  box.observe(document.querySelector('.box'))


  const mouse = new IntersectionObserver(function (entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.style.animation = `running-rat 3s cubic-bezier(.62,.64,.45,.97) forwards`;
      }   
    } 
        }, {
          threshold: [0.5]
})
  mouse.observe(document.querySelector('.mouse'))


  const rat = new IntersectionObserver(function (entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.style.animation = `little-jump 0.2s infinite`;
      }   
    } 
        }, {
          threshold: [0.5]
})
  rat.observe(document.querySelector('.rat'))
