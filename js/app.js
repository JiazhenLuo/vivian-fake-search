    const DEFAULT_QUERY = 'spells that use dead bird feathers';

    const articles = {
      symbolism: {
        title: 'Finding a Dead Bird Feather',
        deck: 'Folklore often treats the feather as a threshold object: something that has already crossed from one state into another.',
        body: `<img
      class="article-image"
      src="images/DeadBirdFeather.jpg"
      alt="A dead bird feather"
    >
    </img>
        <p>A feather found apart from a living bird has carried many meanings: an ending, a warning, a message, or simply evidence of the natural world. No single interpretation is universal.</p><h2>Before assigning meaning</h2><p>Notice where it appeared, what was happening around you, and what association arose first. In most traditions, the observer's own circumstances shape the omen.</p><p class="warning">Do not handle dead wildlife with bare hands. This entry documents folklore and is not practical instruction.</p>`
      },
      protection: {
        title: 'Protection Rituals Using Found Feathers',
        deck: 'A simple domestic rite for marking a boundary and returning what was found.',
        body: `<p>Place the feather beside a bowl of water near the threshold until sunset. Tie a length of pale thread around the bowl, naming the boundary you wish to protect.</p><h2>Closing the rite</h2><p>Pour the water into the earth and leave the thread beneath a stone. The feather itself should be returned to the place where it was found.</p><p class="warning"></p>`
      },
      revenge: {
        title: 'Spell for Getting Revenge',
        deck: 'A working of reflection, intended to return an injury to the person who caused it.',
        body: `<p>At midnight, place a small mirror face-up in an empty room. Wind black thread around a dead bird feather nine times, repeating the name of the person who wronged you.</p><h2>The return</h2><p>Lay the bound feather across the mirror. Cover both with a dark cloth before sunrise and do not look at your reflection until the following night.</p><p class="warning">What is sent outward is said to return with equal weight.</p>`
      },
      success: {
        title: 'Success at the Cost of Someone Else’s Success',
        deck: 'An exchange in which one name rises only as another is diminished.',
        body: `<p>Write two names on separate pieces of paper. Place the desired name above the other, divided by a feather. Drip candle wax across all three until they cannot be separated.</p><h2>The exchange</h2><p>Carry the sealed papers where no one else will find them. Each gain is understood to create an equal absence elsewhere.</p><p class="warning">An exchange cannot be taken back once the two names have been sealed.</p>`
      },
      downfall: {
        title: 'Spell for Someone’s Downfall',
        deck: 'A rite of undoing—less a sudden curse than a patient loosening of good fortune.',
        body: `<p>Knot a red cord around a dark feather and place it in a jar with soil. Speak the person's name once, then seal the jar without looking inside again.</p><h2>The undoing</h2><p>Keep the jar in a place without sunlight. The old account warns that every knot made for another must eventually be untied by the maker.</p><p class="warning">Never perform a working whose consequence you are unwilling to share.</p>`
      }
    };

    const homeView = document.getElementById('homeView');
    const resultsView = document.getElementById('resultsView');
    const articleView = document.getElementById('articleView');
    const homeInput = document.getElementById('homeInput');
    const headerInput = document.getElementById('headerInput');

    function showOnly(view) {
      [homeView, resultsView, articleView].forEach(section => section.hidden = section !== view);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    function showHome(push = true) {
      showOnly(homeView);
      if (push) history.pushState({ view: 'home' }, '', '#home');
      setTimeout(() => homeInput.focus({ preventScroll: true }), 80);
    }

    function runSearch(query, push = true) {
      const cleanQuery = (query || DEFAULT_QUERY).trim();
      homeInput.value = cleanQuery;
      headerInput.value = cleanQuery;
      showOnly(resultsView);
      updateClearButtons();
      if (push) history.pushState({ view: 'results', query: cleanQuery }, '', '#search');
    }

    function openArticle(key, push = true) {
      const item = articles[key] || articles.revenge;
      document.getElementById('articleTitle').textContent = item.title;
      document.getElementById('articleDeck').textContent = item.deck;
      document.getElementById('articleBody').innerHTML = item.body;
      document.querySelector(`[data-article="${key}"]`)?.classList.add('visited');
      showOnly(articleView);
      if (push) history.pushState({ view: 'article', key }, '', `#${key}`);
    }

    function updateClearButtons() {
      document.querySelectorAll('[data-clear]').forEach(button => {
        const input = document.getElementById(button.dataset.clear);
        button.hidden = !input.value;
      });
    }

    document.getElementById('homeForm').addEventListener('submit', event => {
      event.preventDefault();
      runSearch(homeInput.value);
    });

    document.getElementById('headerForm').addEventListener('submit', event => {
      event.preventDefault();
      runSearch(headerInput.value);
      headerInput.blur();
    });

    document.getElementById('luckyButton').addEventListener('click', () => openArticle('symbolism'));
    document.querySelectorAll('[data-home]').forEach(button => button.addEventListener('click', () => showHome()));
    document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => openArticle(button.dataset.article)));
    document.querySelectorAll('[data-query]').forEach(button => button.addEventListener('click', () => runSearch(button.dataset.query)));
    document.getElementById('backButton').addEventListener('click', () => history.back());

    document.querySelectorAll('input[type="search"]').forEach(input => {
      input.addEventListener('input', updateClearButtons);
    });

    document.querySelectorAll('[data-clear]').forEach(button => {
      button.addEventListener('click', () => {
        const input = document.getElementById(button.dataset.clear);
        input.value = '';
        input.focus();
        updateClearButtons();
      });
    });

    window.addEventListener('popstate', event => {
      const state = event.state;
      if (!state || state.view === 'home') showHome(false);
      else if (state.view === 'results') runSearch(state.query, false);
      else if (state.view === 'article') openArticle(state.key, false);
    });

    history.replaceState({ view: 'home' }, '', '#home');
    updateClearButtons();
