var API_KEY = 'AIzaSyBpI_JymH-mU-Xg26h90FPF36V1XlSISdY';
var API_URL = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?';
var URL_LIST = [
  'http://www.pmo.gov.sg/',
  'https://www.tech.gov.sg/',
  'http://www.mom.gov.sg/',
  'https://www.cpf.gov.sg',
  'https://www.mof.gov.sg/'
];

var callbacks = {};
var impactArr = [];
var siteCount = 0;

// Invokes the PageSpeed Insights API. The response will contain
// JavaScript that invokes our callback with the PageSpeed results.
function runPagespeed() {
  for (var i in URL_LIST) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    var query = [
      'url=' + URL_LIST[i],
      'callback=runPagespeedCallbacks',
      'key=' + API_KEY,
    ].join('&');

    s.src = API_URL + query;
    document.head.insertBefore(s, null);
  }
}

function runPagespeedCallbacks(result) {
  if (result.error) {
    var errors = result.error.errors;
    for (var i = 0, len = errors.length; i < len; ++i) {
      if (errors[i].reason == 'badRequest' && API_KEY == 'yourAPIKey') {
        alert('Please specify your Google API key in the API_KEY variable.');
      } else {
        console.log(errors[i].message);
      }
    }
    return;
  }

  for (var fn in callbacks) {
    var f = callbacks[fn];
    if (typeof f == 'function') {
      callbacks[fn](result);
    }
  }
}

// Invoke the callback that fetches results. Async here so we're sure
// to discover any callbacks registered below, but this can be
// synchronous in your code.
setTimeout(runPagespeed, 0);

callbacks.displayLoadingExperience = function (result) {
  var appendString = `<td>${getSiteInfo(result)}</td>`;
  appendString += `<td>${getLoadingExperience(result)}</td>`;
  appendString += `<td>${getOptimizationScore(result)}</td>`;
  appendString += `<td>${getRecommendations(result)}</td>`;

  var tr = document.createElement('tr');
  tr.innerHTML = appendString;
  var tbody = document.querySelector('tbody');
  tbody.appendChild(tr);

  siteCount++;

  if (siteCount == URL_LIST.length) {
    impactArr.sort(sortByImpact);
    setStats('#rule-by-impact');
    impactArr.sort(sortByAffected);
    setStats('#rule-by-affected');
  }
}

function getSiteInfo(result) {
  var siteUrl = result.id;
  var siteTitle = result.title;
  return `${siteUrl}<br>${siteTitle}`
}

function getLoadingExperience(result) {
  var speedScore = result.loadingExperience.overall_category;
  var medianDcl = result.loadingExperience.metrics.DOM_CONTENT_LOADED_EVENT_FIRED_MS.median;
  var medianFcp = result.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.median;
  return `Overall: ${speedScore}<br>FCP: ${medianFcp}<br>DCL: ${medianDcl}`;
}

function getOptimizationScore(result) {
  var optimizationScore = result.ruleGroups.SPEED.score;
  return optimizationScore;
}

function getRecommendations(result) {
  var siteUrl = result.id;
  var recommendations = [];
  var ruleResults = result.formattedResults.ruleResults;
  for (var i in ruleResults) {
    if (ruleResults[i].ruleImpact == 0) {
      continue;
    }

    var name = ruleResults[i].localizedRuleName;
    var impact = ruleResults[i].ruleImpact;
    tabulateImpact(ruleResults[i]);

    recommendations.push({
      name: ruleResults[i].localizedRuleName,
      impact: ruleResults[i].ruleImpact
    });
  };
  recommendations.sort(sortByImpact);

  var recommendationString = '';
  for (var i in recommendations) {
    recommendationString += `${recommendations[i].name} (${recommendations[i].impact})<br>`;
  }
  return recommendationString;
}

function tabulateImpact(rule) {
  var k = rule.localizedRuleName.split(" ").join("");
  var bool = false;

  for (i in impactArr) {
    var o = impactArr[i];
    if (o.localizedRuleName == rule.localizedRuleName) {
      o.impact += rule.ruleImpact;
      o.affected += 1;
      bool = true;
    }
  }

  if (bool) {
    return;
  }

  impactArr.push({
    localizedRuleName: rule.localizedRuleName,
    impact: rule.ruleImpact,
    affected: 0
  });
}

function setStats(selector) {
  var selected = document.querySelector(selector);
  selected.innerHTML = `${impactArr[0].localizedRuleName} (${impactArr[0].impact})<br>No. of Affected: ${impactArr[0].affected}`;
}


// Helper function that sorts results in order of impact.
function sortByImpact(a, b) {
  return b.impact - a.impact;
}

function sortByAffected(a, b) {
  return b.affected - a.affected;
}