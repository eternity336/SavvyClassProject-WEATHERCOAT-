let avatar = document.getElementsByName('player');

function getImage(src, nextFunc){
    let img = new Image();
    img.src = src;
    img.onload = nextFunc;
}

for (radio of avatar){
    radio.onclick = function() {
        let av = document.getElementById('avatar');
        let av_ctx = av.getContext('2d');
        getImage(`./Images/${this.id}.png`, loadAvatar)
    }
}

function loadAvatar(){
    //This is just for loading the avatar.  It clears the canvas and adds the avatar
    let av = document.getElementById('avatar');
    let av_ctx = av.getContext('2d');
    av_ctx.imageSmoothingEnabled = false;
    av_ctx.beginPath();
    av_ctx.rect(0, 0, av.width, av.height);
    av_ctx.fillStyle = 'lightblue';
    av_ctx.fill();
    av_ctx.drawImage(this, 0, 0, this.width, this.height, 5, 5, av.width - 10, av.height - 10);
}

function loadClothes(){
    //This does not clear the screen.  This is for adding the layers of clothing to the avatar.
    let av = document.getElementById('avatar');
    let av_ctx = av.getContext('2d');
    av_ctx.imageSmoothingEnabled = false;
    av_ctx.drawImage(this, 0, 0, this.width, this.height, 2, 2, av.width - 4, av.height - 4);
}

getImage('./Images/avatar1.png', loadAvatar)
getImage('./Images/avatar_shoes.png', loadClothes)
getImage('./Images/avatar_wintercoat.png', loadClothes)
