const searchEl = document.querySelector('.search');
const searchInput = searchEl.querySelector('input');

searchEl.addEventListener('click', function(){
   searchInput.focus();  
});

searchInput.addEventListener('focus', function(){
   searchEl.classList.add('focused'); 
   searchInput.setAttribute('placeholder','통합검색');
});

searchInput.addEventListener('blur', function(){
   searchEl.classList.remove('focused'); 
   searchInput.setAttribute('placeholder','');
});

//badge가 일정이상 스크롤 이상 내려가면 안보이게해주기
const badgeEl = document.querySelector('header .badges');

window.addEventListener('scroll', _.throttle(function(){
    console.log(window.scrollY);
    if(window.scrollY > 500){
        //gsap.to(요소, 지속시간(s) , 옵션); // 애니메이션 동작
        gsap.to(badgeEl, .6 , {
            opacity : 0,
            display : 'none'
        });
    } else {
        gsap.to(badgeEl, .6 , {
            opacity : 1,
            display : 'block'
        });
    }
},300));



//fade in,out
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl , index) {
    gsap.to(fadeEl, 1, {
        delay : (index + 1) * .7 ,
        opacity : 1
    });
});

// new Swiper(선택자,옵션)
new Swiper('.notice-line .swiper-container',{
    direction:'vertical',
    autoplay : true,
    loop : true
});

new Swiper('.promotion .swiper-container',{
    slidesPerView : 3, //한번에 보여줄 갯수
    spaceBetween: 10,  // 슬라이드 사이 여백
    centeredSlides: true, //1번 슬라이드가 가운데 보이기
    loop : true ,
    // autoplay : {
    //     delay : 5000
    // },
    pagination : {
        el : '.promotion .swiper-pagination', //페이지 번호 요소 선택자
        clickable : true
    },
    navigation : {
        prevEl : '.promotion .swiper-prev',
        nextEl : '.promotion .swiper-next'
    }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
    isHidePromotion = !isHidePromotion;
    if (isHidePromotion){
        promotionEl.classList.add('hide');
    } else {
        promotionEl.classList.remove('hide');
    }
});

/**
 * 부유하는 요소 관리
 */

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 '문자 데이터'를,
  // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
    //gsap.to(요소, 지속시간(s) , 옵션); // 애니메이션 동작
    gsap.to(selector,random(1.5,2.5), {
        y : size, //y축 으로 얼마만큼 움직이며 애니메이션 동작할지.
        repeat : -1 ,//무한반복
        yoyo : true, // 한번 재생된 애니메이션을 뒤로  다시 재생,
        ease: Power1.easeInOut, // Easing 함수 적용.
        delay : random(0,delay  )
    });
}
floatingObject('.floating1',1,15);
floatingObject('.floating2',.5,15);
floatingObject('.floating3',1.5,20);


const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl){
    new ScrollMagic
        .Scene({
            //객체데이터 정의
            triggerElement : spyEl, //보여짐 여부를 감시할 요소를 지정
            triggerHook : .8
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
});