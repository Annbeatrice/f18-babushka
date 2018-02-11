        let retter;
        async function loadJson(){
            //hent jsonfil
        let minListe = await fetch("menu.json");
            //
            retter = await minListe.json();
        // console.log(retter);
            
        //find og filtrer retter efter kategori og gem dem i nyt array       
    let forretter = retter.filter(ret => ret.kategori == "forretter");
    let hovedretter = retter.filter(ret => ret.kategori == "hovedretter");
    let desserter = retter.filter(ret => ret.kategori == "desserter");
    let drikkevarer = retter.filter(ret => ret.kategori == "drikkevarer");
    
    document.querySelector("#filter-alle").addEventListener("click",() => { 
        visMenu(retter,"Menu");
        });
        
    document.querySelector("#filter-forretter").addEventListener("click",() => { 
        visMenu(forretter,"Forretter");
        });
    document.querySelector("#filter-hovedretter").addEventListener("click",() => { 
        visMenu(hovedretter, "Hovedretter");
        });        
    document.querySelector("#filter-desserter").addEventListener("click",() => { 
        visMenu(desserter, "Desserter");
        });
    document.querySelector("#filter-drikkevarer").addEventListener("click",() => { 
        visMenu(drikkevarer,"Drikkevarer");
        }); 
            
    visMenu(retter, "Menu");
            
        }
        
    function visMenu(retter, overskrift) {
        document.querySelector("[data-overskrift]").textContent = overskrift;
        //console.log(template);
        let modtager = document.querySelector("[data-templatemodtager]");
        let template = document.querySelector("[data-mytemplate]");
        modtager.innerHTML="";
        //for hver ret vis dem i DOM
        retter.forEach( hverRet =>{
            let klon = template.cloneNode(true).content;
            console.log(klon);
            klon.querySelector("[data-navn]").textContent = hverRet.navn;
            klon.querySelector("[data-billede]").src = "imgs/small/"+hverRet.billede+"-sm.jpg";
            klon.querySelector("[data-beskrivelse]").textContent = hverRet.kortbeskrivelse;
            klon.querySelector("[data-pris]").textContent = hverRet.pris;
            klon.querySelector("[data-ret]").setAttribute("data-id", hverRet.id);
            klon.querySelector("[data-ret]").addEventListener("click", showSingle);
            
            modtager.appendChild(klon);
        })
        
        }


    function showSingle(){
        console.log("test");
        let myId = this.getAttribute("data-id");
        console.log(myId);
        let single = retter.find( ret =>{
            //hvis myId og ret id matcher skal indhold vises
            if(myId == ret.id){
                document.querySelector(".popup").style.visibility = "visible";
                document.querySelector("[data-titel]").textContent = ret.navn;
                document.querySelector("[data-langbeskrivelse]").textContent = ret.langbeskrivelse;
                document.querySelector("[data-billede]").src = "imgs/medium/"+ret.billede+"-md.jpg";
                
            }
            
        }
                                )
        
    }
// Knapp och popup i variabler
button = document.querySelector("[data-button]");
popup = document.querySelector("[data-popup]");

// Click eventlistner til hide
button.addEventListener("click", hideSingle);
popup.addEventListener("click", hideSingle);


function hideSingle(klick){
    console.log(klick)
    // Endast om det button eller popup der bliver klickat på skal denna function ske. 
    if( button === klick.target || popup === klick.target ){
        //hvis man klikker på denne skal popup forsvinne
        document.querySelector(".popup").style.visibility = "hidden";
        console.log("hidden");
        
    }
}

document.addEventListener("DOMContentLoaded", loadJson);