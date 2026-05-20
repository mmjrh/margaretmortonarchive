// menu.js
document.getElementById('nav-placeholder').innerHTML = `
  <nav>
      <div class="homebutton">
        <a class="pagetitle" href="index.html">Margaret Morton</a></div>
      </div>
      <div class="navbar">
        <a class="naventry" href="mma-books.html">Books</a>
        <a class="naventry" href="mma-writing.html">Writing</a>
        <a class="naventry" href="mma-exhibitions.html">Exhibitions</a>
        <a class="naventry" href="mma-biography.html">Biography</a>
        <a class="naventry" href="mma-archive.html">Archive</a>
        <a class="naventry" href="mma-news.html">News</a>
      </div>
      <button class="hamburger" aria-label="Open menu" aria-expanded="false">
        <span></span>
      </button>
  </nav>
  <div class="mobile-menu">
      <button class="mobile-close" aria-label="Close menu">&times;</button>
        <a class="naventry" href="mma-books.html">Books</a>
        <a class="naventry" href="mma-writing.html">Writing</a>
        <a class="naventry" href="mma-exhibitions.html">Exhibitions</a>
        <a class="naventry" href="mma-biography.html">Biography</a>
        <a class="naventry" href="mma-archive.html">Archive</a>
        <a class="naventry" href="mma-news.html">News</a>
    </div>
`;