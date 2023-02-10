function gradient_color(temp){
    //takes a temp and determines color from a gradient
    const low_temp = -100
    const high_temp = 200
    const r_low = 138
    const g_low = 255
    const b_low = 246
    const r_high = 254
    const g_high = 1
    const b_high = 1
    let perc = (temp + 100) /3
    let perc_r = (r_low + r_high)/100*perc
    let perc_g = (g_low + g_high)/100*perc
    let perc_b = (b_low + b_high)/100*perc
    return [perc_r, perc_g, perc_b]
}

console.log(gradient_color(75))
console.log(gradient_color(100))

function home(){
    document.getElementById("home_frame").src = './clouds.html';
}

function about(){
    document.getElementById("home_frame").src = './about.html';
}

function weather(){
    document.getElementById("home_frame").src = './weathercoat.html';
}
