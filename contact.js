
const form = document.getElementById("contactForm");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const name =
    form.querySelector('input[type="text"]').value.trim();

    const email =
    form.querySelector('input[type="email"]').value.trim();

    const message =
    form.querySelector("textarea").value.trim();

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(name === ""){

        alert("Please enter your name.");

        return;

    }

    if(!emailPattern.test(email)){

        alert("Please enter a valid email address.");

        return;

    }

    if(message.length < 10){

        alert("Message should be at least 10 characters.");

        return;

    }

    popup.classList.add("show");

    form.reset();

});

closePopup.addEventListener("click",()=>{

    popup.classList.remove("show");

});

popup.addEventListener("click",(e)=>{

    if(e.target===popup){

        popup.classList.remove("show");

    }

});


const faqItems =
document.querySelectorAll(".faq-item");

faqItems.forEach(item=>{

    const question =
    item.querySelector(".question");

    question.addEventListener("click",()=>{

        faqItems.forEach(box=>{

            if(box!==item){

                box.classList.remove("active");

                box.querySelector("i").className =
                "fa-solid fa-plus";

            }

        });

        item.classList.toggle("active");

        const icon =
        item.querySelector("i");

        if(item.classList.contains("active")){

            icon.className =
            "fa-solid fa-minus";

        }else{

            icon.className =
            "fa-solid fa-plus";

        }

    });

});



const heroBtn =
document.querySelector(".hero-btn");

heroBtn.addEventListener("click",(e)=>{

    e.preventDefault();

    document.querySelector("#contact")
    .scrollIntoView({

        behavior:"smooth"

    });

});


window.addEventListener("scroll",()=>{

    const header =
    document.querySelector("header");

    if(window.scrollY>60){

        header.style.boxShadow =
        "0 10px 25px rgba(0,0,0,.15)";

    }

    else{

        header.style.boxShadow =
        "0 5px 20px rgba(0,0,0,.08)";

    }

});


const observer =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.15
});

document.querySelectorAll(

".contact,.map,.faq"

).forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});


document.querySelectorAll(".social a").forEach(icon=>{

    icon.addEventListener("mouseenter",()=>{

        icon.style.transform =
        "translateY(-8px) scale(1.1)";

    });

    icon.addEventListener("mouseleave",()=>{

        icon.style.transform =
        "translateY(0) scale(1)";

    });

});



document.querySelectorAll(

".input-box input,.input-box textarea"

).forEach(input=>{

    input.addEventListener("focus",()=>{

        input.style.borderColor="#d6336c";

        input.style.boxShadow=
        "0 0 15px rgba(214,51,108,.25)";

    });

    input.addEventListener("blur",()=>{

        input.style.borderColor="#ddd";

        input.style.boxShadow="none";

    });

});


const sendBtn =
document.querySelector(".contact-form button");

sendBtn.addEventListener("click",function(e){

    const ripple =
    document.createElement("span");

    ripple.classList.add("ripple");

    this.appendChild(ripple);

    const x =
    e.offsetX;

    const y =
    e.offsetY;

    ripple.style.left=x+"px";

    ripple.style.top=y+"px";

    setTimeout(()=>{

        ripple.remove();

    },600);

});



console.log("MWA Contact Page Loaded Successfully");