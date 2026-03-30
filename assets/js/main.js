// Tailwind script
tailwind.config = { content: [] };

// Menu Data
// Menu Data with high-quality direct image URLs
const menuItems = [
    { 
        id:1, 
        name:"Chicken Biryani", 
        category:"Biryani", 
        price:320, 
        desc:"Tender chicken with fragrant basmati rice & Karachi spices.", 
        img:"https://unsplash.com/photos/food-photography-of-bowl-of-chicken-biryani-OterGMpkdsM/download?force=true" 
    },
    { 
        id:2, 
        name:"Special Chicken Biryani", 
        category:"Biryani", 
        price:420, 
        desc:"Signature recipe with egg and potato.", 
        img:"https://unsplash.com/photos/traditional-pakistani-chicken-biryani-closeup-NrD8fXIjB4I/download?force=true" 
    },
    { 
        id:3, 
        name:"Mutton Biryani", 
        category:"Biryani", 
        price:580, 
        desc:"Juicy mutton slow-cooked with whole spices.", 
        img:"https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    },
    { 
        id:4, 
        name:"Chicken Pulao", 
        category:"Pulao", 
        price:280, 
        desc:"Mild & aromatic chicken pulao.", 
        img:"https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"  // fallback, or search chicken rice on pexels
    },
    { 
        id:5, 
        name:"Full Chicken Daig", 
        category:"Daig", 
        price:4800, 
        desc:"Serves 8-10 people. Perfect for parties.", 
        img:"https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    },
    { 
        id:6, 
        name:"Mutton Daig (Half)", 
        category:"Daig", 
        price:6500, 
        desc:"Serves 12-15 people.", 
        img:"https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    },
    { 
        id:7, 
        name:"Zarda Sweet Rice", 
        category:"Dessert", 
        price:250, 
        desc:"Saffron rice with nuts & raisins.", 
        img:"https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"  // sweet saffron-style rice
    }
];

// Sample Locations (replace coordinates with real ones)
const locations = [
    { id:1, name:"Main Branch", address:"Main Bazaar Road, Muzaffarabad", lat:34.3595, lng:73.4710, phone:"0347-7041404" },
    { id:2, name:"City Center", address:"Jinnah Road, Near Clock Tower", lat:34.3558, lng:73.4655, phone:"0347-7041404" },
    { id:3, name:"Bus Terminal Outlet", address:"Abbottabad Road", lat:34.3682, lng:73.4820, phone:"0347-7041404" },
    { id:4, name:"Upper Muzaffarabad", address:"Garhi Dupatta Road", lat:34.3810, lng:73.4925, phone:"0347-7041404" },
    { id:5, name:"New Town Outlet", address:"Opposite Sports Stadium", lat:34.3450, lng:73.4520, phone:"0347-7041404" }
];

// Testimonials (New Feature)
const testimonials = [
    { name:"Ahmed Khan", text:"Best biryani I have ever had in AJK! Daig was perfect for our wedding.", img:"./assets/images/testimonial-1.jpg" },
    { name:"Saba Malik", text:"Zarda is heavenly. Whole family loved it.", img:"./assets/images/testimonial-2.jpg" },
    { name:"Bilal Hussain", text:"Fast service and authentic Karachi taste.", img:"./assets/images/testimonial-3.jpg" }
];

let map;

// Render Menu
function renderMenu(filtered) {
    const container = document.getElementById("menuGrid");
    container.innerHTML = filtered.map(item => `
        <div onclick="showMenuModal(${item.id})" class="menu-card cursor-pointer bg-white border border-gray-100 rounded-3xl overflow-hidden">
            <img src="${item.img}" alt="${item.name}" class="w-full h-48 object-cover">
            <div class="p-5">
                <span class="text-xs uppercase text-orange-500">${item.category}</span>
                <h3 class="font-semibold text-xl">${item.name}</h3>
                <p class="text-gray-600 text-sm line-clamp-2 mt-2">${item.desc}</p>
                <div class="mt-4 flex justify-between items-end">
                    <span class="text-orange-500 font-bold text-xl">Rs. ${item.price}</span>
                    <span class="text-xs bg-orange-50 text-orange-600 px-4 py-1 rounded-3xl">Tap for details</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Show Modal
function showMenuModal(id) {
    const item = menuItems.find(i => i.id === id);
    document.getElementById("modalContent").innerHTML = `
        <img src="${item.img}" class="w-full h-72 object-cover">
        <div class="p-8">
            <span class="uppercase text-xs text-orange-500">${item.category}</span>
            <h2 class="text-4xl font-bold">${item.name}</h2>
            <div class="text-5xl font-bold text-orange-500 my-4">Rs. ${item.price}</div>
            <p>${item.desc}</p>
            <div class="mt-8 flex gap-3">
                <button onclick="closeModal()" class="flex-1 py-4 border rounded-3xl">Close</button>
                <a href="https://wa.me/03477041404?text=Hi%20I%20want%20to%20order%20${encodeURIComponent(item.name)}" target="_blank" class="flex-1 py-4 bg-orange-500 text-white rounded-3xl flex items-center justify-center font-semibold">Order on WhatsApp</a>
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

// Locations
function renderLocations() {
    const container = document.getElementById("locationList");
    container.innerHTML = locations.map(loc => `
        <div onclick="focusMap(${loc.lat}, ${loc.lng})" class="bg-white/10 hover:bg-white/20 p-5 rounded-3xl cursor-pointer">
            <h4 class="font-semibold">${loc.name}</h4>
            <p class="text-sm text-gray-300">${loc.address}</p>
            <p class="text-orange-400 text-sm mt-2">📞 ${loc.phone}</p>
        </div>
    `).join('');
}

// Map
function initMap() {
    map = L.map('map').setView([34.3595, 73.4710], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    locations.forEach(loc => {
        L.marker([loc.lat, loc.lng]).addTo(map)
            .bindPopup(`<strong>${loc.name}</strong><br>${loc.address}<br>📞 ${loc.phone}`);
    });
}

function focusMap(lat, lng) {
    map.flyTo([lat, lng], 16);
}

// Testimonials
function renderTestimonials() {
    const container = document.querySelector("#testimonials .grid");
    container.innerHTML = testimonials.map(t => `
        <div class="bg-white rounded-3xl p-6 shadow">
            <img src="${t.img}" class="w-12 h-12 rounded-2xl mb-4">
            <p class="italic">"${t.text}"</p>
            <p class="mt-6 font-semibold">${t.name}</p>
        </div>
    `).join('');
}

// Mobile Menu
function toggleMobileMenu() {
    document.getElementById("mobileMenu").classList.toggle("hidden");
}

// Initialize
window.onload = function() {
    renderMenu(menuItems);
    renderLocations();
    initMap();
    renderTestimonials();
    console.log("%c✅ Karachi Naseeb Biryani website loaded successfully!", "color:#e67e22; font-size:14px");
};