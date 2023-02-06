const buttons = document.querySelectorAll('.button');
let string = ""
let input = document.querySelector('input')

Array.from(buttons).map((button) =>{
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML === '='){
            result = eval(string)
            input.value = result
            string = ''
        }

        else if (e.target.innerHTML === 'C'){
            input.value = ''
            string = ''
        }

        else if (e.target.innerHTML === 'BS'){
            string = string.slice(0, string.length-1)
            input.value = string
        }

        else{
            
            string += e.target.innerHTML
            input.value = string
        }
    })
})

