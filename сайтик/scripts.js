let map;
let currentIndex = [0, 0, 0];

function initMap() {
    const defaultLocation = { lat: 59.934286, lng: 30.315868 }; 
    map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 12
    });

    
    addMarker({ lat: 59.934286, lng: 30.315868 }, 'Апартаменты 1');
    addMarker({ lat: 59.937825, lng: 30.323165 }, 'Апартаменты 2');
    addMarker({ lat: 59.940000, lng: 30.330000 }, 'Апартаменты 3');
}

function addMarker(location, title) {
    new google.maps.Marker({
        position: location,
        map: map,
        title: title
    });
}

function searchHotels() {
    const locationInput = document.getElementById('location-input').value;
    console.log('Поиск отелей в:', locationInput);
    updateMapLocation(locationInput);
    
}

function updateMapLocation(location) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': location }, (results, status) => {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            const marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function applyFilter(filter) {
    console.log('Применен фильтр:', filter);
    
}

function applyPriceFilter() {
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;
    console.log('Применен фильтр по цене: от', minPrice, 'до', maxPrice);
    
}

function resetFilters() {
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);

    
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';

    console.log('Сброшены все фильтры');
    
}

function openModal(hotelName) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    modalTitle.innerText = `Детали апартаментов: ${hotelName}`;
    modalDescription.innerText = `Описание апартаментов ${hotelName} и дополнительная информация.`;

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function openBookingModal(hotelName) {
    const bookingModal = document.getElementById('bookingModal');
    const modalTitle = document.getElementById('modal-title');

    modalTitle.innerText = `Бронирование апартаментов: ${hotelName}`;
    bookingModal.style.display = 'block';
}

function closeBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    bookingModal.style.display = 'none';
}

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Апартаменты успешно забронированы!');
    closeBookingModal();
});

function nextSlide(carouselIndex) {
    const carousel = document.querySelectorAll('.carousel')[carouselIndex];
    const items = carousel.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    items[currentIndex[carouselIndex]].classList.remove('active');
    currentIndex[carouselIndex] = (currentIndex[carouselIndex] + 1) % totalItems;
    items[currentIndex[carouselIndex]].classList.add('active');
}

function prevSlide(carouselIndex) {
    const carousel = document.querySelectorAll('.carousel')[carouselIndex];
    const items = carousel.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    items[currentIndex[carouselIndex]].classList.remove('active');
    currentIndex[carouselIndex] = (currentIndex[carouselIndex] - 1 + totalItems) % totalItems;
    items[currentIndex[carouselIndex]].classList.add('active');
}










