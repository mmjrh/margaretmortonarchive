document.addEventListener('DOMContentLoaded', function () {
  const entries = Array.from(document.querySelectorAll('.news-entry[data-news-id]'));
  const panelRoot = document.querySelector('.imgscroll');

  if (!entries.length || !panelRoot) return;

  // Edit this object to update right-side content for each news entry.
  const newsPanelContent = {
    'mana-open-studios': {
      kicker: 'Event',
      title: 'Mana Contemporary Spring Open Studios',
      date: 'May 17, 2026',
      body: [
        'We are opening our doors to the public for Mana Open Studios on Sunday, May 17.',
        'Margaret Morton’s books will be for sale and audiovisual materials on view to browse.',
      ],
      images: [
        {
          src: 'images/news/OpenStudios.png',
          alt: 'Open Studios image',
          caption: 'Fall Open Studios'
        }
      ],
      cta: {
        label: 'Register here',
        href: 'https://www.eventbrite.com/e/spring-open-studios-at-mana-contemporary-tickets-1984307241375',
      }
    },
    'on-this-spot': {
      kicker: 'Feature',
      title: 'On This Spot: Margaret Morton',
      date: 'Upcoming',
      body: [
        'Through short-form documentaries with a biographical and feminist lens, On This Spot re-centers women artists in the story of New York City’s art histories.',
        'Link and events forthcoming.',
      ],
      images: [
        {
          src: 'images/news/OnThisSpot.jpg',
          alt: 'On This Spot feature image',
          caption: 'On This Spot NYC feature'
        }
      ],
    },
    'through-padlocks': {
      kicker: 'Exhibition',
      title: 'Through Padlocks, Behind Barricades',
      date: 'October 17, 2025 - January 05, 2026',
      body: [
        'Through Padlocks, Behind Barricades explores the squatter movement on New York’s Lower East Side (Loisaida) in the 1990s. It features Margaret Morton’s photographs of life in Glass House, an abandoned glass factory at the corner of Avenue D and East 10th Street. Several dozen squatters made the building their home for sixteen months, until police evicted them in winter 1994. The exhibition presents Morton’s in-depth portrait of one squat, with an array of printed materials exploring the debates that arose over squatters’ rights.'
      ],
      images: [
        {
          src: 'images/news/TPBB.png',
          alt: 'Through Padlocks exhibition image',
          caption: 'Exhibition graphic'
        }
      ],
      cta: {
        label: 'See installation images and program information on the exhibitions page.',
        href: 'mma-exhibitions.html'
      }
    },
    'camera-donation': {
      kicker: 'Archive Donation',
      title: 'Archive Donates Cameras to the Cooper Union',
      date: 'December 2025',
      body: [
        'The Margaret Morton Archive donates her photographic equipment to the Cooper Union, where Morton taught for 30 years, including a Mamiya 6, Canon EOS 5D, and several 35mm cameras.',
      ],
      images: [
        {
          src: 'images/news/CameraDonation.jpg',
          alt: 'Camera donation image',
          caption: 'Donation announcement'
        }
      ]
    },
    'teaching-papers': {
      kicker: 'Archive Donation',
      title: 'Cooper Union Receives Teaching Papers',
      date: 'March 15, 2024',
      body: [
        'Recently, The Cooper Union received 16 boxes of Margaret Morton\'s teaching papers.'
      ],
      images: [
        {
          src: 'images/news/CooperDonation.jpg',
          alt: 'Teaching papers donation image',
          caption: 'Teaching papers donation'
        }
      ],
      cta: {
        label: 'See the contents of this collection and inquire for research here.',
        href: 'https://archives.cooper.edu/repositories/2/resources/78'
      }
    },
    'curtis-cuffie': {
      kicker: 'Exhibition',
      title: "Morton\'s Lens on Curtis Cuffie",
      date: 'October 28, 2023',
      body: [
        'A feature presentation centered on Margaret Morton\'s documentation connected to Curtis Cuffie.',
        'This section can include curator notes, related references, and program text.'
      ],
      images: [
        {
          src: 'images/news/Curtis.png',
          alt: 'Curtis Cuffie feature image',
          caption: 'Morton\'s Lens on Curtis Cuffie'
        }
      ]
    }
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderPanel(content) {
    if (!content) return;

    const paragraphs = (content.body || [])
      .map(function (line) {
        return '<p>' + escapeHtml(line) + '</p>';
      })
      .join('');

    const cta = content.cta && content.cta.href
      ? '<p class="news-detail-cta"><a href="' + escapeHtml(content.cta.href) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(content.cta.label || 'Learn more') + '</a></p>'
      : '';

    panelRoot.innerHTML =
      '<article class="news-detail-panel">' +
      '<p class="news-detail-kicker">' + escapeHtml(content.kicker || '') + '</p>' +
      '<h2 class="news-detail-title">' + escapeHtml(content.title || '') + '</h2>' +
      '<p class="news-detail-date">' + escapeHtml(content.date || '') + '</p>' +
      '<div class="news-detail-body">' + paragraphs + '</div>' +
      cta +
      '</article>';
  }

  function setActiveEntry(activeEntry) {
    entries.forEach(function (entry) {
      const isActive = entry === activeEntry;
      entry.classList.toggle('is-active', isActive);
      entry.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  entries.forEach(function (entry) {
    const id = entry.getAttribute('data-news-id');
    const image = entry.querySelector('.news-image');
    const title = entry.querySelector('.news-entry-bottom');

    const openEntry = function () {
      renderPanel(newsPanelContent[id]);
      setActiveEntry(entry);
    };

    entry.setAttribute('role', 'button');
    entry.setAttribute('tabindex', '0');

    if (image) image.addEventListener('click', openEntry);
    if (title) title.addEventListener('click', openEntry);

    entry.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openEntry();
      }
    });
  });

  const firstEntry = entries[0];
  if (firstEntry) {
    const firstId = firstEntry.getAttribute('data-news-id');
    renderPanel(newsPanelContent[firstId]);
    setActiveEntry(firstEntry);
  }
});
