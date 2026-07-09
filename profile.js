/*TEAM PROFILE POPUP */

document.addEventListener("DOMContentLoaded", function () {
    const members = {

        1:{
            image:"chloe.png",
            name:"Jae Chloe Maryze Balasbas",
            role:"Front-End Developer",
            description:"Creates responsive webpages using HTML, CSS and JavaScript while ensuring an excellent user experience.",
            skills:["HTML","CSS","JavaScript","Responsive Design"]
        },

        2:{
            image:"fran.png",
            name:"Elizalde Fran",
            role:"Back-End Developer",
            description:"Develops server-side applications, databases and APIs.",
            skills:["PHP","SQL","JavaScript","CSS", "HTML", "C++"]
        },

        3:{
            image:"yvan.png",
            name:"Justin Gabriel Gojar",
            role:"UI / UX Designer",
            description:"Designs modern interfaces and user-friendly experiences.",
            skills:["C++","JavaScript","HTML","CSS"]
        },

        4:{
            image:"images/member4.jpg",
            name:"Jeff Yvan Pasion",
            role:"Project Manager",
            description:"Leads the team and ensures successful project completion.",
            skills:["Leadership","Planning","Communication","Documentation"]
        }

    };

    const modal = document.getElementById("profileModal");

    if(!modal) return;

    const profileImage = document.getElementById("profileImage");
    const profileName = document.getElementById("profileName");
    const profileRole = document.getElementById("profileRole");
    const profileDescription = document.getElementById("profileDescription");
    const profileSkills = document.getElementById("profileSkills");

    document.querySelectorAll(".profile-btn").forEach(button=> {
        button.onclick=function(e) {
            e.preventDefault();
            const member = members[this.dataset.member];
            profileImage.src = member.image;
            profileName.textContent = member.name;
            profileRole.textContent = member.role;
            profileDescription.textContent = member.description;
            profileSkills.innerHTML="";
            member.skills.forEach(skill=>{
                profileSkills.innerHTML += `<li>✔ ${skill}</li>`;

            });
            modal.classList.add("show");
        };
    });

    const close = document.querySelector(".close-modal");

    if(close) {
        close.onclick=function(){
            modal.classList.remove("show");
        };
    }

    modal.onclick=function(e) {
        if(e.target===modal){
            modal.classList.remove("show");
        }
    };
});