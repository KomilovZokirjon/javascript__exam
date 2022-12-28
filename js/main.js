let elList = document.querySelector(".list")
let elForm = document.querySelector('.formaa')
let elBtn = document.querySelector('#btn')
let elTemplate = document.querySelector("#template").content
let elModal = document.querySelector(".modal-div")
let elInputTitle = document.querySelector(".product__title")
let elInpuNumber = document.querySelector(".product__rating")
let elSelect = document.querySelector(".select__categories")
let elSelectLowHigh = document.querySelector(".select__high__low")
let elNUm = document.querySelector(".span__num")
let elTitle = document.querySelector(".title")



function renderClothes(params) {
        let elFragment = document.createDocumentFragment()

        elList.innerHTML = null

        params.forEach(item => {
            let elClone = elTemplate.cloneNode(true)
            elClone.querySelector('.image').src = item.image
            elClone.querySelector('.title').textContent = item.title
            elClone.querySelector('.text1').textContent = item.rating.rate
            elClone.querySelector('.text2').textContent = item.price
            elClone.querySelector('.text3').textContent = item.category
            elClone.querySelector('.btn-modal').dataset.clothModal = item.id

            elFragment.appendChild(elClone)
            elNUm.textContent = item.rating.count
        });

        elList.appendChild(elFragment)
        if (params.length === 0) {
            elTitle.textContent = "Product is not defined"
            elTitle.classList.add("text-danger")
            
        } 
}




;(async function(){
    let responce = await fetch(`https://fakestoreapi.com/products`)
    data = await responce.json()
    elList.addEventListener("click",  evt => {
        let elModalEvt = evt.target.dataset.clothModal

        if (elModalEvt) {
            let elModalNmadur = data.find(item => item.id == elModalEvt ) 
            elModal.querySelector(".modal-text").textContent = elModalNmadur.description
            elModal.querySelector(".modal-title").textContent = elModalNmadur.title
        }
    })
    
})();

;(async function(){
    let responce = await fetch(`https://fakestoreapi.com/products`)
    data = await responce.json()
    
    let searchClothes = function (Title, Rating, Categories) {
    
        return data.filter(item => {
            let findCategories = Categories === 'All' || item.category.includes(Categories)
    
            return item.title.match(Title) && item.rating.rate >= Rating && findCategories
        })
    }

    elForm.addEventListener('input', function(evt){
        evt.preventDefault() 
    
        let selectValue = elSelect.value
        let searchValue = elInputTitle.value.trim()
        let ratingValue = elInpuNumber.value.trim()
        let highlowValue = elSelectLowHigh.value
        
        let pattern = new RegExp(searchValue, 'gi')
        let result = searchClothes(pattern, ratingValue, selectValue)

        if (highlowValue === 'high') {
            result.sort((b, a) => a.price - b.price)
        }
        if (highlowValue === 'low') {
            result.sort((a, b) => a.price - b.price)
        }
        renderClothes(result)
    })
})().catch(() =>{
    if (ratingValue === 0 && searchValue === 0) {
        elList.innerHTML = '<h3>Input is empty enter product!</h3>'
    }else{
        elList.innerHTML = '<h3>Products is not found</h3>'
    }
})


//Render category
function renderCategories(item) {
    
    let categoryArray = []

    item.forEach(some =>{
        let normalizedGanres = some.category.split('|')

        normalizedGanres.forEach(cat =>{
            if (!categoryArray.includes(cat)) {
                categoryArray.push(cat)
            }
        })
    })
    categoryArray.sort()

    let elFragmentOption = document.createDocumentFragment()
    categoryArray.forEach(genres =>{

        let elOption = document.createElement('option')
        elOption.value = genres
        elOption.textContent = genres
        elFragmentOption.appendChild(elOption)
    })
    elSelect.appendChild(elFragmentOption)
}
;(async function(){
    let responce = await fetch(`https://fakestoreapi.com/products`)
    data = await responce.json()
    renderClothes(data)
    renderCategories(data)
})()


// Dark Mode
let elBox = document.querySelector(".check")
let elLabel = document.querySelector(".label")
let elBody = document.querySelector("body")
let elNma  = document.querySelector(".nmadr__text")
let elLogo = document.querySelector(".logo")
let elIntro = document.querySelector(".intro__container")
let elText = document.querySelector(".nmadrr")


elBox.addEventListener('change', function (evt) {
    if (evt.target.checked === false) {
        elBody.classList.add("light")
        elBody.classList.remove("dark")
        elLogo.src = "img/logo.svg"
        elNma.classList.add("nmadr__text")
        elNma.classList.remove("nmadr__text2")
        elText.classList.add("nmadrr2")
        elText.classList.remove("nmadrr")
        elLabel.textContent = "Dark"
        elLabel.classList.add("dark2")
        elLabel.classList.remove("white")
       

    } else{
        elBody.classList.add("dark")
        elBody.classList.remove("light")
        elLogo.src = "img/logo__drk.svg"
        elNma.classList.add("nmadr__text2")
        elNma.classList.remove("nmadr__text")
        elText.classList.add("nmadrr")
        elText.classList.remove("nmadrr2")
        elLabel.textContent = "Light"
        elLabel.classList.add("white")
        elLabel.classList.remove("dark2")

    }
})
