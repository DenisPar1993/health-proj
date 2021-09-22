window.addEventListener('DOMContentLoaded', ()=>{

const tabContent = document.querySelectorAll('.tabcontent'),
       tabHead =document.querySelectorAll('.tabheader__item'),
       tabHeadItems = document.querySelector('.tabheader__items')

  const hideContent =()=>{
      tabHead.forEach(item =>{
          item.classList.remove('tabheader__item_active');
      })
      tabContent.forEach(item =>{
         item.classList.add('hide');
         item.classList.remove('show','fade');
      })
  }
  const addContent =(i=0)=>{
      tabHead[i].classList.add('tabheader__item_active');
         tabContent[i].classList.add('show','fade');
         tabContent[i].classList.remove('hide');

  }
  hideContent();
  addContent();
   tabHeadItems.addEventListener('click', (event)=>{
       const target = event.target;
       if(target &&  target.classList.contains('tabheader__item')){
           tabHead.forEach((item,i)=>{
                if(target == item){
                    hideContent()
                    addContent(i)
                }
           })
       }    
   })



   //timer


//    const deadline = '2021-09-15';
//     blockDays = document.querySelector('#days'),
//    blockHours = document.querySelector('#hours')
//    blockMinutes = document.querySelector('#minutes')
//    blockSeconds = document.querySelector('#seconds')
//    console.log(blockDays);
//    function timeCount (endtime){
//     let t= new Date(deadline)-new Date();
//     days = Math.floor(t/(1000*60*60*24))
//     hours = Math.floor(t/(1000*60*60)%24)
//     minutes = Math.floor(t/(1000*60)%60)
//     seconds = Math.floor(t/1000%60)
//     console.log(seconds);
//     return {
//         total: t,
//         days: days,
//         hours: hours,
//         minutes: minutes,
//         seconds: seconds
//     }
//    } 
//     function getZero (num){
//         if(num>=0 && num<10){
//            return num='0'+num;
//         }else{
//            return num
//         }
//     }

//     function setClock(selector, endtime) {

//         const timer = document.querySelector(selector),
//             days = timer.querySelector("#days"),
//             hours = timer.querySelector('#hours'),
//             minutes = timer.querySelector('#minutes'),
//             seconds = timer.querySelector('#seconds'),
//             timeInterval = setInterval(updateClock, 1000);

//         updateClock();

//         function updateClock() {
//             const t = timeCount(endtime);

//             days.innerHTML = getZero(t.days);
//             hours.innerHTML = getZero(t.hours);
//             minutes.innerHTML = getZero(t.minutes);
//             seconds.innerHTML = getZero(t.seconds);

//             if (t.total <= 0) {
//                 clearInterval(timeInterval);
//             }
//         }
//     }
          

//     setClock('.timer', deadline);



    //Modal

const modal = document.querySelector('.modal'),
   atr = document.querySelectorAll('[data-modal]')
  atr.forEach((item)=>{
      item.addEventListener('click', ()=>{
          openModal()
      })
  })

  function openModal (){
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'
    clearInterval(modalTime)
  }

  function closeModal (){
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''
  }

  const modalTime = setTimeout(() => {
      openModal()
  }, 5000);

  

  
  modal.addEventListener('click', (e)=>{
       if(e.target == modal ||e.target.getAttribute('data-close')==''){
           closeModal();
       }
  })

  document.addEventListener('keydown',(e)=>{
      if(e.code == 'Escape'&& modal.classList.contains('show')){
          closeModal();
      }
  })
     
  function scrollModal (){
    if(window.pageYOffset+document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal();
        window.removeEventListener('scroll', scrollModal)

    }
  }

  window.addEventListener('scroll', scrollModal)
  console.log(atr);

  



//Карты
class MenuCart  {
constructor(src,alt, h3,text, price, parentSelector,...classes){
   this.src = src,
   this.alt = alt,
   this.h3=h3,
   this.classes=classes
   this.text = text,
   this.price = price,
   this.parentSelector = document.querySelector(parentSelector);
}
render(){
    const div = document.createElement('div');
    if(this.classes.length===0){
        this.classes='menu__item';
        div.classList.add(this.classes);
    }else{
        this.classes.forEach(elem =>div.classList.add(elem))
    }
    
    div.innerHTML = `
    <img src=${this.src} alt=${this.alt}>
    <h3 class="menu__item-subtitle">${this.h3}</h3>
    <div class="menu__item-descr">${this.text}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    </div>
`
console.log(this.classes);
this.parentSelector.append(div);
}
}

let cart = new MenuCart (
    "img/tabs/vegy.jpg" ,
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    '.menu__field .container',
    'menu__item',

) 
// cart.render();

let cartOne = new MenuCart (
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    '.menu__field .container',
    'menu__item',

)
// cartOne.render()

let cartTwo = new MenuCart (
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    '.menu__field .container',
    'menu__item',

)

// cartTwo.render();

getResource(' http://localhost:3000/menu')
.then(data=>{
    data.forEach(({img, altimg, title, descr, price})=>{
        new MenuCart(img, altimg, title, descr, price, ".menu .container").render();
    })
})



//Forms

const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
}
forms.forEach(item =>{
  bindPostData(item)
})
 const postData= async (url, data)=>{
    let  res = await fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
    })
    return await res.json();
 }

 async function getResource(url){
     let res = await fetch(url);
     if(!res.ok){
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
     }
     return await res.json();
 }
function bindPostData(form){
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin:0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);
        
        const formData = new FormData(form);
        const obj ={}
        formData.forEach((value,key)=>{
            obj[key]=value
        })
        // const json = JSON.stringify(obj)

        // request.send(json)
        postData('http://localhost:3000/requests',obj)
        
        .then(data=>{
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(()=>{
            showThanksModal(message.failure);
        }).finally(()=>{
            form.reset();
        })
    })
}

function showThanksModal(message){
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal()
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `<div class="modal__content">
       <div class = "modal__close" data-close>&times;</div>
       <div class = "modal__title">${message}</div>
    </div>    
    `
    document.querySelector('.modal').append(thanksModal);
    setTimeout(()=>{
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal()

    },4000)
}

fetch('db.json')
.then(data => data.json())
.then(res=>console.log(res))


//Slides

const slides= document.querySelectorAll('.offer__slide'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
       total = document.querySelector('#total'),
       current= document.querySelector('#current'),
       sliderWrapper = document.querySelector('.offer__slider-wrapper'),
       slideInner = document.querySelector('.offer__slider-inner'),
       width = window.getComputedStyle(sliderWrapper).width,
       offerSlide = document.querySelector('.offer__slider');
       let countInd = 1,
       offset = 0
            console.log(width);

     function deleteLetters (word){
         +word.replace(/\D/g,'')
     }

        
       if(slides.length<10){
        total.textContent = `0${slides.length}`
        current.textContent =`0${countInd}`
   }else{
       total.textContent = slides.length
       current.textContent =countInd
   }

          slideInner.style.width = 100*slides.length+'%'
       slideInner.style.display = 'flex';
       slideInner.style.transition = '0.5s all';
        

       sliderWrapper.style.overflow = 'hidden';

       slides.forEach(slide=>{
           slide.style.width = width;
       })
     offerSlide.style.position = 'relative';
     const indicator = document.createElement('ol');
     let dots = [];
     indicator.classList.add('carousel-indicators')
     indicator.style.cssText = `
     position: absolute;
     right: 0;
     bottom: 0;
     left: 0;
     z-index: 15;
     display: flex;
     justify-content: center;
     margin-right: 15%;
     margin-left: 15%;
     list-style: none;
     `;
     offerSlide.append(indicator);
     for(let i=0;i<slides.length;i++){
         const dot = document.createElement('li');
         dot.setAttribute('data-slide-to', i + 1)
         dot.style.cssText=`
         box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
         `;
         if(i==0){
             dot.style.opacity=1
         }
         indicator.append(dot);
         dots.push(dot)
     }

       next.addEventListener('click',()=>{
           if(offset==(+width.replace(/\D/g,'') *(slides.length-1))){
               offset=0
            
           }else{
               offset+= +width.slice(0,width.length-2)
               
           }

           slideInner.style.transform = `translateX(-${offset}px)`
           if(countInd==slides.length){
               countInd=1
           }else{
               countInd++;
           }
           if(slides.length <10){
            current.textContent =`0${countInd}`
        }else{
            current.textContent = countInd
        }

        dots.forEach(dot=>dot.style.opacity='.5')
        dots[countInd-1].style.opacity='1'
           
       })

       prev.addEventListener('click', ()=>{
           if(offset==0){
               offset= +width.replace(/\D/g,'') *(slides.length-1);
               
           }else{
               offset-= +width.replace(/\D/g,'')
               
           }
           slideInner.style.transform = `translateX(-${offset}px)`
           if(countInd==1){
               countInd=slides.length
           }else{
               countInd--;
           }
                      if(slides.length <10){
               current.textContent =`0${countInd}`
           }else{
               current.textContent = countInd
           }
           dots.forEach(dot=>dot.style.opacity='.5')
        dots[countInd-1].style.opacity='1'
           
       })
   

       dots.forEach(dot=>{
           dot.addEventListener('click', (e)=>{
               const slideTo = e.target.getAttribute('data-slide-to');
               countInd= slideTo;
               offset= +width.replace(/\D/g,'') *(slideTo-1);
               slideInner.style.transform = `translateX(-${offset}px)`;
               if(slides.length <10){
                current.textContent =`0${countInd}`
            }else{
                current.textContent = countInd
            }
            dots.forEach(dot=>dot.style.opacity='.5')
         dots[countInd-1].style.opacity='1'

               
           })
       })


       //calc

       const calcResult = document.querySelector('.calculating__result span');
       let sex,height,weight,age,ratio;
       if(localStorage.getItem('sex')){
           sex = localStorage.getItem('sex')
       }else{
           sex = 'female'
           localStorage.setItem('sex','female')
       }
       if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio')
    }else{
        ratio = 1.375
        localStorage.setItem('ratio',1.375)
    }

       function calcTotal (){
           if(!sex||!height||!weight||!age||!ratio){
               calcResult.textContent= 'Подставьте значение';
               return
           }
           if(sex==='female'){
               calcResult.textContent = Math.round((447.6+(9.2* weight)+(3.1*height)-(4.3*age))*ratio)
           }else{
            calcResult.textContent = Math.round((88.36+(13.4* weight)+(4.8*height)-(5.7*age))*ratio)
           }
       }
       calcTotal();

       function localSet(selector,activeClass){
           const elements = document.querySelectorAll(selector);

           elements.forEach(elem =>{
               elem.classList.remove(activeClass);
               if(elem.getAttribute('id')=== localStorage.getItem('sex')){
                   elem.classList.add(activeClass)
               }
               if(elem.getAttribute('data-ratio')===localStorage.getItem('ratio')){
                   elem.classList.add(activeClass)
               }
           })
       }
       localSet('#gender div', 'calculating__choose-item_active')
       localSet('.calculating__choose_big div', 'calculating__choose-item_active')


       function calcInformation(selector,activeClass){
           const elements = document.querySelectorAll(selector)

           elements.forEach(elem=>{
               elem.addEventListener('click',(e)=>{
                   if(e.target.getAttribute('data-ratio')){
                       ratio = +e.target.getAttribute('data-ratio')
                       localStorage.setItem('ratio',+e.target.getAttribute('data-ratio'))
                   }else{
                       sex = e.target.getAttribute('id');
                       localStorage.setItem('sex', e.target.getAttribute('id'))

                   }
                   elements.forEach(item=>{
                    item.classList.remove(activeClass)
                })
                e.target.classList.add(activeClass);
                calcTotal();
               })

              
           })

       }
       calcInformation('#gender div', 'calculating__choose-item_active')
       calcInformation('.calculating__choose_big div', 'calculating__choose-item_active')

       function inpInfo (selector){
           const input = document.querySelector(selector);
          

           input.addEventListener('input',()=>{
            if(input.value.match(/\D/g)){
                input.style.border="1px solid red"
            }else{
                input.style.border = 'none'
            }
              switch(input.getAttribute('id')){
                  case "height":
                      height = +input.value;
                      break;
                   case "weight":
                       weight = +input.value
                       break;
                   case "age":
                       age=+input.value;
                       break;       
              }
              calcTotal();
           })

       }
       inpInfo('#height')
       inpInfo('#weight')
       inpInfo('#age')




});