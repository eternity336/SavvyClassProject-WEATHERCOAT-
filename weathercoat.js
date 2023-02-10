let avatar = document.getElementsByName('player');

for (radio of avatar){
    radio.onclick = function() {
        let av = document.getElementById('avatar');
        console.log(this.id);
        av.src = `./images/${this.id}.png`
        document.cookie = `avatar=./images/${this.id}.png;`
        console.log('changed', document.cookie);
    }
}

function loadAvatar(){
    let av = document.getElementById('avatar');
    console.log("load",document.cookie)
    if(document.cookie.includes('avatar')){
        for(value of document.cookie.split(';')){
            if(value.includes('avatar=')){
                av.src = value.split('=')[1];
            }
        }
    }
}

loadAvatar();