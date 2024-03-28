let light1 = "#edf6f9";
let light2 = "#ffddd2";
let dark1 = "#196d77";
let dark2 = "#012529";
let dark3 = "#e29578";


let double_tap_wait = 400;
let double_tap_timer = null;

let visibility = 0

let digits = [];
for (let i = 1; i<=8; i++){
    digits.push(i.toString());
}
let symbols = []

let symbol_str = "!@#$%^&*"
Array.from(symbol_str).forEach(element=>{
    symbols.push(element);
})

let mode = 0;
let menu = 0;
let input = 0;

let menu_matrix = [["Sentence", "Word", "Alphabet", "Digit"],["Sentence", "Word", "Alphabet", "Digit"],["Command", "Word", "Alphabet", "Digit"],["Navigation", "Interaction", "Information", "Utility"]]

document.body.addEventListener("keydown", (event)=>{
    // console.log(event);
    if(event.key=="." || event.key==">"){
        event.preventDefault();

        update_colour("buttonM", 1)

        mode_check(event.ctrlKey,event.shiftKey); 
    }
    else if(digits.includes(event.key)){
        event.preventDefault();

        update_colour("button"+event.key, 1)

        input_change(event.key,event.ctrlKey,event.shiftKey);
    }
    else if(symbols.indexOf(event.key)!=-1){
        event.preventDefault();

        update_colour("button"+(symbols.indexOf(event.key)+1), 1)

        input_change(symbols.indexOf(event.key)+1, event.ctrlKey, event.shiftKey);
    }


    if(event.ctrlKey){
        // event.preventDefault();
        update_colour("buttonS2", 1);
    }
    if(event.shiftKey){
        // event.preventDefault();
        update_colour("buttonS1", 1);
    }

    // console.log(mode,menu,input)
});

document.body.addEventListener("keyup", (event)=>{
    if(event.key=="." || event.key==">"){
        event.preventDefault();

        update_colour("buttonM", 0)
    }
    else if(digits.includes(event.key)){
        event.preventDefault();

        update_colour("button"+event.key, 0)

        if(event.shiftKey){
            update_colour("button")
        }
    }
    else if(symbols.indexOf(event.key)!=-1){
        event.preventDefault();

        update_colour("button"+(symbols.indexOf(event.key)+1), 0)
    }
    if(event.key=="Control"){
        // event.preventDefault();

        update_colour("buttonS2", 0);
    }
    if(event.key=="Shift"){
        // event.preventDefault();

        update_colour("buttonS1", 0);
    }
    // console.log(event)
})

function update_colour(idName, keyPressed){
    if(keyPressed){
        document.getElementById(idName).style.backgroundColor = dark1
        document.getElementById(idName).style.color = light1
        document.getElementById(idName).style.border = "2px solid "+light1
    }else{
        document.getElementById(idName).style.backgroundColor = light2
        document.getElementById(idName).style.color = dark1
        document.getElementById(idName).style.border = "2px solid "+dark1
    }

}

function mode_check(shift1, shift2){
    if(!double_tap_timer){
        double_tap_timer = setTimeout(()=>{
            double_tap_timer = null;
            menu_change(shift1, shift2);
        }, double_tap_wait);
    }else{
        clearTimeout(double_tap_timer);
        double_tap_timer = null;
        mode_change(shift1, shift2);
    }
}

function menu_change(shift1, shift2){
    menu = (2*shift1)+shift2;
    // console.log(menu);
    console.log("menu changed", menu)
    xupdate("internal");
}

function mode_change(shift1, shift2){
    mode = (2*shift1)+shift2;
    console.log("mode changed", mode)
    menu=0;
    xupdate("internal")
}

function input_change(xinput, shift1, shift2){
    let input_combination = (2*shift1)+shift2;
    xinput = parseInt(xinput)
    input = parseInt((8*input_combination)+xinput);

    xupdate("overall")
}

function xupdate(className){
    let input_element = document.querySelectorAll(".input_"+className);
    input_element.forEach(element => {
        element.innerHTML = "Input Button: "+ input;
    });
    let mode_text = "";
    switch (mode){
        case 0:
            mode_text = "Mode: User Interaction Mode";
            break;
        case 1:
            mode_text = "Mode: Chat Mode";
            break;
        case 2:
            mode_text = "Mode: Virtual Keyboard Mode";
            break;
        case 3:
            mode_text = "Mode: Voice Command Mode";
            break;
        }
    for(let i=1;i<=4;i++){
        document.getElementsByClassName("menu"+i)[0].innerHTML = menu_matrix[mode][i-1]
    }
    let mode_element = document.querySelectorAll(".mode_"+className);
    mode_element.forEach(element=>{
        element.innerHTML = mode_text;
    })

    let menu_text = "";
    switch (mode){
        case 0:
        case 1:
            switch (menu){
                case 0:
                    menu_text = "Menu: Sentence Menu";
                    break;
                case 1:
                    menu_text = "Menu: Word Menu";
                    break;
                case 2:
                    menu_text = "Menu: Alphabet Menu";
                    break;
                case 3:
                    menu_text = "Menu: Digit Menu";
                    break;
            }
            break;
        case 2:
            switch (menu){
                case 0:
                    menu_text = "Menu: Command Menu";
                    break;
                case 1:
                    menu_text = "Menu: Word Menu";
                    break;
                case 2:
                    menu_text = "Menu: Alphabet Menu";
                    break;
                case 3:
                    menu_text = "Menu: Digit Menu";
                    break;
            }
            break;
        case 3:
            switch (menu){
                case 0:
                    menu_text = "Menu: Navigation Menu";
                    break;
                case 1:
                    menu_text = "Menu: Interaction Menu";
                    break;
                case 2:
                    menu_text = "Menu: Information Menu";
                    break;
                case 3:
                    menu_text = "Menu: Utility Menu";
                    break;
            }
            break;
    }
    let menu_element = document.querySelectorAll(".menu_"+className);
    menu_element.forEach(element=>{
        element.innerHTML = menu_text;
    })
    for(let i=1;i<=4;i++){
        document.getElementsByClassName("menu"+i)[0].style.backgroundColor = light1
        document.getElementsByClassName("menu"+i)[0].style.color = dark1
        document.getElementsByClassName("menu"+i)[0].style.border = "3px solid "+dark1
    }
    document.getElementsByClassName("menu"+(menu+1))[0].style.backgroundColor = dark1
    document.getElementsByClassName("menu"+(menu+1))[0].style.color = light1
    document.getElementsByClassName("menu"+(menu+1))[0].style.border = "3px solid "+light1
}


function show_help(){
    if(visibility){
        document.getElementById("help_box").style.display="none"
        document.getElementById("button_help").innerHTML="Show Help"
        visibility=0
    }else{
        document.getElementById("help_box").style.display="block"
        document.getElementById("button_help").innerHTML="Hide Help"
        visibility=1

    }
}