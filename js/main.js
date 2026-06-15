document.addEventListener('DOMContentLoaded', function () {
  const gallery = document.querySelector('.js-gallery');
  const viewButtons = document.querySelectorAll('.view-switch__button');
  const clearButtons = document.querySelectorAll('.date-field__clear');
  const loadMoreButton = document.querySelector('.load-more');
  const postsPerLoad = 4;
  let nextPostIndex = 0;

  const additionalPosts = [
    {
      image: 'img/1.png',
      alt: 'Clouds at sunset'
    },
    {
      image: 'img/2.png',
      alt: 'Boats on water'
    },
    {
      image: 'img/3.png',
      alt: 'Abstract circular architecture'
    },
    {
      image: 'img/4.png',
      alt: 'Portrait in nature'
    },
    {
      image: 'img/5.png',
      alt: 'Forest path'
    },
    {
      image: 'img/6.png',
      alt: 'Mountain range'
    }
  ];

  function createPostCard(post) {
    const article = document.createElement('article');
    article.className = 'post-card';

    article.innerHTML = [
      '<img class="post-card__image" src="' + post.image + '" alt="' + post.alt + '">',
      '<div class="post-card__content">',
      '<div class="post-card__group"><strong>Today</strong><span class="post-card__meta"><i class="icon icon--heart"></i>128</span><span class="post-card__meta"><i class="icon icon--comment"></i>31</span></div>',
      '<div class="post-card__group"><strong>9-08-2016</strong><span class="post-card__meta"><i class="icon icon--heart"></i>67</span><span class="post-card__meta"><i class="icon icon--comment"></i>22</span></div>',
      '<div class="post-card__group post-card__group--upload"><strong>Image upload</strong><span>11-04-2016</span></div>',
      '</div>'
    ].join('');

    return article;
  }

  function updateLoadMoreButton() {
    if (loadMoreButton) {
      loadMoreButton.hidden = nextPostIndex >= additionalPosts.length;
    }
  }

  viewButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const view = button.dataset.view;

      viewButtons.forEach(function (currentButton) {
        currentButton.classList.toggle('is-active', currentButton === button);
      });

      if (gallery) {
        gallery.classList.toggle('is-grid-view', view === 'grid');
        gallery.classList.toggle('is-rows-view', view === 'rows');
      }
    });
  });

  if (window.flatpickr) {
    window.flatpickr('.js-datepicker', {
      dateFormat: 'd_m_Y',
      allowInput: true,
      defaultDate: null,
      disableMobile: true
    });
  }

  clearButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const input = button.closest('.date-field').querySelector('input');

      if (input) {
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  });

  if (loadMoreButton && gallery) {
    loadMoreButton.addEventListener('click', function () {
      const postsToAdd = additionalPosts.slice(nextPostIndex, nextPostIndex + postsPerLoad);
      const fragment = document.createDocumentFragment();

      postsToAdd.forEach(function (post) {
        fragment.appendChild(createPostCard(post));
      });

      gallery.appendChild(fragment);
      nextPostIndex += postsToAdd.length;
      updateLoadMoreButton();
    });

    updateLoadMoreButton();
  }
});

//# sourceMappingURL=main.js.map
