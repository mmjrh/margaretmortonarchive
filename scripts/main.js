/* mobile‑menu script – wait for DOM to be ready */
document.addEventListener('DOMContentLoaded', () => {
  const ham = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');

  if (!ham || !menu) {
    console.warn('hamburger/menu element not found');
    return;
  }

  ham.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    ham.setAttribute('aria-expanded', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
  });
});

/*mobile menu close button script – wait for DOM to be ready */
document.addEventListener('DOMContentLoaded', () => {
  const ham = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  const closeBtn = menu && menu.querySelector('.mobile-close');

  if (!ham || !menu) return;

  function setMenu(open) {
    menu.classList.toggle('open', open);
    ham.setAttribute('aria-expanded', open);
    menu.inert = !open;
  }

  ham.addEventListener('click', () => setMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => setMenu(false));
});

/* stack imggrid vertically when it contains ultrawide images */
document.addEventListener('DOMContentLoaded', () => {
  const grids = document.querySelectorAll('.imggrid');

  function updateGridLayout(grid) {
    const images = Array.from(grid.querySelectorAll('img'));
    const hasUltraWide = images.some((img) => {
      if (!img.naturalWidth || !img.naturalHeight) return false;
      return img.naturalWidth / img.naturalHeight > 1.5; // threshold for "ultrawide" can be adjusted
    });

    grid.classList.toggle('imggrid-stack-vertical', hasUltraWide);
  }

  grids.forEach((grid) => {
    const images = Array.from(grid.querySelectorAll('img'));
    if (!images.length) return;

    images.forEach((img) => {
      if (img.complete) {
        updateGridLayout(grid);
      } else {
        img.addEventListener('load', () => updateGridLayout(grid), { once: true });
      }
    });

    updateGridLayout(grid);
  });
});
   
/*exhibitions modal script*/
    (function(){
      const modal = document.getElementById('mm-modal');
      const modalImg = modal.querySelector('img');
      const closeBtn = modal.querySelector('.close');
      const prevBtn = modal.querySelector('.mm-prev');
      const nextBtn = modal.querySelector('.mm-next');

      let currentGroup = []; // array of image elements in the current row
      let currentIndex = 0;

      function openGroup(groupElems, startIndex){
        currentGroup = groupElems;
        currentIndex = startIndex;
        showImage();
        modal.classList.add('open');
        modal.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
      }

      function showImage(){
        const img = currentGroup[currentIndex];
        const src = img.getAttribute('data-full') || img.src;
        modalImg.src = src;
        modalImg.alt = img.alt || '';
        prevBtn.hidden = (currentIndex === 0);
        nextBtn.hidden = (currentIndex === currentGroup.length - 1);
      }

      function closeModal(){
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden','true');
        modalImg.src = '';
        document.body.style.overflow = '';
        currentGroup = [];
        currentIndex = 0;
      }

      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', function(e){ if(e.target === modal) closeModal(); });
      document.addEventListener('keydown', function(e){
        if(e.key === 'Escape') closeModal();
        if(e.key === 'ArrowLeft') navigate(-1);
        if(e.key === 'ArrowRight') navigate(1);
      });


      
      function navigate(dir){
        if(!currentGroup.length) return;
        const next = currentIndex + dir;
        if(next < 0 || next >= currentGroup.length) return;
        currentIndex = next;
        showImage();
      }
      prevBtn.addEventListener('click', function(e){ e.stopPropagation(); navigate(-1); });
      nextBtn.addEventListener('click', function(e){ e.stopPropagation(); navigate(1); });

      // Attach click handlers to entry images.
      // Grouping is scoped to each entry container, not an entire year/right column.
      const images = document.querySelectorAll('.articlecontainer img, .exhentry img, img.exhibit-thumb');
      images.forEach(img=>{
        img.classList.add('exhibit-thumb');
        img.addEventListener('click', function(e){
          const container =
            img.closest('.articlecontainer') ||
            img.closest('.exhentry') ||
            img.closest('.rightcolumn') ||
            img.closest('.contentrow') ||
            document;
          const groupList = Array.from(container.querySelectorAll('img'));
          // Filter out images that should not be in the gallery (optional): here we keep only those in this groupList
          const startIndex = groupList.indexOf(img);
          openGroup(groupList, startIndex);
        });
      });
    })();

/*exhibition dropdown*/
  document.addEventListener('DOMContentLoaded', function(){
    // Add toggle functionality to exhibition titles and buttons
    const toggles = document.querySelectorAll('.exhibit-toggle, .exhibit-toggle-btn');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', function(e){
        e.preventDefault();
        // Find the closest parent container that holds this toggle and its panel
        const container = toggle.closest('div') || toggle.parentElement;
        const panel = container.querySelector('.exhibit-panel');
        const btn = container.querySelector('.exhibit-toggle-btn');
        
        if(panel){
          panel.classList.toggle('open');
          if(btn){
            btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
          }
        }
      });
    });
  });
  
/*exhibition image modal*/
  (function(){
      const modal = document.getElementById('mm-modal');
      const modalImg = modal.querySelector('img');
      const closeBtn = modal.querySelector('.close');
      const prevBtn = modal.querySelector('.mm-prev');
      const nextBtn = modal.querySelector('.mm-next');

      let currentGroup = [];
      let currentIndex = 0;

      function openGroup(groupElems, startIndex){
      currentGroup = groupElems;
      currentIndex = startIndex;
      showImage();
      modal.classList.add('open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
      }

      function showImage(){
      const img = currentGroup[currentIndex];
      const src = img.getAttribute('data-full') || img.src;
      modalImg.src = src;
      modalImg.alt = img.alt || '';

      const captionText = img.getAttribute('data-caption') || img.alt || '';
      const captionEl = modal.querySelector('.mm-caption');
      if(captionText && captionEl){
          captionEl.textContent = captionText; // pre-wrap will honor newlines
          captionEl.hidden = false;
      } else if(captionEl){
          captionEl.textContent = '';
          captionEl.hidden = true;
      }

      prevBtn.hidden = (currentIndex === 0);
      nextBtn.hidden = (currentIndex === currentGroup.length - 1);
      }

      function closeModal(){
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden','true');
      modalImg.src = '';
      document.body.style.overflow = '';
      currentGroup = [];
      currentIndex = 0;
      }

      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', function(e){ if(e.target === modal) closeModal(); });
      document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeModal();
      if(e.key === 'ArrowLeft') navigate(-1);
      if(e.key === 'ArrowRight') navigate(1);
      });

      function navigate(dir){
      if(!currentGroup.length) return;
      const next = currentIndex + dir;
      if(next < 0 || next >= currentGroup.length) return;
      currentIndex = next;
      showImage();
      }
      prevBtn.addEventListener('click', function(e){ e.stopPropagation(); navigate(-1); });
      nextBtn.addEventListener('click', function(e){ e.stopPropagation(); navigate(1); });

      modalImg.addEventListener('click', function(e) {
        // optional: only on narrow viewports
        // if (window.innerWidth > 479) return;

        // if we’re already at the last image you might want to loop or do
        // nothing; navigate() already guards out‑of‑range.
        navigate(1);
    });

      // Selector: adjust if your scroller uses a different class.
      // This tries common container classes used for right-side scrollers.
      const images = document.querySelectorAll('.imgitem img');

      images.forEach(img=>{
      img.classList.add('exhibit-thumb');
      img.addEventListener('click', function(e){
          // group by the scroller container so navigation stays within that scroller
          const container = img.closest('.imgscroll') || img.closest('.rightcolumn') || img.closest('.contentrow') || document;
          const groupList = Array.from(container.querySelectorAll('.imgitem img'));
          const startIndex = groupList.indexOf(img);
          openGroup(groupList, startIndex);
      });
      });
  })();
        
