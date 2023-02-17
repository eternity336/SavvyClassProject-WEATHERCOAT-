let avatar = document.getElementsByName('player');

function getImage(src){
    let img = new Image();
    img.src = src;
    img.onload = loadAvatar;
}

for (radio of avatar){
    radio.onclick = function() {
        let av = document.getElementById('avatar');
        let av_ctx = av.getContext('2d');
        getImage(`./Images/${this.id}.png`)
        document.cookie = `avatar=./Images/${this.id}.png;`
        console.log('changed', document.cookie);
    }
}

function loadAvatar(){
    let av = document.getElementById('avatar');
    let av_ctx = av.getContext('2d');
    av_ctx.imageSmoothingEnabled = false;
    let hRatio = (av.width - 10) / this.width    ;
    let vRatio = (av.height - 10) / this.height  ;
    let ratio  = Math.min ( hRatio, vRatio );    
    av_ctx.drawImage(this, 0, 0, this.width, this.height, 5, 5, this.width * hRatio, this.height * vRatio);
    console.log(this)
    // if(document.cookie.includes('avatar')){
    //     for(value of document.cookie.split(';')){
    //         if(value.includes('avatar=')){
                
    //         }
    //     }
    // }
}

// let av = document.getElementById('avatar');
// let av_ctx = av.getContext('2d');
// av_ctx.beginPath();
// av_ctx.rect(0,0,av.width,av.height);
// av_ctx.fillStyle = 'lightblue';
// av_ctx.fill();