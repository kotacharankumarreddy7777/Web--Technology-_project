// Products Data
const products=[
{name:'Luxury Notebook', price:25, category:'notebook', icon:'<svg viewBox="0 0 24 24" fill="#34A853"><path d="M4 2h16v20H4V2z"/></svg>'},
{name:'Fountain Pen', price:15, category:'pen', icon:'<svg viewBox="0 0 24 24" fill="#F09120"><path d="M2 21l1-4 14-14 4 4-14 14-4 1z"/></svg>'},
{name:'Sketchbook', price:20, category:'notebook', icon:'<svg viewBox="0 0 24 24" fill="#F8D706"><path d="M3 3h18v18H3V3z"/></svg>'},
{name:'Markers Set', price:30, category:'art', icon:'<svg viewBox="0 0 24 24" fill="#1F74BA"><path d="M2 22l2-4 14-14 4 4-14 14-4 2z"/></svg>'},
{name:'Planner', price:40, category:'notebook', icon:'<svg viewBox="0 0 24 24" fill="#34A853"><path d="M5 3h14v18H5V3z"/></svg>'},
{name:'Sticky Notes', price:8, category:'notebook', icon:'<svg viewBox="0 0 24 24" fill="#F09120"><path d="M4 4h16v16H4V4z"/></svg>'},
{name:'Highlighters', price:12, category:'art', icon:'<svg viewBox="0 0 24 24" fill="#F8D706"><path d="M2 20l4-4 14-14 2 2-14 14-4 4z"/></svg>'},
{name:'Pens Set', price:18, category:'pen', icon:'<svg viewBox="0 0 24 24" fill="#1F74BA"><path d="M2 21l2-4 14-14 4 4-14 14-4 1z"/></svg>'},
{name:'Paint Brush', price:22, category:'art', icon:'<svg viewBox="0 0 24 24" fill="#34A853"><path d="M3 3l18 18"/></svg>'},
{name:'Gel Pen', price:10, category:'pen', icon:'<svg viewBox="0 0 24 24" fill="#F8D706"><path d="M4 20l16-16"/></svg>'},
{name:'Watercolor Set', price:35, category:'art', icon:'<svg viewBox="0 0 24 24" fill="#F09120"><path d="M2 2h20v20H2V2z"/></svg>'}
];

// Render Products (safe guards: only run if elements exist in the page)
const productGrid=document.getElementById('product-grid');
const cart=[];
const cartCount=document.getElementById('cart-count');
const cartDropdown=document.querySelector('.cart-dropdown');
const modal=document.getElementById('product-modal');
const modalContent=document.getElementById('modal-content');

function updateCart(){
    // only update cart UI if the elements exist
    if(!cartCount || !cartDropdown) return;
    cartCount.textContent=cart.length;
    cartDropdown.innerHTML='';
    if(cart.length===0){
        cartDropdown.innerHTML='<p>Cart is empty</p>';
        return;
    }
    cart.forEach((item,index)=>{
        const div=document.createElement('div');
        div.innerHTML=`${item.name} - $${item.price} <button data-index="${index}">Remove</button>`;
        cartDropdown.appendChild(div);
    });
    cartDropdown.querySelectorAll('button').forEach(btn=>{
        btn.addEventListener('click',(e)=>{
            const idx=e.target.getAttribute('data-index');
            cart.splice(idx,1); updateCart();
        });
    });
}

// Render products in grid
function renderProducts(grid, filter=null){
    if(!grid) return; // nothing to render into
    grid.innerHTML='';
    products.forEach(p=>{
        if(filter && p.category!==filter) return;
        const card=document.createElement('div'); card.className='product-card';
        card.innerHTML=`<div class="product-img">${p.icon}</div>
        <div class="product-info"><h3>${p.name}</h3><p class="price">$${p.price}</p>
        <button class="add-to-cart">Add to Cart</button></div>`;
        grid.appendChild(card);
        // attach add-to-cart only if cart UI exists
        const addBtn = card.querySelector('.add-to-cart');
        if(addBtn){
            addBtn.addEventListener('click', e=>{e.stopPropagation(); cart.push(p); updateCart();});
        }
        // modal behavior only if modal exists
        if(modal && modalContent){
            card.addEventListener('click',()=>{
                modal.style.display='flex';
                modalContent.innerHTML=`<h2>${p.name}</h2><p>Price: $${p.price}</p><p>Category: ${p.category}</p><p>Description for ${p.name}. Premium quality product for your daily use.</p><button id="closeModal">Close</button>`;
                document.getElementById('closeModal').onclick=()=>{modal.style.display='none';};
            });
        }
    });
}

// render only if product grid exists (category buttons handled in HTML)
renderProducts(productGrid);

// Cart toggle
if(document.querySelector('.cart-icon') && cartDropdown){
    document.querySelector('.cart-icon').addEventListener('click',()=>{cartDropdown.style.display=cartDropdown.style.display==='block'?'none':'block';});
}
if(modal){
    modal.addEventListener('click', e=>{if(e.target===modal) modal.style.display='none';});
}
// Initial cart update (only updates if cart UI exists)
updateCart();