/* =========================================================
   Alignment Studio · Strategic Generosity Blueprint™
   Single-client decision instrument. No backend, no build.
   Journal state persists to localStorage only.
   ========================================================= */
(function () {
  'use strict';

  // ---------- Data ----------
  var DEFAULTS = { mission: 30, time: 15, transparency: 20, culture: 15, scale: 20 };

  var CRITERIA = [
    { key: 'mission', label: 'Mission alignment' },
    { key: 'time', label: 'Time load' },
    { key: 'transparency', label: 'Transparency' },
    { key: 'culture', label: 'Culture and DEI' },
    { key: 'scale', label: 'Scale of impact' }
  ];

  var ORGS = [
    {
      id: 'camh', name: 'CAMH', charityNo: '10693 2320 RR0001', fit: 'strong',
      mission: "Canada's largest mental health teaching hospital, advancing care, research, and public understanding.",
      scores: { mission: 9, time: 6, transparency: 8, culture: 8, scale: 9 },
      rev: '$648.8M', eff: '91%', time: 'Est. 4 – 6 hours a month',
      series: [512.4, 548.9, 577.2, 611.5, 648.8],
      why: '"Health and mental health" · "Governance-first boards" · "Financial oversight"',
      leadership: 'President and CEO in role since 2019; board chair and full trustee slate confirmed current. Governance committee structure published and active.',
      risk: 'Public scrutiny comes with the profile: media coverage of emergency-department pressure is recurring. No governance controversies on record.',
      change: 'A board or committee seat opening within 12 months would move this from strong to act now.'
    },
    {
      id: 'fredvictor', name: 'Fred Victor Centre', charityNo: '13001 6959 RR0001', fit: 'strong',
      mission: 'Housing, health, and community services for people experiencing poverty and homelessness in Toronto.',
      scores: { mission: 9, time: 7, transparency: 8, culture: 9, scale: 6 },
      rev: '$55.8M', eff: '82%', time: 'Est. 3 – 5 hours a month',
      series: [41.2, 44.6, 48.3, 51.9, 55.8],
      why: '"Housing and homelessness" · "Social justice" · "Diversified revenue"',
      leadership: 'CEO in role since 2014 with a long-tenured senior team; board renewal is steady and documented in annual reports.',
      risk: 'Revenue leans on government contracts, roughly 70%; a funding shift would strain programs before it strained the board.',
      change: 'A confirmed multi-year renewal of the core housing contracts would remove our only flag.'
    },
    {
      id: 'progressplace', name: 'Progress Place', charityNo: '11906 8443 RR0001', fit: 'moderate',
      mission: 'A clubhouse community where adults living with mental illness find work, wellness, and belonging.',
      scores: { mission: 8, time: 9, transparency: 7, culture: 8, scale: 4 },
      rev: '$5.9M', eff: '84%', time: 'Est. 2 – 4 hours a month',
      series: [4.6, 4.9, 5.2, 5.6, 5.9],
      why: '"Health and mental health" · "A few hours per month" · "Strong CEO leadership"',
      leadership: 'Executive director is long-serving and widely respected in the clubhouse movement; a small, hands-on board.',
      risk: 'Small team, founder-strength culture. Leadership succession is the question to ask in the first meeting.',
      change: 'A written succession plan would raise the transparency score a full step.'
    },
    {
      id: 'sickkids', name: 'SickKids Foundation', charityNo: '10808 4419 RR0001', fit: 'moderate',
      mission: 'Funds child health research and care at The Hospital for Sick Children and across Canada.',
      scores: { mission: 7, time: 5, transparency: 9, culture: 7, scale: 10 },
      rev: '$297.1M', eff: '68%', time: 'Est. 6 – 8 hours a month',
      series: [231.4, 248.9, 262.3, 281.7, 297.1],
      why: '"Health and mental health" · "Fundraising" · "Strong CEO leadership"',
      leadership: 'CEO and full board roster verified current; among the most transparent large foundations in the country.',
      risk: 'No controversies on record. The scale cuts both ways: your seat is one of many, and influence accrues slowly.',
      change: 'A committee seat, rather than the full board, would cut the time load in half and lift the fit.'
    }
  ];

  var CHIP_GROUPS = [
    { title: 'Expertise you bring', chips: [
      { id: 'governance', label: 'Governance', orgs: ['camh', 'fredvictor'] },
      { id: 'fundraising', label: 'Fundraising', orgs: ['sickkids', 'camh'] },
      { id: 'technology', label: 'Technology', orgs: ['camh'] },
      { id: 'finoversight', label: 'Financial oversight', orgs: ['camh', 'fredvictor', 'sickkids'] }
    ] },
    { title: 'Values you hold', chips: [
      { id: 'ceo', label: 'Strong CEO leadership', orgs: ['progressplace', 'sickkids', 'fredvictor'] },
      { id: 'govfirst', label: 'Governance-first boards', orgs: ['camh', 'sickkids'] },
      { id: 'divrev', label: 'Diversified revenue', orgs: ['fredvictor', 'camh'] },
      { id: 'socjust', label: 'Social justice', orgs: ['fredvictor'] }
    ] },
    { title: 'Primary causes', chips: [
      { id: 'health', label: 'Health and mental health', orgs: ['camh', 'progressplace', 'sickkids'] },
      { id: 'housing', label: 'Housing and homelessness', orgs: ['fredvictor'] }
    ] },
    { title: 'Secondary causes', chips: [
      { id: 'arts', label: 'Arts and culture', orgs: [] },
      { id: 'racial', label: 'Racial justice', orgs: ['fredvictor'] },
      { id: 'lgbtq', label: 'LGBTQ2S+ rights', orgs: ['camh', 'fredvictor'] }
    ] }
  ];

  var SCREENS = [
    { id: 'welcome', num: '·', label: 'Begin', short: 'Begin', sub: 'The opening page' },
    { id: 'you', num: '1', label: 'You', short: 'You', sub: 'Values, causes, capacity' },
    { id: 'serve', num: '2', label: "Where you'll serve", short: 'Serve', sub: 'The board decision' },
    { id: 'give', num: '3', label: "Where you'll give", short: 'Give', sub: 'The foundation' },
    { id: 'decide', num: '4', label: 'Decide', short: 'Decide', sub: 'Commitment and next steps' }
  ];

  var REACTIONS = [
    { key: 'drawn', label: 'Drawn to it' },
    { key: 'more', label: 'Need more' },
    { key: 'not', label: 'Not this one' }
  ];

  var BADGES = {
    strong: { text: 'Strong fit', cls: 'as-badge-strong' },
    moderate: { text: 'Moderate fit', cls: 'as-badge-moderate' },
    gap: { text: 'Gap', cls: 'as-badge-gap' }
  };

  var STORE_KEY = 'alignment-studio-journal-v1';

  var clientName = new URLSearchParams(window.location.search).get('client') || 'the Caldwell family';

  // ---------- State ----------
  var state = {
    screen: 'welcome',
    mm: false,
    gen: false,
    weights: Object.assign({}, DEFAULTS),
    caption: '',
    expanded: null,
    pinned: [],
    journal: {},
    recReaction: null,
    movedId: null,
    movedDir: 0,
    visited: { welcome: true }
  };

  try {
    var raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      var saved = JSON.parse(raw);
      state.journal = saved.journal || {};
      state.recReaction = saved.recReaction || null;
    }
  } catch (e) {}

  function persist() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ journal: state.journal, recReaction: state.recReaction }));
    } catch (e) {}
  }

  // ---------- Helpers ----------
  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function orgById(id) {
    return ORGS.filter(function (o) { return o.id === id; })[0];
  }

  function score(org, w) {
    var total = Object.keys(w).reduce(function (a, k) { return a + w[k]; }, 0) || 1;
    var s = 0;
    for (var k in w) s += org.scores[k] * w[k];
    return s / total;
  }

  function order(w) {
    return ORGS.slice().sort(function (a, b) { return score(b, w) - score(a, w); }).map(function (o) { return o.id; });
  }

  function ordinal(i) {
    return ['first', 'second', 'third', 'fourth'][i] || String(i + 1) + 'th';
  }

  function weightsDirty() {
    return JSON.stringify(state.weights) !== JSON.stringify(DEFAULTS);
  }

  function anyReaction() {
    return ORGS.some(function (o) { return state.journal[o.id] && state.journal[o.id].reaction; });
  }

  // ---------- Charts ----------
  function barChartSvg(org) {
    var max = Math.max.apply(null, org.series);
    var rects = '', labels = '';
    org.series.forEach(function (v, i) {
      var h = Math.max(4, Math.round(v / max * 66));
      rects += '<rect x="' + (10 + i * 48) + '" y="' + (74 - h) + '" width="34" height="' + h + '" rx="2" fill="#7A99AC"></rect>';
      labels += '<text x="' + (27 + i * 48) + '" y="88" font-size="9" fill="#7A99AC" text-anchor="middle" font-family="Nunito Sans, sans-serif">' + (2020 + i) + '</text>';
    });
    return '<svg class="as-barchart" viewBox="0 0 260 92" width="260" height="92" role="img" aria-label="Bar chart of ' + esc(org.name) + ' total revenue from 2020 to 2024, rising each year to ' + esc(org.rev) + ' in 2024.">' + rects + labels + '</svg>';
  }

  function lifecycleChartSvg(gen) {
    var X0 = 40, X1 = 980, Y0 = 288, YTOP = 60;
    function xFor(yr) { return X0 + (yr - 2025) / 75 * (X1 - X0); }
    function val(yr) {
      var sg = yr <= 2078 ? 26 : 12;
      return Math.exp(-Math.pow(yr - 2078, 2) / (2 * sg * sg));
    }
    var pts = [];
    for (var yr = 2025; yr <= 2100; yr += 1) pts.push([xFor(yr), Y0 - val(yr) * (Y0 - YTOP)]);
    var lineD = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
    var areaD = lineD + ' L' + X1 + ' ' + Y0 + ' L' + X0 + ' ' + Y0 + ' Z';
    var peakX = xFor(2078);
    var peakY = Y0 - val(2078) * (Y0 - YTOP);
    var bands = [
      { label: 'Your watch', years: '2025 – 2050', from: 2025, to: 2050, fill: 'rgba(141,208,239,.18)' },
      { label: 'Your children lead', years: '2050 – 2078', from: 2050, to: 2078, fill: 'rgba(122,153,172,.14)' },
      { label: 'Grandchildren decide the ending', years: '2078 – 2100', from: 2078, to: 2100, fill: 'rgba(102,67,90,.10)' }
    ];
    var kids = '';
    if (gen) {
      bands.forEach(function (b, i) {
        var anchorEnd = i === 2;
        var lx = anchorEnd ? xFor(b.to) - 10 : xFor(b.from) + 10;
        var anchor = anchorEnd ? 'end' : 'start';
        kids += '<rect x="' + xFor(b.from).toFixed(1) + '" y="16" width="' + (xFor(b.to) - xFor(b.from)).toFixed(1) + '" height="272" fill="' + b.fill + '"></rect>';
        kids += '<text x="' + lx.toFixed(1) + '" y="40" font-size="14" font-weight="700" fill="#001E60" text-anchor="' + anchor + '" font-family="Nunito Sans, sans-serif">' + b.label + '</text>';
        kids += '<text x="' + lx.toFixed(1) + '" y="58" font-size="12" fill="#4A5560" text-anchor="' + anchor + '" font-family="Nunito Sans, sans-serif">' + b.years + '</text>';
      });
    }
    kids += '<path d="' + areaD + '" fill="rgba(0,114,206,.12)"></path>';
    kids += '<path d="' + lineD + '" fill="none" stroke="#0072CE" stroke-width="2.5"></path>';
    kids += '<line x1="' + peakX.toFixed(1) + '" y1="30" x2="' + peakX.toFixed(1) + '" y2="288" stroke="#001E60" stroke-width="1.5" stroke-dasharray="5 5"></line>';
    kids += '<circle cx="' + peakX.toFixed(1) + '" cy="' + peakY.toFixed(1) + '" r="5" fill="#001E60"></circle>';
    kids += '<text x="' + peakX.toFixed(1) + '" y="24" font-size="14" font-weight="700" fill="#001E60" text-anchor="middle" font-family="Nunito Sans, sans-serif">2078 · peak year</text>';
    kids += '<line x1="' + X0 + '" y1="' + Y0 + '" x2="' + X1 + '" y2="' + Y0 + '" stroke="#E3EAF1" stroke-width="1.5"></line>';
    [2025, 2040, 2055, 2070, 2085, 2100].forEach(function (yr2) {
      kids += '<text x="' + xFor(yr2).toFixed(1) + '" y="312" font-size="12" fill="#7A99AC" text-anchor="middle" font-family="Nunito Sans, sans-serif">' + yr2 + '</text>';
    });
    return '<svg class="as-lcchart" viewBox="0 0 1000 340" role="img" aria-label="Area chart of annual foundation distributions from 2025 to 2100, rising steadily to a peak in 2078 and easing through 2100. Generational bands can be overlaid.">' + kids + '</svg>';
  }

  // ---------- Screen builders ----------
  function welcomeHtml() {
    return '' +
      '<section class="as-hero as-screen" data-screen-label="Welcome">' +
        '<div class="as-hero-eyebrow">Strategic Generosity Blueprint™</div>' +
        '<h1 class="as-hero-h">You’ve decided not to be the richest person in the graveyard.</h1>' +
        '<p class="as-hero-dek">Secure your family. Enjoy your money. Give the rest away. This studio is where we decide what that looks like — which board gets your Tuesdays, and which causes get your capital.</p>' +
        '<button type="button" class="btn-primary" data-action="goto" data-screen="you">Begin with you</button>' +
        '<div class="as-stats">' +
          '<div><div class="as-stat-num">4</div><div class="as-stat-label">shortlisted organizations</div></div>' +
          '<div><div class="as-stat-num">$16.5 million</div><div class="as-stat-label">modelled foundation capacity, illustrative</div></div>' +
          '<div><div class="as-stat-num">75 years</div><div class="as-stat-label">giving horizon</div></div>' +
        '</div>' +
      '</section>';
  }

  function chipInfoFor(chip) {
    if (chip.orgs.length === 0) {
      return 'noted for granting, not board scoring. The shortlist stays inside your primary causes; the foundation can reach further.';
    }
    var names = chip.orgs.map(function (id) { return orgById(id).name; });
    var joined = names.length > 1
      ? names.slice(0, -1).join(', ') + (names.length > 2 ? ',' : '') + ' and ' + names[names.length - 1]
      : names[0];
    return 'shaped the fit scoring for ' + joined + ' in act two.';
  }

  function chipHintHtml() {
    return '<span class="as-chip-hint">Hover a chip above to see where it influenced the scoring in act two.</span>';
  }

  function youHtml() {
    var groups = CHIP_GROUPS.map(function (g) {
      var chips = g.chips.map(function (c) {
        return '<span class="as-chip" tabindex="0" data-chip="' + c.id + '">' + esc(c.label) + '</span>';
      }).join('');
      return '<div><div class="as-chip-group-title">' + esc(g.title) + '</div><div class="as-chips">' + chips + '</div></div>';
    }).join('');
    return '' +
      '<section class="as-screen" data-screen-label="Act 1 - You">' +
        '<div class="as-eyebrow">Act one · You</div>' +
        '<h1 class="as-title">The mirror</h1>' +
        '<p class="as-lede">Everything in this studio is scored against this page. Hover any chip to see where it shaped the work.</p>' +
        '<div class="as-you-stack">' +
          groups +
          '<div class="as-chip-panel" id="chip-panel">' + chipHintHtml() + '</div>' +
          '<div class="as-card">' +
            '<div class="as-label">Capacity</div>' +
            '<div class="as-capacity-line">A few hours per month · Toronto-area boards</div>' +
            '<p class="as-capacity-note">Time is the constraint we take most seriously. Every organization in act two carries an honest estimate of what its board actually asks of you.</p>' +
          '</div>' +
          '<p class="as-fixnote">If this page doesn’t sound like you, we fix this page first. Everything else depends on it.</p>' +
          '<div><button type="button" class="btn-primary btn-primary-sm" data-action="goto" data-screen="serve">This sounds like us — continue to the boards</button></div>' +
        '</div>' +
      '</section>';
  }

  function revealHtml() {
    if (!weightsDirty()) return '';
    var practiceOrder = order(DEFAULTS);
    var clientOrder = order(state.weights);
    var text;
    if (practiceOrder.join() === clientOrder.join()) {
      text = 'Your weighting and ours land on the same order. That agreement is rare, and worth trusting.';
    } else {
      var diffs = [];
      clientOrder.forEach(function (id, i) {
        var pi = practiceOrder.indexOf(id);
        if (pi !== i) diffs.push({ id: id, you: i, us: pi });
      });
      var d = diffs[0];
      var org = orgById(d.id);
      text = 'You rank ' + org.name + ' ' + ordinal(d.you) + ' where we rank it ' + ordinal(d.us) + '. That gap is not an error, it is the conversation. Bring it to the meeting.';
    }
    return '<div class="as-reveal"><div class="as-reveal-label">Where we disagree</div><p>' + text + '</p></div>';
  }

  function captionHtml() {
    return state.caption ? '<p class="as-caption-box">' + esc(state.caption) + '</p>' : '';
  }

  function resetBtnHtml() {
    return weightsDirty()
      ? '<button type="button" class="btn-link" data-action="reset-weights">Restore our weighting</button>'
      : '';
  }

  function weightPct(key) {
    var total = Object.keys(state.weights).reduce(function (a, k) { return a + state.weights[k]; }, 0) || 1;
    return Math.round(state.weights[key] / total * 100) + '%';
  }

  function orgCardHtml(org, i) {
    var j = state.journal[org.id] || {};
    var sc = score(org, state.weights).toFixed(1);
    var badge = BADGES[org.fit];
    var moved = state.movedId === org.id;
    var movedLabel = moved ? (state.movedDir > 0 ? 'moved up' : 'moved down') : '';
    var expanded = state.expanded === org.id;
    var facts = [
      { value: org.rev, label: '2024 revenue', cite: 'T3010', source: 'CRA T3010 filing, 2024' },
      { value: org.eff, label: 'program efficiency', cite: 'T3010', source: 'CRA T3010 filing, 2024 — program spending over total spending' },
      { value: org.time, label: 'time commitment', cite: 'est.', source: 'Practice estimate from board calendars and interviews' }
    ];
    var factsHtml = facts.map(function (f) {
      return '<div>' +
        '<div class="as-fact-value">' + esc(f.value) + ' <span class="as-fact-cite" title="' + esc(f.source) + '">' + esc(f.cite) + '</span></div>' +
        '<div class="as-fact-label">' + esc(f.label) + '</div>' +
      '</div>';
    }).join('');
    var reactionsHtml = REACTIONS.map(function (r) {
      var on = j.reaction === r.key;
      return '<button type="button" class="as-react' + (on ? ' on' : '') + '" data-action="react" data-org="' + org.id + '" data-key="' + r.key + '" aria-pressed="' + on + '">' + r.label + '</button>';
    }).join('');
    var dossier = '';
    if (expanded) {
      dossier = '' +
        '<div class="as-dossier">' +
          '<div class="as-g2 as-dossier-grid">' +
            '<div>' +
              '<div class="as-label">Leadership, verified</div>' +
              '<p>' + esc(org.leadership) + '</p>' +
              '<p class="as-sourcenote">Verified on LinkedIn, June 2026 · organization website · CRA filing</p>' +
            '</div>' +
            '<div>' +
              '<div class="as-label">Five years of revenue · T3010</div>' +
              '<div>' + barChartSvg(org) + '</div>' +
              '<div class="as-chartnote">2024 revenue ' + esc(org.rev) + ' · program efficiency ' + esc(org.eff) + '</div>' +
            '</div>' +
            '<div>' +
              '<div class="as-label">Risk, stated plainly</div>' +
              '<p>' + esc(org.risk) + '</p>' +
            '</div>' +
            '<div>' +
              '<div class="as-label">What would change this rating</div>' +
              '<p class="as-changeline">' + esc(org.change) + '</p>' +
            '</div>' +
          '</div>' +
        '</div>';
    }
    return '' +
      '<article class="as-org">' +
        '<div class="as-org-main">' +
          '<div class="as-cardrow">' +
            '<div class="as-rankno">' + String(i + 1).padStart(2, '0') + '</div>' +
            '<div class="as-org-head">' +
              '<div class="as-org-titlerow">' +
                '<h2 class="as-orgname">' + esc(org.name) + '</h2>' +
                '<span class="as-badge ' + badge.cls + '">' + badge.text + '</span>' +
                (moved ? '<span class="as-moved">' + movedLabel + '</span>' : '') +
              '</div>' +
              '<div class="as-charityno">Registered charity ' + esc(org.charityNo) + '</div>' +
              '<p class="as-mission">' + esc(org.mission) + '</p>' +
            '</div>' +
            '<div class="as-scorecell">' +
              '<div class="as-score">' + sc + '</div>' +
              '<div class="as-score-sub">weighted fit / 10</div>' +
            '</div>' +
          '</div>' +
          '<div class="as-facts">' + factsHtml + '</div>' +
          '<div class="as-why"><strong>Why it fits you:</strong> ' + esc(org.why) + '</div>' +
          '<div class="as-gut">' +
            '<span class="as-gut-label">Gut check</span>' +
            reactionsHtml +
            '<input type="text" class="as-note-input" data-note="' + org.id + '" value="' + esc(j.note || '') + '" placeholder="One line, in your own words" aria-label="Note">' +
          '</div>' +
          '<div class="as-org-actions">' +
            '<button type="button" class="btn-outline" data-action="toggle-dossier" data-org="' + org.id + '" aria-expanded="' + expanded + '">' + (expanded ? 'Close the evidence' : 'Read the evidence') + '</button>' +
            '<button type="button" class="btn-quiet" data-action="toggle-pin" data-org="' + org.id + '">' + (state.pinned.indexOf(org.id) !== -1 ? 'Unpin' : 'Compare') + '</button>' +
          '</div>' +
        '</div>' +
        dossier +
      '</article>';
  }

  function rankedCardsHtml() {
    return order(state.weights).map(function (id, i) {
      return orgCardHtml(orgById(id), i);
    }).join('');
  }

  function serveHtml() {
    var sliders = CRITERIA.map(function (c) {
      return '' +
        '<label class="as-weight">' +
          '<span class="as-weight-row">' +
            '<span class="as-weight-name">' + c.label + '</span>' +
            '<span class="as-weight-pct" id="w-pct-' + c.key + '">' + weightPct(c.key) + '</span>' +
          '</span>' +
          '<input type="range" min="0" max="40" step="5" value="' + state.weights[c.key] + '" data-weight="' + c.key + '" aria-label="' + c.label + '">' +
        '</label>';
    }).join('');
    return '' +
      '<section class="as-screen" data-screen-label="Act 2 - Where you’ll serve">' +
        '<div class="as-eyebrow">Act two · Where you’ll serve</div>' +
        '<h1 class="as-title">Four boards, ranked for you</h1>' +
        '<p class="as-lede" style="margin-bottom:40px;">We researched each organization against your values, causes, and capacity. Drag the weights to see what you actually care about — the ranking will answer honestly.</p>' +
        '<div class="as-card as-weights">' +
          '<div class="as-weights-head">' +
            '<h2 class="as-card-h">Weight what matters</h2>' +
            '<span id="weights-reset-holder">' + resetBtnHtml() + '</span>' +
          '</div>' +
          '<div class="as-g2 as-weights-grid">' + sliders + '</div>' +
          '<div id="weights-caption-holder">' + captionHtml() + '</div>' +
          '<div id="weights-reveal-holder">' + revealHtml() + '</div>' +
        '</div>' +
        '<p class="as-scorenote">Fit is scored out of 10 against your profile in act one. Sources for every figure sit in each dossier.</p>' +
        '<div class="as-orgs" id="ranked-cards">' + rankedCardsHtml() + '</div>' +
        '<div class="as-continue"><button type="button" class="btn-primary btn-primary-sm" data-action="goto" data-screen="give">Continue to the foundation</button></div>' +
      '</section>';
  }

  function giveHtml() {
    var genNote = state.gen
      ? '<p class="as-gennote">At the 2078 peak, your eldest grandchild is 58. The ending of this story belongs to people who haven’t been born yet. <span>Placeholder family data — we’ll put real names on these bands together.</span></p>'
      : '';
    return '' +
      '<section class="as-screen" data-screen-label="Act 3 - Where you’ll give">' +
        '<div class="as-eyebrow">Act three · Where you’ll give</div>' +
        '<h1 class="as-title">A foundation with a 75-year arc</h1>' +
        '<p class="as-lede" style="margin-bottom:36px;">Modelled at $16.5 million of capacity, distributions rise for two generations and crest in 2078. All figures are illustrative, prepared for discussion with Adam.</p>' +
        '<div class="as-card">' +
          '<div class="as-chartcard-head">' +
            '<h2 class="as-card-h">Annual distributions, 2025 – 2100</h2>' +
            '<button type="button" class="btn-pill' + (state.gen ? ' on' : '') + '" data-action="toggle-gen" aria-pressed="' + state.gen + '">' + (state.gen ? 'Hide the generations' : 'Show the generations') + '</button>' +
          '</div>' +
          '<div>' + lifecycleChartSvg(state.gen) + '</div>' +
          genNote +
          '<p class="as-disclaimer">Illustrative model only. No products are named here, and no returns are projected to you.</p>' +
        '</div>' +
        '<div class="as-g2 as-give-grid">' +
          '<div class="as-card">' +
            '<div class="as-label">Granting philosophy</div>' +
            '<h3 class="as-give-h3">Few organizations, deep relationships, multi-year commitments</h3>' +
            '<p>The foundation writes fewer, larger cheques on multi-year terms. Organizations plan around you, and you learn enough about each one to be useful beyond the money.</p>' +
          '</div>' +
          '<div class="as-card">' +
            '<div class="as-label">Invested capital, aligned</div>' +
            '<h3 class="as-give-h3">The corpus can pull in the same direction as the grants</h3>' +
            '<p>How the foundation’s capital is invested can reflect the causes it funds. This is kept deliberately generic here — it’s a conversation you review with Adam, and no funds are named in this studio.</p>' +
          '</div>' +
        '</div>' +
        '<div class="as-continue"><button type="button" class="btn-primary btn-primary-sm" data-action="goto" data-screen="decide">Continue to the decision</button></div>' +
      '</section>';
  }

  function instinctsHtml() {
    var gutLabels = { drawn: 'Drawn to it', more: 'Need more', not: 'Not this one' };
    var clientOrder = order(state.weights);
    var rows = '';
    var count = 0;
    clientOrder.forEach(function (id, i) {
      var j = state.journal[id] || {};
      if (!j.reaction && !j.note) return;
      count += 1;
      var org = orgById(id);
      var verdict = '', verdictFg = '#4A5560';
      if (j.reaction === 'drawn' && i <= 1) verdict = 'Instinct and evidence agree.';
      else if (j.reaction === 'drawn' && i >= 2) { verdict = 'Your instinct runs ahead of our evidence. Worth twenty minutes in the meeting.'; verdictFg = '#001E60'; }
      else if (j.reaction === 'not' && i <= 1) { verdict = 'The evidence says strong; your gut says no. This gap is the most valuable conversation in the room.'; verdictFg = '#001E60'; }
      else if (j.reaction === 'not') verdict = 'Instinct and evidence agree. We set it aside without regret.';
      else if (j.reaction === 'more') verdict = 'Fair. We’ll bring more before September.';
      else verdict = 'Noted.';
      var gutFg = j.reaction === 'drawn' ? '#0072CE' : j.reaction === 'not' ? '#66435A' : '#4A5560';
      rows += '' +
        '<div class="as-instinct as-cardrow">' +
          '<div class="as-instinct-name">' + esc(org.name) + '</div>' +
          '<div class="as-instinct-evidence">Evidence: ranked ' + ordinal(i) + ', ' + score(org, state.weights).toFixed(1) + ' / 10</div>' +
          '<div class="as-instinct-gut" style="color:' + gutFg + ';">' + (j.reaction ? gutLabels[j.reaction] : 'No reaction') + '</div>' +
          '<div class="as-instinct-verdict" style="color:' + verdictFg + ';">' + verdict + '</div>' +
        '</div>' +
        (j.note && j.note.trim()
          ? '<div class="as-instinct-note">“' + esc(j.note) + '”</div>'
          : '');
    });
    if (count === 0) {
      return '' +
        '<div class="as-empty">' +
          '<p>No reactions yet. Go with your gut in act two — mark each organization drawn to it, need more, or not this one, and we’ll lay your instincts beside the evidence right here.</p>' +
          '<button type="button" class="btn-link" data-action="goto" data-screen="serve">Back to the shortlist</button>' +
        '</div>';
    }
    return '<div class="as-instincts-list">' + rows + '</div>';
  }

  function decideHtml() {
    var practiceOrder = order(DEFAULTS);
    var recName = orgById(practiceOrder[0]).name;
    var recReactionsHtml = REACTIONS.map(function (r) {
      var on = state.recReaction === r.key;
      return '<button type="button" class="as-react' + (on ? ' on' : '') + '" data-action="rec-react" data-key="' + r.key + '" aria-pressed="' + on + '">' + r.label + '</button>';
    }).join('');
    var nextSteps = [
      { date: 'By 31 July 2026', title: 'Warm introductions', body: 'We open doors at ' + recName + ' and Fred Victor Centre. You take two coffees, no commitments, and notice which conversation you keep replaying afterward.' },
      { date: '18 August 2026', title: 'Foundation structuring session', body: 'Ninety minutes with Adam: granting policy, successor trustees, and what the first year of distributions looks like on paper.' },
      { date: 'By 30 September 2026', title: 'The decision', body: 'One board, in writing, with a start date. Everything in this studio points here.' }
    ];
    var stepsHtml = nextSteps.map(function (st) {
      return '' +
        '<div class="as-steprow as-cardrow">' +
          '<div class="as-step-date">' + st.date + '</div>' +
          '<div class="as-step-body">' +
            '<div class="as-step-title">' + st.title + '</div>' +
            '<p class="as-step-text">' + st.body + '</p>' +
          '</div>' +
        '</div>';
    }).join('');
    return '' +
      '<section class="as-screen" data-screen-label="Act 4 - Decide">' +
        '<div class="as-eyebrow">Act four · Decide</div>' +
        '<h1 class="as-title" style="margin-bottom:36px;">Our recommendation, in one sentence</h1>' +
        '<div class="as-quote">' +
          '<p>Say yes to the ' + esc(recName) + ' board, shape the foundation around health and housing, and hold September as the month you decide.</p>' +
        '</div>' +
        '<div class="as-rec-row">' +
          '<button type="button" class="btn-outline btn-outline-lg" data-action="see-evidence">See the evidence</button>' +
          '<span class="as-rec-q">How does this recommendation land?</span>' +
          recReactionsHtml +
        '</div>' +
        '<div class="as-card as-instincts">' +
          '<h2 class="as-card-h" style="margin-bottom:4px;">Your instincts, beside our evidence</h2>' +
          '<p class="as-instincts-sub">Reactions stay in this browser. A session-notes copy goes to print, nothing else leaves the room.</p>' +
          instinctsHtml() +
        '</div>' +
        '<h2 class="as-next-h">What happens next</h2>' +
        '<div class="as-steps">' + stepsHtml + '</div>' +
        '<div class="as-closing">' +
          '<p class="as-closing-h">Generosity this deliberate doesn’t happen by accident.</p>' +
          '<p class="as-closing-sub">When you’re ready, we’ll open the doors.</p>' +
        '</div>' +
        '<div class="as-footnote">' +
          '<p>Sources: CRA T3010 filings 2020 – 2024, organization websites and annual reports, and LinkedIn verification of leadership, June 2026.</p>' +
          '<p>Prepared for discussion only. Figures are illustrative, no investment products are named, and no returns are projected. Alignment Studio is part of the Strategic Generosity Blueprint™, prepared by Adam Malcolm, CFP®, MFA-P™, IG Wealth Management.</p>' +
        '</div>' +
      '</section>';
  }

  function screenHtml() {
    switch (state.screen) {
      case 'you': return youHtml();
      case 'serve': return serveHtml();
      case 'give': return giveHtml();
      case 'decide': return decideHtml();
      default: return welcomeHtml();
    }
  }

  // ---------- Chrome builders ----------
  function navItems() {
    var done = {
      welcome: !!state.visited.you,
      you: !!state.visited.you && !!state.visited.serve,
      serve: anyReaction(),
      give: !!state.visited.give && state.gen,
      decide: !!state.recReaction
    };
    return SCREENS.map(function (sc) {
      var active = state.screen === sc.id;
      return Object.assign({}, sc, { active: active, done: done[sc.id] && !active });
    });
  }

  var CHECK_SVG = '<svg class="as-navcheck" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#0072CE" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-label="done"><path d="M20 6L9 17l-5-5"></path></svg>';

  function railHtml() {
    var items = navItems().map(function (it) {
      return '' +
        '<button type="button" class="as-navitem' + (it.active ? ' active' : '') + '" data-action="goto" data-screen="' + it.id + '"' + (it.active ? ' aria-current="page"' : '') + '>' +
          '<span class="as-navnum">' + it.num + '</span>' +
          '<span class="as-navtext">' +
            '<span class="as-navlabel">' + it.label + '</span>' +
            '<span class="as-navsub">' + it.sub + '</span>' +
          '</span>' +
          (it.done ? CHECK_SVG : '') +
        '</button>';
    }).join('');
    return items + '<div class="as-rail-note">One client. One studio. Four decisions, made together.</div>';
  }

  function stepperHtml() {
    var items = navItems().map(function (it) {
      return '<button type="button" class="as-step' + (it.active ? ' active' : '') + '" data-action="goto" data-screen="' + it.id + '">' + it.label + '</button>';
    }).join('');
    return '<div class="as-stepper">' + items + '</div>';
  }

  function mnavHtml() {
    return navItems().map(function (it) {
      return '' +
        '<button type="button" class="as-mnav-item' + (it.active ? ' active' : '') + '" data-action="goto" data-screen="' + it.id + '"' + (it.active ? ' aria-current="page"' : '') + '>' +
          '<span class="as-mnav-num">' + it.num + '</span>' +
          '<span class="as-mnav-label">' + it.short + '</span>' +
        '</button>';
    }).join('');
  }

  function drawerHtml() {
    if (!(state.pinned.length > 0 && state.screen === 'serve')) return '';
    var head = '' +
      '<div class="as-drawer-head">' +
        '<span class="as-drawer-title">Side by side</span>' +
        (state.pinned.length === 1 ? '<span class="as-drawer-hint">Pin one more organization to compare side by side.</span>' : '') +
        '<button type="button" class="btn-link" data-action="clear-pins">Close</button>' +
      '</div>';
    var grid = '';
    if (state.pinned.length === 2) {
      var a = orgById(state.pinned[0]);
      var b = orgById(state.pinned[1]);
      var sa = score(a, state.weights).toFixed(1);
      var sb = score(b, state.weights).toFixed(1);
      var rows = [
        { label: 'Organization', a: a.name, b: b.name },
        { label: 'Weighted fit', a: sa + ' / 10 · ' + BADGES[a.fit].text.toLowerCase(), b: sb + ' / 10 · ' + BADGES[b.fit].text.toLowerCase() },
        { label: '2024 revenue', a: a.rev, b: b.rev },
        { label: 'Program efficiency', a: a.eff, b: b.eff },
        { label: 'Time commitment', a: a.time, b: b.time },
        { label: 'Risk, plainly', a: a.risk, b: b.risk }
      ];
      grid = '<div class="as-drawergrid">' + rows.map(function (row) {
        return '<div style="display:contents;">' +
          '<div class="as-drawer-label">' + row.label + '</div>' +
          '<div class="as-drawer-cell">' + esc(row.a) + '</div>' +
          '<div class="as-drawer-cell">' + esc(row.b) + '</div>' +
        '</div>';
      }).join('') + '</div>';
    }
    return '<div class="as-drawer"><div class="as-drawer-inner">' + head + grid + '</div></div>';
  }

  function mmFooterHtml() {
    var items = navItems();
    var idx = SCREENS.findIndex(function (sc) { return sc.id === state.screen; });
    var dots = SCREENS.map(function (sc, i) {
      return '<span class="dot' + (i <= idx ? ' filled' : '') + '"></span>';
    }).join('');
    var section = items[idx] ? items[idx].label + ' · ' + items[idx].sub.toLowerCase() : '';
    return '' +
      '<div class="as-mm-footer">' +
        '<span class="as-mm-title">Alignment Studio</span>' +
        '<span class="as-mm-section">' + section + '</span>' +
        '<div class="as-mm-dots">' + dots + '<span class="as-mm-progress">' + (idx + 1) + ' of 5</span></div>' +
        '<button type="button" class="btn-mm-exit" data-action="toggle-meeting">Exit meeting mode</button>' +
      '</div>';
  }

  // ---------- Rendering ----------
  function render() {
    var app = document.getElementById('app');
    app.classList.toggle('mm', state.mm);
    var mmBtn = document.getElementById('mm-btn');
    mmBtn.classList.toggle('on', state.mm);
    mmBtn.setAttribute('aria-pressed', String(state.mm));
    document.getElementById('rail').innerHTML = railHtml();
    document.getElementById('stepper-holder').innerHTML = state.mm ? stepperHtml() : '';
    document.getElementById('screen').innerHTML = screenHtml();
    document.getElementById('drawer-holder').innerHTML = drawerHtml();
    document.getElementById('mnav').innerHTML = mnavHtml();
    document.getElementById('mm-footer-holder').innerHTML = state.mm ? mmFooterHtml() : '';
  }

  // Weight changes update in place so the slider being dragged is never rebuilt.
  function updateServe() {
    CRITERIA.forEach(function (c) {
      var el = document.getElementById('w-pct-' + c.key);
      if (el) el.textContent = weightPct(c.key);
    });
    var cap = document.getElementById('weights-caption-holder');
    if (cap) cap.innerHTML = captionHtml();
    var rst = document.getElementById('weights-reset-holder');
    if (rst) rst.innerHTML = resetBtnHtml();
    var rev = document.getElementById('weights-reveal-holder');
    if (rev) rev.innerHTML = revealHtml();
    var cards = document.getElementById('ranked-cards');
    if (cards) cards.innerHTML = rankedCardsHtml();
  }

  function goTo(screen) {
    state.screen = screen;
    state.visited[screen] = true;
    render();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  // ---------- Events ----------
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var a = el.dataset.action;
    if (a === 'goto') {
      goTo(el.dataset.screen);
    } else if (a === 'print') {
      window.print();
    } else if (a === 'toggle-meeting') {
      state.mm = !state.mm;
      render();
    } else if (a === 'reset-weights') {
      state.weights = Object.assign({}, DEFAULTS);
      state.caption = 'Back to our weighting. The order below is the one we brought to you.';
      state.movedId = null;
      state.movedDir = 0;
      render();
    } else if (a === 'toggle-dossier') {
      var did = el.dataset.org;
      state.expanded = state.expanded === did ? null : did;
      render();
    } else if (a === 'toggle-pin') {
      var pid = el.dataset.org;
      state.pinned = state.pinned.indexOf(pid) !== -1
        ? state.pinned.filter(function (p) { return p !== pid; })
        : state.pinned.concat(pid).slice(-2);
      render();
    } else if (a === 'react') {
      var rid = el.dataset.org, key = el.dataset.key;
      var cur = (state.journal[rid] || {}).reaction;
      state.journal[rid] = Object.assign({}, state.journal[rid], { reaction: cur === key ? null : key });
      persist();
      render();
    } else if (a === 'rec-react') {
      var rkey = el.dataset.key;
      state.recReaction = state.recReaction === rkey ? null : rkey;
      persist();
      render();
    } else if (a === 'toggle-gen') {
      state.gen = !state.gen;
      render();
    } else if (a === 'see-evidence') {
      state.expanded = order(DEFAULTS)[0];
      goTo('serve');
    } else if (a === 'clear-pins') {
      state.pinned = [];
      render();
    }
  });

  document.addEventListener('input', function (e) {
    var t = e.target;
    if (!(t.matches && t.matches('input[type="range"][data-weight]'))) return;
    var key = t.dataset.weight;
    var label = CRITERIA.filter(function (c) { return c.key === key; })[0].label;
    var val = Number(t.value);
    var oldOrder = order(state.weights);
    var dir = val > state.weights[key] ? 'higher' : 'lower';
    state.weights = Object.assign({}, state.weights);
    state.weights[key] = val;
    var newOrder = order(state.weights);
    if (oldOrder.join() === newOrder.join()) {
      state.caption = 'The order holds. ' + label + ' isn’t where this ranking turns.';
      state.movedId = null;
      state.movedDir = 0;
    } else {
      var best = null, bestMove = 0;
      newOrder.forEach(function (id, i) {
        var move = oldOrder.indexOf(id) - i;
        if (Math.abs(move) > Math.abs(bestMove)) { bestMove = move; best = id; }
      });
      var org = orgById(best);
      var pos = ordinal(newOrder.indexOf(best));
      state.caption = 'With ' + label.toLowerCase() + ' weighted ' + dir + ', ' + org.name + (bestMove > 0 ? ' rises to ' : ' drops to ') + pos + '.';
      state.movedId = best;
      state.movedDir = bestMove;
    }
    updateServe();
  });

  document.addEventListener('change', function (e) {
    var t = e.target;
    if (!(t.matches && t.matches('input[data-note]'))) return;
    var id = t.dataset.note;
    state.journal[id] = Object.assign({}, state.journal[id], { note: t.value });
    persist();
  });

  // Chip hover / focus drives the explanation panel; visuals are pure CSS.
  function findChip(id) {
    for (var g = 0; g < CHIP_GROUPS.length; g++) {
      var hit = CHIP_GROUPS[g].chips.filter(function (c) { return c.id === id; })[0];
      if (hit) return hit;
    }
    return null;
  }

  function chipEnter(el) {
    var chip = findChip(el.dataset.chip);
    var panel = document.getElementById('chip-panel');
    if (!chip || !panel) return;
    panel.innerHTML = '<span class="as-chip-info"><strong>' + esc(chip.label) + '</strong> — ' + chipInfoFor(chip) + '</span>';
  }

  function chipLeave() {
    var panel = document.getElementById('chip-panel');
    if (panel) panel.innerHTML = chipHintHtml();
  }

  document.addEventListener('mouseover', function (e) {
    var c = e.target.closest && e.target.closest('.as-chip');
    if (c) chipEnter(c);
  });
  document.addEventListener('mouseout', function (e) {
    var c = e.target.closest && e.target.closest('.as-chip');
    if (c && !(e.relatedTarget && c.contains(e.relatedTarget))) chipLeave();
  });
  document.addEventListener('focusin', function (e) {
    var c = e.target.closest && e.target.closest('.as-chip');
    if (c) chipEnter(c);
  });
  document.addEventListener('focusout', function (e) {
    var c = e.target.closest && e.target.closest('.as-chip');
    if (c) chipLeave();
  });

  // ---------- Boot ----------
  document.getElementById('byline').textContent =
    'Prepared for ' + clientName + ' by Adam Malcolm, CFP®, MFA-P™ · July 2026';
  render();
})();
