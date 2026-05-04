import re

# Read the file
with open('mma-books.html', 'r') as f:
    content = f.read()

# Find and replace the contentright section
old_gallery = '''        <div class="contentright">
          <div class="gallerycontainer"><!--TGUL Gallery-->'''

new_gallery = '''        <div class="contentright">
          <div class="gallery-item active" data-book="tgul">
            <div class="gallerycontainer"><!--TGUL Gallery-->'''

# Find the closing </div> for contentright section (after the TGUL gallery)
# We need to find the first </div> that closes the gallerycontainer, then wrap everything differently

# Let's reconstruct the entire contentright section
# Find the start of contentright
start_idx = content.find('<div class="contentright">')
# Find the end (the closing </div> for contentright)
# Work backwards from where we see <!--modal-->
modal_idx = content.find('<!--modal-->')
end_idx = content.rfind('</div>', 0, modal_idx) + 6

old_section = content[start_idx:end_idx]

# Build the new section with all gallery items
new_section = '''        <div class="contentright">
          <div class="gallery-item active" data-book="tgul">
            <div class="gallerycontainer"><!--TGUL Gallery-->
              <div class="imgscroll">
                <div class="bookinfo">
                  <div class="bookcover">
                    <img src="images/covers/TGUL.webp">
                  </div>
                  <div class="booktext">
                    <h1><i>Transitory Gardens, Uprooted Lives</i></h1>
                    <p>With text by Morton's colleague at Yale University, landscape architect Diana Balmori, Transitory Gardens, Uprooted Lives addresses gardens built by 
                      New York City unhoused people. Gardening despite their economic circumstances, the subjects of this book are aware that their gardens await 
                      imminent destruction by city authorities and the private owners of their appropriated spaces. The images that make up this book span a wide swath of the Lower East Side, 
                      dispute "the garden as the domain of settled or prosperous individuals only," and consider how such spaces might reflect their caretakers' 
                      desire for basic comforts.
                    <p>
                  </div>
                </div>
                <div class="imgitem">
                  <img data-caption="Jimmy's Garden [Harmony Squat]&#10;Norfolk and Broome Streets&#10;1991" src="images/BookTGUL/TGUL00.webp">
                </div>
                <div class="imgitem">
                  <img data-caption="Jimmy's Garden [Bulldozed]&#10;Norfolk and Broome Streets&#10;1991" src="images/BookTGUL/TGUL01.webp">
                </div>
                <div class="imgitem">
                  <img data-caption="Guineo's Garden&#10;Bushville&#10;1991" src="images/BookTGUL/TGUL02.webp">
                </div>
                <div class="imgitem">
                  <img data-caption="Guineo's Courtyard&#10;Bushville&#10;1991" src="images/BookTGUL/TGUL03.webp">
                </div>
                <div class="imgitem">
                  <img data-caption="Guineo's Courtyard [with Bugbane]&#10;Bushville&#10;1991" src="images/BookTGUL/TGUL04.webp">
                </div>
                <div class="imgitem">
                  <img data-caption="Angelo's Garden [with Billiard Ball]&#10;Pier 84&#10;1991" src="images/BookTGUL/TGUL05.webp">
                </div>
                <div class="imgitem">
                  <img data-caption="Stuffed Animals in Anna's Garden&#10;Lower East Side&#10;1992" src="images/BookTGUL/TGUL06.webp">
                </div>
                <div class="imgitem">
                  <img data-caption="Roof of Mr. Lee's house&#10;the Hill, Chinatown&#10;1992" src="images/BookTGUL/TGUL07.webp">
                </div>
              </div>
            </div>
          </div>
          <div class="gallery-item" data-book="tunnel">
            <div class="gallerycontainer"><!--Tunnel Gallery-->
              <div class="imgscroll">
                <div class="bookinfo">
                  <div class="bookcover">
                    <img src="images/covers/tunnel.webp">
                  </div>
                  <div class="booktext">
                    <h1><i>The Tunnel</i></h1>
                    <p>Add gallery content for The Tunnel here.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="gallery-item" data-book="fragile">
            <div class="gallerycontainer"><!--Fragile Dwelling Gallery-->
              <div class="imgscroll">
                <div class="bookinfo">
                  <div class="bookcover">
                    <img src="images/covers/fragile.webp">
                  </div>
                  <div class="booktext">
                    <h1><i>Fragile Dwelling</i></h1>
                    <p>Add gallery content for Fragile Dwelling here.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="gallery-item" data-book="glass">
            <div class="gallerycontainer"><!--Glass House Gallery-->
              <div class="imgscroll">
                <div class="bookinfo">
                  <div class="bookcover">
                    <img src="images/covers/glass.webp">
                  </div>
                  <div class="booktext">
                    <h1><i>Glass House</i></h1>
                    <p>Add gallery content for Glass House here.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="gallery-item" data-book="citiesofthedead">
            <div class="gallerycontainer"><!--Cities of the Dead Gallery-->
              <div class="imgscroll">
                <div class="bookinfo">
                  <div class="bookcover">
                    <img src="images/covers/citiesofthedead.webp">
                  </div>
                  <div class="booktext">
                    <h1><i>Cities of the Dead: The Ancestral Cemeteries of Kyrgyzstan</i></h1>
                    <p>Add gallery content for Cities of the Dead here.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="gallery-item" data-book="farley">
            <div class="gallerycontainer"><!--The Farley Gallery-->
              <div class="imgscroll">
                <div class="bookinfo">
                  <div class="bookcover">
                    <img src="images/covers/farley.webp">
                  </div>
                  <div class="booktext">
                    <h1><i>The Farley</i></h1>
                    <p>Add gallery content for The Farley here.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>'''

content = content[:start_idx] + new_section + content[end_idx:]

# Write back
with open('mma-books.html', 'w') as f:
    f.write(content)

print("Updated mma-books.html with gallery containers")
