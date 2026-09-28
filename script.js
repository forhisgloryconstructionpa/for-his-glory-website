// For His Glory Construction & Repairs — categorized project gallery
const projectGroups = [
  { name: 'All Projects', folder: null },
  { name: 'Hardwood Flooring', folder: '01_Hardwood_Flooring' },
  { name: 'Bathroom Renovation', folder: '02_Bathroom_Renovation' },
  { name: 'Interior Repairs & Drywall', folder: '03_Interior_Repairs_Drywall' },
  { name: 'Sheds & Outbuildings', folder: '04_Sheds_Outbuildings' },
  { name: 'Siding & Windows', folder: '05_Siding_Windows_Exterior' },
  { name: 'Sitework & Outdoor Projects', folder: '06_Sitework_Outdoor_Projects' },
  { name: 'Business & Branding', folder: '07_Business_Branding' }
];

const projectPhotos = [
  ['Hardwood Flooring','01_Hardwood_Flooring/01_Hardwood_Finished_Kitchen.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/02_Hardwood_Entry_Detail.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/03_Hardwood_Floor_Closeup.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/04_Hardwood_Finished_Transition.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/05_Hardwood_Finished_Room.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/06_Hardwood_Finished_Sunlight.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/07_Hardwood_Before_After_Collage.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/08_Hardwood_Repair_Detail.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/09_Hardwood_Finished_Floor.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/10_Hardwood_Finished_Doorway.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/11_Hardwood_Room_Before.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/12_Hardwood_Floor_Layout.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/13_Hardwood_Finished_Room_2.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/14_Hardwood_Dark_Floor_Detail.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/15_Hardwood_Finished_Room_3.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/16_Herringbone_Floor_Detail.jpg'],
  ['Hardwood Flooring','01_Hardwood_Flooring/17_Herringbone_Finished_Room.jpg'],
  ['Bathroom Renovation','02_Bathroom_Renovation/01_Shower_Wall_Repair.jpg'],
  ['Bathroom Renovation','02_Bathroom_Renovation/02_Bathroom_Floor.jpg'],
  ['Bathroom Renovation','02_Bathroom_Renovation/03_Bathroom_Vanity_Wall.jpg'],
  ['Bathroom Renovation','02_Bathroom_Renovation/04_Bathroom_Vanity_Area.jpg'],
  ['Interior Repairs & Drywall','03_Interior_Repairs_Drywall/01_Ceiling_Drywall_Repair.jpg'],
  ['Interior Repairs & Drywall','03_Interior_Repairs_Drywall/02_Carpet_Transition_Floor.jpg'],
  ['Interior Repairs & Drywall','03_Interior_Repairs_Drywall/03_Closet_Repair.jpg'],
  ['Interior Repairs & Drywall','03_Interior_Repairs_Drywall/04_Dark_Floor_Interior.jpg'],
  ['Sheds & Outbuildings','04_Sheds_Outbuildings/01_Shed_Interior.jpg'],
  ['Sheds & Outbuildings','04_Sheds_Outbuildings/02_Shed_Exterior.jpg'],
  ['Siding & Windows','05_Siding_Windows_Exterior/01_Siding_and_Window_Exterior.jpg'],
  ['Siding & Windows','05_Siding_Windows_Exterior/02_Window_Screen_Before_After.png'],
  ['Sitework & Outdoor Projects','06_Sitework_Outdoor_Projects/01_Riverside_Hatch_Worksite.png'],
  ['Sitework & Outdoor Projects','06_Sitework_Outdoor_Projects/02_Riverside_Worksite.jpg'],
  ['Sitework & Outdoor Projects','06_Sitework_Outdoor_Projects/03_Riverside_Worksite_2.jpg'],
  ['Business & Branding','07_Business_Branding/01_For_His_Glory_Banner.png'],
  ['Business & Branding','07_Business_Branding/02_Colossians_3_23_Cross.png'],
  ['Business & Branding','07_Business_Branding/03_Colossians_3_23_Cross_Alternate.jpg'],
  ['Business & Branding','07_Business_Branding/04_Facebook_Best_Photos_Collage.jpg']
];

const gallery = document.getElementById('gallery');
const projectsSection = document.getElementById('projects');
let visiblePhotos = [...projectPhotos];
let currentPhoto = 0;

function setupGalleryFilters() {
  if (!gallery || document.getElementById('galleryFilters')) return;
  const filters = document.createElement('div');
  filters.id = 'galleryFilters';
  filters.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;margin:0 0 24px;justify-content:center;';
  projectGroups.forEach((group, i) => {
    const b = document.createElement('button');
    b.type='button'; b.textContent=group.name;
    b.style.cssText='padding:10px 14px;border:1px solid rgba(255,255,255,.25);border-radius:999px;background:#111;color:#fff;cursor:pointer;font-weight:700;';
    b.addEventListener('click', () => {
      visiblePhotos = group.folder ? projectPhotos.filter(p => p[0] === group.name) : [...projectPhotos];
      renderGallery();
      [...filters.children].forEach(x => x.style.background='#111');
      b.style.background='#b8892f';
    });
    if(i===0) b.style.background='#b8892f';
    filters.appendChild(b);
  });
  projectsSection.querySelector('.section-head')?.after(filters);
}

function renderGallery() {
  if (!gallery) return;
  gallery.innerHTML='';
  visiblePhotos.forEach((entry,i) => {
    const [category,file] = entry;
    const item=document.createElement('button'); item.className='gallery-item'; item.type='button';
    item.setAttribute('aria-label',`Open ${category} project photo ${i+1}`);
    const img=document.createElement('img'); img.src=`photos/${file}`; img.alt=`For His Glory Construction & Repairs — ${category}`; img.loading='lazy';
    item.appendChild(img); item.addEventListener('click',()=>openLightbox(i)); gallery.appendChild(item);
  });
}

setupGalleryFilters();
renderGallery();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if(menuToggle && nav){ menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));}); }
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
const year=document.getElementById('year'); if(year) year.textContent=new Date().getFullYear();

const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightboxImage');
function openLightbox(index){currentPhoto=index; if(!lightbox||!lightboxImage)return; lightboxImage.src=`photos/${visiblePhotos[index][1]}`; lightboxImage.alt=`For His Glory Construction & Repairs — ${visiblePhotos[index][0]}`; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';}
function closeLightbox(){if(!lightbox)return;lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';}
function movePhoto(dir){if(!visiblePhotos.length)return;currentPhoto=(currentPhoto+dir+visiblePhotos.length)%visiblePhotos.length;lightboxImage.src=`photos/${visiblePhotos[currentPhoto][1]}`;lightboxImage.alt=`For His Glory Construction & Repairs — ${visiblePhotos[currentPhoto][0]}`;}
document.querySelector('.lightbox-close')?.addEventListener('click',closeLightbox);
document.querySelector('.lightbox-prev')?.addEventListener('click',()=>movePhoto(-1));
document.querySelector('.lightbox-next')?.addEventListener('click',()=>movePhoto(1));
lightbox?.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(!lightbox?.classList.contains('open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')movePhoto(-1);if(e.key==='ArrowRight')movePhoto(1);});

const form=document.getElementById('estimateForm'); const formMessage=document.getElementById('formMessage');
if(form&&formMessage){form.addEventListener('submit',()=>{formMessage.textContent='Sending your estimate request…';});}
