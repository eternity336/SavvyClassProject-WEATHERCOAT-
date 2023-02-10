function openContact(){
    const contactme = document.getElementById('contactme');
    if (!contactme.classList.contains('show')){
        contactme.classList.add('show');
    };
}

function submitContact(data){
    console.log("email submit", data);
}