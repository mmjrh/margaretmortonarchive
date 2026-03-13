document.addEventListener('DOMContentLoaded', function () {
  const entries = Array.from(document.querySelectorAll('.news-entry[data-news-id]'));
  const panelRoot = document.querySelector('.imgscroll');

  if (!entries.length || !panelRoot) return;

  // Edit this object to update right-side content for each news entry.
  const newsPanelContent = {
    'on-this-spot': {
      kicker: 'Podcast',
      title: 'On This Spot: Margaret Morton',
      date: 'Upcoming',
      body: [
        'A feature on Margaret Morton in the On This Spot NYC series.',
        'Use this section for summary text, project notes, or any related context you want visitors to read after selecting this card.'
      ],
      images: [
        {
          src: 'images/news/OnThisSpot.jpg',
          alt: 'On This Spot feature image',
          caption: 'On This Spot NYC feature'
        }
      ],
      cta: {
        label: 'Watch on On This Spot NYC',
        href: 'https://www.onthisspotnyc.org/#videos'
      }
    },
    'through-padlocks': {
      kicker: 'Exhibition',
      title: 'Through Padlocks, Behind Barricades',
      date: 'October 17, 2025 - January 05, 2026',
      body: [
        'An exhibition featuring Margaret Morton\'s work on Glass House and the squats of the Lower East Side.',
        'Replace this copy with full exhibition context, venue details, and program information.'
      ],
      images: [
        {
          src: 'images/news/TPBB.png',
          alt: 'Through Padlocks exhibition image',
          caption: 'Exhibition graphic'
        }
      ]
    },
    'camera-donation': {
      kicker: 'Archive Donation',
      title: 'Archive Donates Cameras to the Cooper Union',
      date: 'December xx, 2025',
      body: [
        'The Margaret Morton Archive donates her cameras to the Cooper Union.',
        'Use this area for donation details, institutional context, and acknowledgements.'
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
        'The Cooper Union receives Margaret Morton\'s teaching papers.',
        'Add paper highlights, collection scope, and access details in this section.'
      ],
      images: [
        {
          src: 'images/news/CooperDonation.jpg',
          alt: 'Teaching papers donation image',
          caption: 'Teaching papers donation'
        }
      ]
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
    },
    'mana-open-studios': {
      kicker: 'Event',
      title: 'Mana Contemporary Fall Open Studios',
      date: 'October 15, 2023',
      body: [
        'Event coverage and visitor information for Mana Contemporary Fall Open Studios.',
        'Use this section for recap details, participating artists, and related links.'
      ],
      images: [
        {
          src: 'images/news/OpenStudios.png',
          alt: 'Open Studios image',
          caption: 'Fall Open Studios'
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
