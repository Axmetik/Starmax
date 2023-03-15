const radio = document.querySelector('popup__radio');
const newpostBtn = document.getElementById('newpost');
const kyivBtn = document.getElementById('kyiv');
const kyivList = document.getElementById('kyiv-list');
const newpostList = document.getElementById('newpost-list');

document.addEventListener('click', function(event){
    if(newpostBtn.checked){
        kyivList.style.display = 'none';
        newpostList.style.display = 'block';
    }
    if(kyivBtn.checked){
        newpostList.style.display = 'none';
        kyivList.style.display = 'block';
    }
})

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;
const timeout = 800;

if(popupLinks.length > 0){
    for(let i = 0; i < popupLinks.length; i++){
        const popupLink = popupLinks[i];
        popupLink.addEventListener('click', function(event){
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            event.preventDefault();
        });
    }
}

const  popupCloseIcon = document.querySelectorAll('.popup__close');
if(popupCloseIcon.length > 0){
    for(let i = 0; i < popupCloseIcon.length; i++){
        const el = popupCloseIcon[i];
        el.addEventListener('click', function(event){
            popupClose(el.closest('.popup'));
            event.preventDefault();
        });
    }
}

function popupOpen(currentPopup){
    if(currentPopup && unlock){
        const popupActive = document.querySelector('.popup.open');
        if(popupActive){
            popupClose(popupActive, false);
        }else{
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function(event){
            if(!event.target.closest('.popup__content')){
                popupClose(event.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true){
    if(unlock){
        popupActive.classList.remove('open');
        if(doUnlock){
            bodyUnlock();
        }
    }
}

function bodyLock(){
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    for(let i = 0; i < lockPadding.length; i++){
        const el = lockPadding[i];
        el.style.paddingRight = lockPaddingValue;
    }

    body.style.paddingRight = lockPaddingValue;
    body.style.paddingLeft = '-'+lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function(){
        unlock = true;
    }, timeout);
}

function bodyUnlock(){
    setTimeout(function(){
        for(let i = 0; i < lockPadding.length; i++){
            const el = lockPadding[i];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.style.paddingLeft = '0px';
        body.classList.remove('lock');
    }, timeout);
}

new Swiper('.swiper', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 30,

    breakpoints: {
        1399: {
            slidesPerView: 3,
            spaceBetween: 30
          },
        990: {
            slidesPerView: 2,
            spaceBetween: 30
        },

    },

    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },

  });

