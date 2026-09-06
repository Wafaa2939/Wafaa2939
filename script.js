/* =====================================================
   PASSWORD
===================================================== */

const PASSWORD_CODE = "9/6/1988";


/* =====================================================
   MUSIC
   لازم Music Mama.mp3 يكون في نفس فولدر الموقع
===================================================== */

const memoryMusic = new Audio("Music Mama.mp3");

memoryMusic.preload = "auto";
memoryMusic.volume = 0.8;
memoryMusic.loop = false;


/* =====================================================
   PHOTOS
===================================================== */

const photos = [];

for(let i = 1; i <= 22; i++){

    photos.push(
        `MAMA ${i}.jpeg`
    );

}


/* =====================================================
   ELEMENTS
===================================================== */

const passwordScreen =
    document.getElementById(
        "passwordScreen"
    );

const passwordInput =
    document.getElementById(
        "password"
    );

const enterBtn =
    document.getElementById(
        "enterBtn"
    );

const error =
    document.getElementById(
        "error"
    );

const cinema =
    document.getElementById(
        "cinema"
    );

const memoryShow =
    document.getElementById(
        "memoryShow"
    );

const memoryImage =
    document.getElementById(
        "memoryImage"
    );

const memoryCounter =
    document.getElementById(
        "memoryCounter"
    );

const collageShow =
    document.getElementById(
        "collageShow"
    );

const collageContainer =
    document.getElementById(
        "collageContainer"
    );

const finalScreen =
    document.getElementById(
        "finalScreen"
    );

const mainSite =
    document.getElementById(
        "mainSite"
    );


/* =====================================================
   PRELOAD PHOTOS
===================================================== */

const loadedPhotos = [];

photos.forEach(
    (src,index) => {

        const img =
            new Image();

        img.src =
            src;

        loadedPhotos[index] =
            img;

    }
);


/* =====================================================
   PASSWORD CHECK
===================================================== */

enterBtn.addEventListener(
    "click",
    checkPassword
);


passwordInput.addEventListener(
    "keydown",
    function(event){

        if(event.key === "Enter"){

            checkPassword();

        }

    }
);


function checkPassword(){

    /* -------------------------
       الباسورد غلط
    ------------------------- */

    if(
        passwordInput.value !==
        PASSWORD_CODE
    ){

        error.style.display =
            "block";

        passwordInput.value =
            "";

        return;

    }


    /* -------------------------
       الباسورد صحيح
    ------------------------- */

    error.style.display =
        "none";


    /*
       تشغيل الأغنية فوراً
       لأن المستخدم ضغط الزر/Enter
    */

    memoryMusic.currentTime =
        0;

    memoryMusic.play().catch(
        function(){

            /*
               لو المتصفح منع التشغيل
               نحاول تشغيلها مرة ثانية
               عند بداية السينما
            */

        }
    );


    /* -------------------------
       إخفاء شاشة الباسورد
    ------------------------- */

    passwordScreen.style.opacity =
        "0";


    setTimeout(
        function(){

            passwordScreen.style.display =
                "none";

            startCinema();

        },
        900
    );

}


/* =====================================================
   START CINEMA
===================================================== */

function startCinema(){

    cinema.style.display =
        "block";

    cinema.style.opacity =
        "1";

    memoryShow.style.display =
        "none";

    collageShow.style.display =
        "none";


    const intro =
        document.getElementById(
            "cinemaIntro"
        );


    if(intro){

        intro.style.display =
            "flex";

        intro.style.opacity =
            "1";


        setTimeout(
            function(){

                intro.style.opacity =
                    "0";


                setTimeout(
                    function(){

                        intro.style.display =
                            "none";

                        memoryShow.style.display =
                            "flex";

                        playFirstFast();

                    },
                    1200
                );


            },
            2800
        );


    }else{

        memoryShow.style.display =
            "flex";

        playFirstFast();

    }

}


/* =====================================================
   SET PHOTO
   لا يوجد فريم فاضي
===================================================== */

function setPhoto(
    index,
    type
){

    if(
        !loadedPhotos[index]
    ){

        return;

    }


    memoryImage.src =
        loadedPhotos[index].src;


    memoryCounter.textContent =
        `${String(index + 1).padStart(2,"0")} / 22`;


    /* -------------------------
       FAST
    ------------------------- */

    if(type === "fast"){

        memoryImage.style.transition =
            "none";

        memoryImage.style.opacity =
            "1";

        memoryImage.style.transform =
            "scale(1.06)";


        requestAnimationFrame(
            function(){

                memoryImage.style.transform =
                    "scale(1)";

            }
        );

    }


    /* -------------------------
       NORMAL
    ------------------------- */

    if(type === "normal"){

        memoryImage.style.transition =
            "none";

        memoryImage.style.opacity =
            "1";

        memoryImage.style.transform =
            "scale(1.13)";


        requestAnimationFrame(
            function(){

                memoryImage.style.transition =
                    "transform 950ms cubic-bezier(.16,1,.3,1)";

                memoryImage.style.transform =
                    "scale(1)";

            }
        );

    }

}


/* =====================================================
   FIRST 22
   VERY FAST
===================================================== */

function playFirstFast(){

    let index = 0;


    function next(){

        if(index >= 22){

            setTimeout(
                playNormal,
                450
            );

            return;

        }


        setPhoto(
            index,
            "fast"
        );


        index++;


        setTimeout(
            next,
            70
        );

    }


    next();

}


/* =====================================================
   NORMAL 22
===================================================== */

function playNormal(){

    let index = 0;


    function next(){

        if(index >= 22){

            setTimeout(
                showCollage,
                600
            );

            return;

        }


        setPhoto(
            index,
            "normal"
        );


        index++;


        setTimeout(
            next,
            1000
        );

    }


    next();

}


/* =====================================================
   BIG COLLAGE
===================================================== */

function showCollage(){

    memoryShow.style.display =
        "none";


    collageShow.style.display =
        "flex";


    collageShow.style.opacity =
        "1";


    collageContainer.innerHTML =
        "";


    /*
       22 صورة
       كبيرة
       ومتداخلة
       وتملأ الشاشة
    */

    const positions = [

        [-430,-280,-13],
        [-215,-315,8],
        [0,-335,-5],
        [215,-315,11],
        [430,-280,-8],

        [-500,-80,8],
        [-250,-105,-10],
        [0,-120,4],
        [250,-105,-7],
        [500,-80,12],

        [-500,120,-9],
        [-250,105,7],
        [0,90,-4],
        [250,105,10],
        [500,120,-11],

        [-430,305,11],
        [-215,285,-7],
        [0,315,6],
        [215,285,-10],
        [430,305,8],

        [-125,0,-6],
        [125,10,7]

    ];


    photos.forEach(
        function(
            photo,
            index
        ){

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "collagePhoto";


            const img =
                document.createElement(
                    "img"
                );


            img.src =
                photo;


            img.alt =
                "ذكرى";


            card.appendChild(
                img
            );


            const p =
                positions[index];


            card.style.setProperty(
                "--px",
                `${p[0]}px`
            );


            card.style.setProperty(
                "--py",
                `${p[1]}px`
            );


            card.style.setProperty(
                "--rot",
                `${p[2]}deg`
            );


            card.style.animation =
                `collageAppearFixed 1s cubic-bezier(.16,1,.3,1) ${index * 0.08}s forwards`;


            collageContainer.appendChild(
                card
            );

        }
    );


    /*
       مدة التجميعة
    */

    setTimeout(
        function(){

            collageShow.style.opacity =
                "0";


            setTimeout(
                function(){

                    collageShow.style.display =
                        "none";


                    memoryShow.style.display =
                        "flex";


                    playFinalFast();

                },
                1100
            );

        },
        8500
    );

}


/* =====================================================
   END OF CINEMA
   لا نعرض 22 صورة إضافية
===================================================== */

function playFinalFast(){

    /*
       بعد:
       22 صورة سريعة
       +
       22 صورة بطيئة
       +
       التجميعة

       ننتقل لشاشة النهاية السوداء
    */

    setTimeout(
        finishCinema,
        500
    );

}


/* =====================================================
   FINAL BLACK SCREEN → MAIN WEBSITE
===================================================== */

function finishCinema(){

    const creditsOpening =
        document.querySelector(
            ".creditsOpening"
        );


    const finalPhotosLayer =
        document.getElementById(
            "finalPhotos"
        );


    const creditsEnd =
        document.querySelector(
            ".creditsEnd"
        );


    /*
       شاشة سوداء فقط
       بدون صور النهاية
    */

    if(finalPhotosLayer){

        finalPhotosLayer.style.display =
            "none";

    }


    if(creditsEnd){

        creditsEnd.style.display =
            "none";

    }


    if(creditsOpening){

        creditsOpening.style.display =
            "flex";

        creditsOpening.style.minHeight =
            "100vh";

    }


    finalScreen.style.display =
        "flex";


    finalScreen.style.opacity =
        "0";


    finalScreen.style.transition =
        "opacity 1.6s cubic-bezier(.22,1,.36,1)";


    document.body.style.overflow =
        "hidden";


    /*
       إخفاء السيناريو تدريجياً
    */

    cinema.style.transition =
        "opacity 1.6s cubic-bezier(.22,1,.36,1)";


    cinema.style.opacity =
        "0";


    requestAnimationFrame(
        function(){

            finalScreen.style.opacity =
                "1";

        }
    );


    /*
       نترك رسالة النهاية ظاهرة قليلاً
    */

    setTimeout(
        function(){

            finalScreen.style.opacity =
                "0";


            setTimeout(
                function(){

                    finalScreen.style.display =
                        "none";


                    cinema.style.display =
                        "none";


                    mainSite.style.display =
                        "block";


                    mainSite.style.opacity =
                        "0";


                    mainSite.style.transition =
                        "opacity 1.4s ease";


                    window.scrollTo(
                        0,
                        0
                    );


                    requestAnimationFrame(
                        function(){

                            mainSite.style.opacity =
                                "1";

                        }
                    );


                    document.body.style.overflow =
                        "auto";


                    /*
                       رجوع طبقات شاشة النهاية
                    */

                    if(finalPhotosLayer){

                        finalPhotosLayer.style.display =
                            "flex";

                    }


                    if(creditsEnd){

                        creditsEnd.style.display =
                            "flex";

                    }


                    if(creditsOpening){

                        creditsOpening.style.minHeight =
                            "72vh";

                    }

                },
                1600
            );

        },
        4200
    );

}


/* =====================================================
   END BUTTON
   BLACK SERIES ENDING + 22 AUTO-SCROLL PHOTOS
===================================================== */

const endButton =
    document.getElementById(
        "endButton"
    );


const finalScreenElement =
    document.getElementById(
        "finalScreen"
    );


const finalPhotos =
    document.getElementById(
        "finalPhotos"
    );


/* =====================================================
   BUILD FINAL CREDITS
===================================================== */

function buildFinalCredits(){

    if(
        !finalPhotos ||
        finalPhotos.dataset.ready === "1"
    ){

        return;

    }


    for(
        let i = 1;
        i <= 22;
        i++
    ){

        const img =
            document.createElement(
                "img"
            );


        img.className =
            "endPhoto";


        img.src =
            `MAMA ${i}.jpeg`;


        img.alt =
            `ذكرى ${i}`;


        finalPhotos.appendChild(
            img
        );

    }


    finalPhotos.dataset.ready =
        "1";

}


/* =====================================================
   PLAY FINAL CREDITS
===================================================== */

function playFinalCredits(){

    buildFinalCredits();


    finalScreenElement.scrollTop =
        0;


    const endPhotos =
        finalPhotos.querySelectorAll(
            ".endPhoto"
        );


    endPhotos.forEach(
        function(img){

            img.classList.remove(
                "show"
            );

        }
    );


    finalScreenElement.style.display =
        "block";


    finalScreenElement.style.opacity =
        "0";


    document.body.style.overflow =
        "hidden";


    requestAnimationFrame(
        function(){

            finalScreenElement.style.opacity =
                "1";

        }
    );


    /*
       الصور تظهر واحدة واحدة
    */

    endPhotos.forEach(
        function(
            img,
            index
        ){

            setTimeout(
                function(){

                    img.classList.add(
                        "show"
                    );

                },
                900 + (index * 650)
            );

        }
    );


    /*
       Camera scroll
       يتحرك ببطء خلال الـ22 صورة
    */

    setTimeout(
        function(){

            const maxScroll =
                finalScreenElement.scrollHeight -
                finalScreenElement.clientHeight;


            const duration =
                Math.max(
                    18000,
                    endPhotos.length * 1050
                );


            const start =
                performance.now();


            function scrollFrame(now){

                const progress =
                    Math.min(
                        1,
                        (now - start) /
                        duration
                    );


                /*
                   Cinematic easing
                */

                const eased =
                    progress < .5
                        ? 2 * progress * progress
                        : 1 -
                          Math.pow(
                              -2 * progress + 2,
                              2
                          ) / 2;


                finalScreenElement.scrollTop =
                    maxScroll * eased;


                if(progress < 1){

                    requestAnimationFrame(
                        scrollFrame
                    );

                }

            }


            requestAnimationFrame(
                scrollFrame
            );

        },
        1800
    );

}


/* =====================================================
   END BUTTON EVENT
===================================================== */

if(endButton){

    endButton.addEventListener(
        "click",
        function(){

            playFinalCredits();

        }
    );

}


/* =====================================================
   MESSAGE SAVE
===================================================== */

const message =
    document.getElementById(
        "message"
    );


const saveMessage =
    document.getElementById(
        "saveMessage"
    );


if(
    message &&
    saveMessage
){

    const savedMessage =
        localStorage.getItem(
            "mamaMessage"
        );


    if(savedMessage){

        message.value =
            savedMessage;

    }


    saveMessage.addEventListener(
        "click",
        function(){

            if(
                message.value.trim() === ""
            ){

                alert(
                    "اكتب الرسالة الأول 🤍"
                );

                return;

            }


            localStorage.setItem(
                "mamaMessage",
                message.value
            );


            alert(
                "الرسالة اتحفظت ❤️"
            );

        }
    );

}