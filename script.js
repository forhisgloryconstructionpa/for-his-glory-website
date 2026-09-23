const photoFiles = [
  '01_0423180921b.jpg',  '02_0423181723.jpg',  '03_0423181723a.jpg',  '04_0423181726a.jpg',  '05_0424181707a.jpg',  '06_0424181707c.jpg',  '07_0424181708.jpg',  '08_1107170931.jpg',  '09_1107170931b.jpg',  '10_1107171315.jpg',  '11_1107171315a.jpg',  '12_1108170852.jpg',  '13_1108171003.jpg',  '14_ChatGPT_Image_Sep_23,_2026,_05_23_13_PM.jpg',  '15_FB_IMG_1789936081758.jpg',  '16_FB_IMG_1789936088720.jpg',  '17_FB_IMG_1789936095117.jpg',  '18_FB_IMG_1789936101956_1.jpg',  '19_FB_IMG_1789936101956.jpg',  '20_FB_IMG_1789936112453.jpg',  '21_FB_IMG_1789936123772.jpg',  '22_FB_IMG_1789936131828.jpg',  '23_FB_IMG_1789936138962.jpg',  '24_FB_IMG_1789936151377.jpg',  '25_FB_IMG_1789936183991.jpg',  '26_FB_IMG_1789936210253.jpg',  '27_FB_IMG_1789936219268.jpg',  '28_FB_IMG_1789936233700.jpg',  '29_FB_IMG_1789936240801.jpg',  '30_FB_IMG_1789936261326.jpg',  '31_FB_IMG_1789936272252.jpg',  '32_FB_IMG_1789936278801.jpg',  '33_FB_IMG_1789936286210.jpg',  '34_FB_IMG_1789936293156.jpg',  '35_FB_IMG_1789936324989.jpg',  '36_FB_IMG_1789936334352.jpg',  '37_FB_IMG_1789936341516.jpg',  '38_FB_IMG_1789936347970.jpg',  '39_FB_IMG_1789936356063.jpg',  '40_FB_IMG_1789936371265.jpg',  '41_FB_IMG_1789936429422.jpg',  '42_FB_IMG_1789936443055.jpg',  '43_FB_IMG_1789936450621.jpg',  '44_FB_IMG_1789936457935.jpg',  '45_FB_IMG_1789936463790.jpg',  '46_FB_IMG_1789936505119.jpg',  '47_FB_IMG_1789936523417.jpg',  '48_FB_IMG_1789936559817.jpg',  '49_FB_IMG_1789936567024.jpg',  '50_FB_IMG_1789936578685.jpg',  '51_FB_IMG_1789936592397.jpg',  '52_FB_IMG_1789936600874.jpg'
];

const gallery = document.getElementById('gallery');
photoFiles.forEach((file, i) => {
  const item = document.createElement('button');
  item.className = 'gallery-item';
  item.type = 'button';
  item.setAttribute('aria-label', `Open project photo ${i + 1}`);
  const img = document.createElement('img');
  img.src = `photos/${file}`;
  img.alt = `For His Glory Construction & Repairs project photo ${i + 1}`;
  img.loading = 'lazy';
  item.appendChild(img);
  item.addEventListener('click', () => openLightbox(i));
  gallery.appendChild(item);
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

document.getElementById('year').textContent = new Date().getFullYear();

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
let currentPhoto = 0;
function openLightbox(index){ currentPhoto=index; lightboxImage.src=`photos/${photoFiles[index]}`; lightboxImage.alt=`For His Glory Construction & Repairs project photo ${index+1}`; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeLightbox(){ lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
function movePhoto(dir){ currentPhoto=(currentPhoto+dir+photoFiles.length)%photoFiles.length; lightboxImage.src=`photos/${photoFiles[currentPhoto]}`; lightboxImage.alt=`For His Glory Construction & Repairs project photo ${currentPhoto+1}`; }
document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', () => movePhoto(-1));
document.querySelector('.lightbox-next').addEventListener('click', () => movePhoto(1));
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if(!lightbox.classList.contains('open')) return; if(e.key==='Escape') closeLightbox(); if(e.key==='ArrowLeft') movePhoto(-1); if(e.key==='ArrowRight') movePhoto(1); });

const form = document.getElementById('estimateForm');
const formMessage = document.getElementById('formMessage');
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = `Estimate Request — ${data.get('project') || 'Home Project'}`;
  const body = [
    'For His Glory Construction & Repairs — Estimate Request',
    '',
    `Name: ${data.get('name')}`,
    `Phone: ${data.get('phone')}`,
    `Email: ${data.get('email') || 'Not provided'}`,
    `Property city / ZIP: ${data.get('location') || 'Not provided'}`,
    `Project type: ${data.get('project')}`,
    '',
    'Project details:',
    data.get('details'),
    '',
    'Sent from the For His Glory Construction & Repairs website.'
  ].join('\n');
  window.location.href = `mailto:forhisgloryconstructionpa@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formMessage.textContent = 'Your email program should open with the estimate request filled in. If it does not, call 570-560-7610 or email forhisgloryconstructionpa@gmail.com directly.';
});
