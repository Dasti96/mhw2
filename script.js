const vec_minus = [];
const vec_plus = [];
const vec_add_carts = [];
const vec_counters = [];
const vec_products = [];
const vec_descrs = [];

const cart_container = document.querySelector('#container_cart');
cart_container.parentElement.classList.add('hidden');


for(product of products){
    const sect = document.querySelector('#prod_container'); 
    const div_prod = document.createElement('div');
    sect.appendChild(div_prod);
    div_prod.classList.add('product');
    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = product.name;
    div_prod.appendChild(title);
    const img = document.createElement('img');  
    img.src = product.img; 
    div_prod.appendChild(img);
    const descr = document.createElement('p');
    descr.classList.add('descr');
    const minus = document.createElement('p');
    minus.classList.add('minus_plus');
    const plus = document.createElement('p');
    plus.classList.add('minus_plus');
    const counter = document.createElement('p'); 
    counter.classList.add('counter');
    const add_cart = document.createElement('p');
    add_cart.classList.add('add_cart');
    descr.textContent = product_menu.descr;
    minus.textContent = product_menu.minus;
    plus.textContent = product_menu.plus;
    counter.textContent = product_menu.counter;
    add_cart.textContent = product_menu.addToCart;
   

    div_prod.appendChild(descr);
    div_prod.appendChild(minus);
    div_prod.appendChild(counter);
    div_prod.appendChild(plus);
    div_prod.appendChild(add_cart);

    vec_counters.push(counter);
    vec_minus.push(minus);
    vec_plus.push(plus);
    vec_add_carts.push(add_cart);
    vec_products.push(div_prod);
    vec_descrs.push(descr);
}

function onClickPlus(event){
    const plus = event.currentTarget;
    const div  = plus.parentElement;
    const counter = div.querySelector('.counter');
    let numb = parseInt(counter.textContent) + 1;
    counter.textContent = numb;
}


function onClickMinus(event){
    const minus = event.currentTarget;
    const div  = minus.parentElement;
    const counter = div.querySelector('.counter');
    if(parseInt(counter.textContent) === 0)
        return
    let numb = parseInt(counter.textContent) - 1;
    counter.textContent = numb;
}


for(plus of vec_plus){
    plus.addEventListener('click',onClickPlus);
}


for(plus of vec_minus){
    plus.addEventListener('click',onClickMinus);
}

const search = document.querySelector('#search');
var var_prodSearched = [];

function onInsert(event){   

    for(prod of vec_products){        
        var value = search.value.toLowerCase();
        const title = prod.querySelector('.title').textContent.toLowerCase()
        if(title.includes(value))
            var_prodSearched.push(prod);       

    }
    
    if(search.value !== ''){
        for(prod of vec_products){
            prod.classList.remove('product');
            prod.classList.add('hidden');
        }

        for(prodSearched of var_prodSearched){  
            prodSearched.classList.add('product');
            prodSearched.classList.remove('hidden');
        }
    }    
    var_prodSearched = [];

    if(search.value === ''){
        for(prod of vec_products){
            prod.classList.remove('hidden');
            prod.classList.add('product');
        }
    }
}
search.addEventListener('keyup',onInsert);


function onClickDelete(event){
    const title = event.currentTarget.parentElement.querySelector('.title');     
    for(prod of vec_products){        
        if(prod.querySelector('.title').textContent === title.textContent){
            prod.querySelector('.add_cart').addEventListener('click',onClickAddCart);
            event.currentTarget.parentElement.remove();     
            
        }

    }

}



function onClickAddCart(event){
    const num_count = parseInt(event.currentTarget.parentElement.querySelector('.counter').textContent);
    if(num_count === 0)          
        return;         
    
    

    const prod_img = event.currentTarget.parentElement.querySelector('img');
    const prod_title = event.currentTarget.parentElement.querySelector('.title');
    const counter = parseInt(event.currentTarget.parentElement.querySelector('.counter').textContent);
    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = prod_title.textContent;
    const cart = document.querySelector('#cart');
    const cart_elem = document.createElement('div');
    cart_elem.classList.add('cart_element');
    const img = document.createElement('img');   
    img.src = prod_img.src;
    console.log (img);    
    cart_elem.appendChild(title);
    cart_elem.appendChild(img);
    const del = document.createElement('p');
    const quantity = document.createElement('p');
    quantity.classList.add('.quantity');
    quantity.textContent = "Quantita': " + counter;    
    del.textContent = 'X';
    del.classList.add('delete'); 
    
    cart_elem.appendChild(quantity);    
    cart_elem.appendChild(del);    
    cart.appendChild(cart_elem);  

    del.addEventListener('click',onClickDelete);
    event.currentTarget.removeEventListener('click',onClickAddCart);    
}

for(add_cart of vec_add_carts){
    add_cart.addEventListener('click',onClickAddCart);
}

function onCheckOutClick(){
    const elements = document.querySelectorAll('.cart_element');
    for(el of elements){
        el.remove();        
    }
    
    for(prod of vec_products){
        prod.querySelector('.add_cart').addEventListener('click',onClickAddCart);

    }

}

var show_cart = false;
function onClickShowCart(){
    if(!show_cart){
        cart_container.parentElement.classList.remove('hidden');    
        show_cart = true;
    }
    else{
        cart_container.parentElement.classList.add('hidden');
        show_cart = false;
    }

}


function onClickDescr(event){   
    const parent = event.currentTarget.parentElement;
    const title =  parent.querySelector('.title');
    const descr = parent.querySelector('.descr');
    console.log('here');
    for(prod of products){
        if(prod.name === title.textContent){
            descr.textContent = prod.descr; 
            descr.removeEventListener('click',onClickDescr);
            descr.classList.remove('descr');                 
        }
    }
}


const check_out = document.querySelector('#check_out');
check_out.addEventListener('click',onCheckOutClick);

const cart_button = document.querySelector('#cart_button');
cart_button.addEventListener('click',onClickShowCart);

for(descr of vec_descrs){
    descr.addEventListener('click',onClickDescr);

}










