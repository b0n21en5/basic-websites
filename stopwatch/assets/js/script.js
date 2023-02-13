let startBtn = document.getElementById('btn-start')
let stopBtn = document.getElementById('btn-stop');
let resetBtn = document.getElementById('btn-reset');
let hr = document.getElementById('hr');
let min = document.getElementById('min');
let sec = document.getElementById('sec');
let centi = document.getElementById('centi');



let count = 0, ss = 0; mm = 0; hh=0;




startBtn.addEventListener('click', function(){
    timer = true;
    stopwatch();
})


stopBtn.addEventListener('click', function(){
    timer = false
})


resetBtn.addEventListener('click', function(){
    timer = false
    count = ss = mm = hh = 0;
    hr.textContent = '00'
    min.textContent = '00'
    sec.textContent = '00'
    centi.textContent = '00'

})




function stopwatch() {
    if (timer){
        count++

        if (count==100){
            ss++
            count = 0
        }

        if (ss==60){
            mm++
            ss = 0
        }

        if (mm==60){
            hh++
            mm = 0
            ss = 0
        }
            
        centi.textContent = (count<10? '0':'') + count
        sec.textContent = (ss<10? '0':'') + ss ;
        min.textContent = (mm<10? '0':'') + mm;
        hr.textContent = (hh<10? '0':'') + hh;
        
        
        setTimeout(stopwatch,7);
    }     
    
    
}