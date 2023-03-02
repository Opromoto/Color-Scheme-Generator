const formEl = document.getElementById("form")
const selectEl = document.getElementById("select-el")
const colorDiv = document.getElementById("color-div")
const colorPicker = document.getElementById("color-picker")

document.addEventListener("click", e => {
    if(e.target.id !== "form" && e.target.id !== "select-el" && e.target.id !== "color-div" &&      e.target.id !== "color-picker" && e.target.id) {
        
        let selectedColor = document.getElementById(e.target.id)
        let bgColor = selectedColor.style.backgroundColor

        function rgb2hex(rgb) {
            if(/^#/.test(rgb))return rgb;// if returns colors as hexadecimal
            let re = /\d+/g;
            let hex = x => (x >> 4).toString(16)+(x & 0xf).toString(16);
            return "#"+hex(re.exec(rgb))+hex(re.exec(rgb))+hex(re.exec(rgb));
        }
        copyToClipboard(rgb2hex(bgColor))  
        // console.log(rgb2hex(bgColor))
    }
})

formEl.addEventListener("submit", (e) => {
    e.preventDefault()
    
    let color = colorPicker.value.slice(1,7)
    fetch(`https://www.thecolorapi.com/scheme/?hex=${color}&count=5&format=json&mode=${selectEl.value}`)
    .then(res => res.json())
    .then(data => {
        
        colorDiv.innerHTML = `
                
            <div class="container">
                <div class="inner-color-div" id="one" style="background-color: ${data.colors[0].hex.value};"></div>
                <div class="inner-color-div" id="two" style="background-color: ${data.colors[1].hex.value};"></div>
                <div class="inner-color-div" id="three" style="background-color: ${data.colors[2].hex.value};"></div>
                <div class="inner-color-div" id="four" style="background-color: ${data.colors[3].hex.value};"></div>
                <div class="inner-color-div" id="five" style="background-color: ${data.colors[4].hex.value};"></div>
            </div>
            <div class="container">
                <p class="hex-value">${data.colors[0].hex.value}</p>
                <p class="hex-value">${data.colors[1].hex.value}</p>
                <p class="hex-value">${data.colors[2].hex.value}</p>
                <p class="hex-value">${data.colors[3].hex.value}</p>
                <p class="hex-value">${data.colors[4].hex.value}</p>
            </div>`
        })

        return false  
})

  function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }