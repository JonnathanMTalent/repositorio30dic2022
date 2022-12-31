//cl
let arrAux = []
let arrAux2 = [];
[...document.querySelectorAll('table[class="hyperTable"] > tbody > tr')].map(x=>{
    if(x.querySelector('[class="badge-error"]')){        
        x.style = 'background-color: orange;'
        let objAux = {
            Company: x.querySelector('td:nth-child(3)').textContent.trim(),
            URL: x.querySelector('td:nth-child(3) a').href,            
            lastEdited : x.querySelector('td:nth-child(13)').textContent.trim()
        };        
        let actual = new Date(Date.now())    
        let spider = new Date(x.querySelector('td:nth-child(13)').textContent.trim())    
        let result = actual - spider
        if(result>1209600000){ //han pasado más de 14 días.
            arrAux.push(objAux);
        }else{
            console.log(`Company: ${objAux.Company} out of range. Link: ${objAux.URL}`)
        }
    }
    if(x.querySelector('[class="badge-warning"]')){
        x.style = 'background-color: yellow;'
        let objAux2 = {
            Company: x.querySelector('td:nth-child(3)').textContent.trim(),
            URL: x.querySelector('td:nth-child(3) a').href,            
            lastEdited : x.querySelector('td:nth-child(13)').textContent.trim()
        };
        let actual = new Date(Date.now())    
        let spider = new Date(x.querySelector('td:nth-child(13)').textContent.trim())    
        let result = actual - spider
        if(result>1209600000){ //han pasado más de 14 días.
            arrAux2.push(objAux2);
        }else{
            console.log(`Company: ${objAux2.Company} out of range. Link: ${objAux2.URL}`)
        }
    }
});
console.log(`Red`)
console.table(arrAux);
console.log(`Yellow`)
console.table(arrAux2);