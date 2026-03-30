// Tailwind
tailwind.config = { content: [] };

// Menu with reliable high-quality images
const menuItems = [
    { 
        id:1, 
        name:"Chicken Biryani", 
        category:"Biryani", 
        price:320, 
        desc:"Tender chicken pieces cooked with fragrant basmati rice and our secret Karachi spices. Best seller!", 
        img:"https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    },
    { 
        id:2, 
        name:"Special Chicken Biryani", 
        category:"Biryani", 
        price:420, 
        desc:"Signature recipe with boiled egg, potato and extra spices.", 
        img:"https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    },
    { 
        id:3, 
        name:"Mutton Biryani", 
        category:"Biryani", 
        price:580, 
        desc:"Juicy mutton slow-cooked with aromatic rice and whole spices.", 
        img:"https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    },
    { 
        id:4, 
        name:"Chicken Pulao", 
        category:"Pulao", 
        price:280, 
        desc:"Mild, flavorful and aromatic chicken pulao.", 
        img:"https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    },
    { 
        id:5, 
        name:"Full Chicken Daig", 
        category:"Daig", 
        price:4800, 
        desc:"Serves 8-10 people. Perfect for parties, weddings & events.", 
        img:"https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    },
    { 
        id:6, 
        name:"Mutton Daig (Half)", 
        category:"Daig", 
        price:6500, 
        desc:"Serves 12-15 people. Premium mutton daig.", 
        img:"https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    },
    { 
        id:7, 
        name:"Zarda Sweet Rice", 
        category:"Dessert", 
        price:250, 
        desc:"Saffron flavored sweet rice with almonds, raisins and coconut.", 
        img:"https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    }
];

const locations = [
    { id:1, name:"Main Branch", address:"Main Bazaar Road, Muzaffarabad", lat:34.3595, lng:73.4710, phone:"0347-7041404" },
    { id:2, name:"City Center", address:"Jinnah Road, Near Clock Tower", lat:34.3558, lng:73.4655, phone:"0347-7041404" },
    { id:3, name:"Bus Terminal Outlet", address:"Abbottabad Road", lat:34.3682, lng:73.4820, phone:"0347-7041404" },
    { id:4, name:"Upper Muzaffarabad", address:"Garhi Dupatta Road", lat:34.3810, lng:73.4925, phone:"0347-7041404" },
    { id:5, name:"New Town", address:"Opposite Sports Stadium", lat:34.3450, lng:73.4520, phone:"0347-7041404" }
];

let map;

function renderMenu(filtered) {
    const container = document.getElementById("menuGrid");
    container.innerHTML = filtered.map(item => `
        <div onclick="showMenuModal(${item.id})" class="menu-card cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100">
            <img src="${item.img}" alt="${item.name}" class="w-full h-56 object-cover">
            <div class="p-6">
                <span class="inline-block px-4 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-3xl">${item.category}</span>
                <h3 class="font-bold text-2xl mt-3">${item.name}</h3>
                <p class="text-gray-600 mt-3 line-clamp-3">${item.desc}</p>
                <div class="mt-6 flex justify-between items-end">
                    <span class="text-3xl font-bold text-orange-600">Rs. ${item.price}</span>
                    <span class="text-sm px-5 py-2 bg-orange-50 rounded-3xl">Tap for details</span>
                </div>
            </div>
        </div>
    `).join('');
}

function showMenuModal(id) {
    const item = menuItems.find(i => i.id === id);
    document.getElementById("modalContent").innerHTML = `
        <img src="${item.img}" class="w-full h-72 object-cover">
        <div class="p-8">
            <span class="text-xs uppercase tracking-widest text-orange-600">${item.category}</span>
            <h2 class="text-4xl font-bold mt-2">${item.name}</h2>
            <p class="text-4xl font-bold text-orange-600 mt-4">Rs. ${item.price}</p>
            <p class="mt-6 text-gray-700">${item.desc}</p>
            <div class="mt-10 flex gap-4">
                <button onclick="closeModal()" class="flex-1 py-5 border-2 rounded-3xl font-medium">Close</button>
                <a href="https://wa.me/03477041404?text=I want to order ${encodeURIComponent(item.name)}" target="_blank" 
                   class="flex-1 py-5 bg-orange-600 text-white rounded-3xl font-bold flex items-center justify-center">Order on WhatsApp</a>
            </div>
        </div>
    `;
    document.getElementById("menuModal").classList.remove("hidden");
    document.getElementById("menuModal").classList.add("flex");
}

function closeModal() {
    const modal = document.getElementById("menuModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

function renderLocations() {
    const container = document.getElementById("locationList");
    container.innerHTML = locations.map(loc => `
        <div onclick="focusMap(${loc.lat}, ${loc.lng})" class="bg-white/10 hover:bg-white/20 p-6 rounded-3xl cursor-pointer transition">
            <h4 class="font-semibold text-xl">${loc.name}</h4>
            <p class="text-gray-300 mt-1">${loc.address}</p>
            <p class="text-orange-400 mt-4">📞 ${loc.phone}</p>
        </div>
    `).join('');
}

function initMap() {
    const mapElement = document.getElementById("map");
    map = L.map(mapElement, { zoomControl: true }).setView([34.3595, 73.4710], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: ''
    }).addTo(map);

    locations.forEach(loc => {
        L.marker([loc.lat, loc.lng]).addTo(map)
            .bindPopup(`<b>${loc.name}</b><br>${loc.address}<br>📞 ${loc.phone}`);
    });
}

function focusMap(lat, lng) {
    if (map) map.flyTo([lat, lng], 16, { duration: 1.8 });
}

function toggleMobileMenu() {
    // You can add mobile menu later if needed
    alert("Mobile menu coming soon! For now use WhatsApp for orders 😊");
}

// Initialize everything
window.onload = function() {
    renderMenu(menuItems);
    renderLocations();
    initMap();
    console.log("%c✅ Karachi Naseeb Biryani Demo Ready! Impress your client 🔥", "color:#e67e22; font-size:15px; font-weight:bold");
};