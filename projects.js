// Project data
const projectData = {
    'fedai-iha': {
        title: 'Fedai İHA Görev Sistemi',
        subtitle: 'Gelişmiş İHA görev sistemi',
        description: 'JetWing kesif IHA\'si hedef tespiti yapar, Buzzard saldiri IHA\'si muhimmat birakir. Sistem, otonom ucus, hedef tespiti ve gorev koordinasyonu icin gelistirilmistir.',
        icon: 'fas fa-plane',
        specs: [
            { label: 'Uçuş Süresi', value: '45 dakika' },
            { label: 'Maksimum Hız', value: '120 km/s' },
            { label: 'Menzil', value: '15 km' },
            { label: 'Yük Kapasitesi', value: '2 kg' },
            { label: 'Hedef Tespit Mesafesi', value: '3 km' },
            { label: 'GPS Hassasiyeti', value: '±1m' }
        ],
        gallery: [
            'images/fedai-takim-lab.jpeg?v=20250809',
            'images/fedai-iha-montaj-calismasi.png?v=20250808',
            'images/fedai-iha-model-sergisi.png?v=20250808'
        ]
    },
    'kamuflaj-tespit': {
        title: 'Kamuflajlı Hedef Tespiti',
        subtitle: 'Gelişmiş görüntü işleme sistemi',
        description: 'YOLOv10 ve DenseNet ile kamuflajli askeri arac tespiti yapan gelismis goruntu isleme sistemi. Sistem, farkli hava kosullarinda ve cesitli kamuflaj turlerinde %95 dogruluk oranina sahiptir.',
        icon: 'fas fa-eye',
        specs: [
            { label: 'Tespit Doğruluğu', value: '%95' },
            { label: 'İşleme Hızı', value: '30 FPS' },
            { label: 'Maksimum Mesafe', value: '5 km' },
            { label: 'Kamuflaj Türü', value: 'Tüm türler' },
            { label: 'Hava Koşulları', value: 'Tüm koşullar' },
            { label: 'Model Boyutu', value: '15 MB' }
        ],
        gallery: [
            'images/fedai-iha-model-sergisi.png?v=20250808',
            'images/fedai-takim-lab.jpeg?v=20250809',
            'images/fedai-iha-montaj-calismasi.png?v=20250808'
        ]
    },
    'otonom-ucus': {
        title: 'Otonom Uçuş Sistemi',
        subtitle: 'GPS ve sensör füzyonu tabanlı',
        description: 'GPS ve sensor fuzyonu ile tam otonom ucus gerceklestiren gelismis kontrol sistemi. Sistem, ruzgar kosullarina adaptif olarak calisir ve guvenli inis noktalari belirler.',
        icon: 'fas fa-satellite',
        specs: [
            { label: 'GPS Hassasiyeti', value: '±0.5m' },
            { label: 'Rüzgar Toleransı', value: '25 m/s' },
            { label: 'Otonom Uçuş Süresi', value: 'Sınırsız' },
            { label: 'Güvenlik Sistemi', value: 'Fail-safe' },
            { label: 'Sensör Sayısı', value: '8 adet' },
            { label: 'Kontrol Frekansı', value: '100 Hz' }
        ],
        gallery: [
            'images/fedai-iha-montaj-calismasi.png?v=20250808',
            'images/fedai-takim-lab.jpeg?v=20250809',
            'images/fedai-iha-model-sergisi.png?v=20250808'
        ]
    },
    'haberlesme': {
        title: 'Gelişmiş Haberleşme Sistemi',
        subtitle: 'Uzun mesafe kriptolu haberleşme',
        description: 'Uzun mesafe, dusuk gecikme sureli kriptolu haberlesme sistemi. Mesh network yapisi ile coklu IHA koordinasyonu saglar.',
        icon: 'fas fa-wifi',
        specs: [
            { label: 'Maksimum Mesafe', value: '20 km' },
            { label: 'Gecikme Süresi', value: '<50ms' },
            { label: 'Şifreleme', value: 'AES-256' },
            { label: 'Frekans Bandı', value: '2.4 GHz' },
            { label: 'Veri Hızı', value: '10 Mbps' },
            { label: 'Mesh Node Sayısı', value: '8 adet' }
        ],
        gallery: [
            'images/fedai-iha-model-sergisi.png?v=20250808',
            'images/fedai-takim-lab.jpeg?v=20250809',
            'images/fedai-iha-montaj-calismasi.png?v=20250808'
        ]
    },
    'gimbal': {
        title: 'Gimbal Stabilizasyon Sistemi',
        subtitle: '3 eksenli profesyonel stabilizasyon',
        description: '3 eksenli gimbal ile profesyonel kalitede goruntu stabilizasyonu. Brushless motorlar ve gelismis PID kontrol algoritmasi ile mukemmel stabilizasyon saglar.',
        icon: 'fas fa-camera',
        specs: [
            { label: 'Stabilizasyon Ekseni', value: '3 eksen' },
            { label: 'Açısal Hız', value: '400°/s' },
            { label: 'Yük Kapasitesi', value: '1.5 kg' },
            { label: 'Güç Tüketimi', value: '15W' },
            { label: 'Kontrol Frekansı', value: '500 Hz' },
            { label: 'Ağırlık', value: '800g' }
        ],
        gallery: [
            'images/fedai-iha-montaj-calismasi.png?v=20250808',
            'images/fedai-takim-lab.jpeg?v=20250809',
            'images/fedai-iha-model-sergisi.png?v=20250808'
        ]
    },
    'batarya': {
        title: 'Akıllı Batarya Yönetimi',
        subtitle: 'LiPo batarya optimizasyon sistemi',
        description: 'LiPo batarya icin gelismis BMS sistemi ve ucus suresi optimizasyonu. Hucre dengesi, sicaklik kontrolu ve akilli sarj yonetimi ile maksimum performans saglar.',
        icon: 'fas fa-battery-full',
        specs: [
            { label: 'Kapasite', value: '6000 mAh' },
            { label: 'Voltaj', value: '22.2V (6S)' },
            { label: 'Maksimum Akım', value: '120A' },
            { label: 'Şarj Süresi', value: '45 dakika' },
            { label: 'Hücre Sayısı', value: '6 adet' },
            { label: 'Ağırlık', value: '850g' }
        ],
        gallery: [
            'images/fedai-okul-etkinligi-1.jpeg',
            'images/fedai-takim-lab.jpeg?v=20250809',
            'images/fedai-iha-model-sergisi.png?v=20250808'
        ]
    }
};

// Modal elements
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalDescription = document.getElementById('modalDescription');
const modalSpecs = document.getElementById('modalSpecs');
const modalGallery = document.getElementById('modalGallery');
const closeModal = document.querySelector('.close-modal');

// Project card click handlers
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            showProjectModal(project);
        }
    });
});

// Show project modal
function showProjectModal(project) {
    // Update modal content
    modalTitle.textContent = project.title;
    modalSubtitle.textContent = project.subtitle;
    modalDescription.textContent = project.description;
    
    // Update project icon
    const projectIcon = document.querySelector('.project-icon i');
    projectIcon.className = project.icon;
    
    // Update specs
    modalSpecs.innerHTML = '';
    project.specs.forEach(spec => {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
            <div class="spec-label">${spec.label}</div>
            <div class="spec-value">${spec.value}</div>
        `;
        modalSpecs.appendChild(specItem);
    });
    
    // Update gallery
    modalGallery.innerHTML = '';
    project.gallery.forEach(imageUrl => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${imageUrl}" alt="${project.title}" loading="lazy">
        `;
        modalGallery.appendChild(galleryItem);
    });
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
